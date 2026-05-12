import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminProducts, getAdminCategories, createProduct, updateProduct, deleteProduct, bulkImportProducts, toggleProductField } from '../../services/adminApi';
import { Plus, Pencil, Trash2, X, Search, Image, Download, Upload, FileSpreadsheet, Eye, EyeOff, Power } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Robust cross-browser download using data URI
const downloadFile = (uint8Array, filename, mimeType) => {
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) binary += String.fromCharCode(uint8Array[i]);
  const base64 = btoa(binary);
  const a = document.createElement('a');
  a.href = `data:${mimeType};base64,${base64}`;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 500);
};

const ProductsPage = () => {
  const { token, user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const fileInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [form, setForm] = useState({ name_en:'', name_es:'', description_en:'', description_es:'', image_url:'', category_id:'', is_active:true, show_on_landing:false });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([getAdminProducts(token), getAdminCategories(token)]);
      setProducts(prodRes.data.data.products);
      setCategories(catRes.data.data.categories);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [token]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name_en:'', name_es:'', description_en:'', description_es:'', image_url:'', category_id: categories[0]?.id || '', is_active:true, show_on_landing:false });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ name_en: p.name_en||p.name||'', name_es: p.name_es||p.name||'', description_en: p.description_en||p.description||'', description_es: p.description_es||p.description||'', image_url: p.image_url||'', category_id: p.category_id||'', is_active: p.is_active !== false, show_on_landing: p.show_on_landing === true });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateProduct(editing.id, form, token);
      else await createProduct(form, token);
      setShowModal(false); fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Error saving product'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try { await deleteProduct(id, token); fetchData(); }
    catch { alert('Error deleting product'); }
  };

  const handleToggle = async (id, field, currentValue) => {
    try {
      await toggleProductField(id, field, !currentValue, token);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: !currentValue } : p));
    } catch { alert('Error updating product'); }
  };

  // ──── Template Download (data URI) ────
  const downloadTemplate = () => {
    const templateData = [
      { name_en:'Premium Rice', name_es:'Arroz Premium', description_en:'High quality long grain rice.', description_es:'Arroz de grano largo de alta calidad.', image_url:'https://example.com/rice.jpg', category_id:1, is_active:'TRUE', show_on_landing:'FALSE' },
      { name_en:'Organic Beans', name_es:'Frijoles Orgánicos', description_en:'Farm fresh organic beans.', description_es:'Frijoles orgánicos frescos.', image_url:'https://example.com/beans.jpg', category_id:1, is_active:'TRUE', show_on_landing:'TRUE' },
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    ws['!cols'] = [{ wch:25 },{ wch:25 },{ wch:45 },{ wch:45 },{ wch:35 },{ wch:12 },{ wch:10 },{ wch:16 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    const catData = categories.map(c => ({ category_id: c.id, name: c.name || c.name_es }));
    if (catData.length) {
      const catWs = XLSX.utils.json_to_sheet(catData);
      XLSX.utils.book_append_sheet(wb, catWs, 'Categories Reference');
    }
    const wbout = XLSX.write(wb, { bookType:'xlsx', type:'array' });
    downloadFile(new Uint8Array(wbout), 'OM_Products_Import_Template.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  };

  // ──── Import ────
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      if (!rows.length) { alert('File is empty.'); return; }
      const missing = ['name_en','name_es'].filter(c => !(c in rows[0]));
      if (missing.length) { alert(`Missing columns: ${missing.join(', ')}\nDownload the template first.`); return; }
      const prods = rows.map(r => ({
        name_en: String(r.name_en||'').trim(), name_es: String(r.name_es||'').trim(),
        description_en: String(r.description_en||'').trim(), description_es: String(r.description_es||'').trim(),
        image_url: String(r.image_url||'').trim(), category_id: r.category_id ? Number(r.category_id) : null,
        is_active: String(r.is_active||'true').toLowerCase() !== 'false',
        show_on_landing: String(r.show_on_landing||'false').toLowerCase() === 'true',
      }));
      const res = await bulkImportProducts(prods, token);
      alert(`✅ ${res.data.data.imported} products imported!`);
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Import error. Check file format.'); }
    finally { setImporting(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  // ──── PDF Catalog (data URI) ────
  const downloadCatalogPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(26,26,26); doc.rect(0,0,210,45,'F');
    doc.setTextColor(255,255,255); doc.setFontSize(28); doc.setFont('helvetica','bold');
    doc.text('OM Distribution', 14, 25);
    doc.setFontSize(12); doc.setFont('helvetica','normal');
    doc.text('Product Catalog', 14, 35);
    doc.setFontSize(10); doc.text(`Generated: ${new Date().toLocaleDateString()}`, 196, 35, { align:'right' });

    const catalogProducts = filterCategory === 'all' ? products : products.filter(p => String(p.category_id) === String(filterCategory));
    const grouped = {};
    catalogProducts.forEach(p => { const cat = p.category_name || 'Uncategorized'; if (!grouped[cat]) grouped[cat] = []; grouped[cat].push(p); });

    let yPos = 58;
    Object.keys(grouped).forEach(cat => {
      if (yPos > 260) { doc.addPage(); yPos = 20; }
      doc.setFillColor(245,245,240); doc.roundedRect(14,yPos-5,182,10,2,2,'F');
      doc.setTextColor(26,26,26); doc.setFontSize(13); doc.setFont('helvetica','bold');
      doc.text(cat.toUpperCase(), 18, yPos+2); yPos += 14;
      const tableData = grouped[cat].map((p,i) => [i+1, p.name||'—', (p.description||'—').substring(0,80)]);
      autoTable(doc, {
        startY: yPos, head:[['#','Product','Description']], body: tableData,
        margin:{left:14,right:14},
        headStyles:{fillColor:[26,26,26],textColor:[255,255,255],fontSize:9,fontStyle:'bold',cellPadding:4},
        bodyStyles:{fontSize:9,cellPadding:4,textColor:[60,60,60]},
        alternateRowStyles:{fillColor:[250,250,248]},
        columnStyles:{0:{cellWidth:12,halign:'center'},1:{cellWidth:55,fontStyle:'bold'},2:{cellWidth:'auto'}},
        theme:'grid', styles:{lineColor:[230,230,230],lineWidth:0.3},
      });
      yPos = doc.lastAutoTable.finalY + 12;
    });

    const pages = doc.internal.getNumberOfPages();
    for (let i=1; i<=pages; i++) { doc.setPage(i); doc.setFontSize(8); doc.setTextColor(160,160,160); doc.text(`OM Distribution | Page ${i}/${pages}`,105,290,{align:'center'}); }

    const pdfBytes = doc.output('arraybuffer');
    downloadFile(new Uint8Array(pdfBytes), `OM_Distribution_Catalog_${new Date().toISOString().slice(0,10)}.pdf`, 'application/pdf');
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || String(p.category_id) === String(filterCategory);
    return matchSearch && matchCat;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" /></div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500 mt-1">{products.length} items in catalog</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={downloadTemplate} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm" title="Download Excel template"><FileSpreadsheet size={16} /> Template</button>
          <input type="file" ref={fileInputRef} accept=".xlsx,.xls,.csv" onChange={handleImport} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} disabled={importing} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all text-sm disabled:opacity-50"><Upload size={16} /> {importing ? 'Importing...' : 'Import'}</button>
          <button onClick={downloadCatalogPDF} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm"><Download size={16} /> PDF</button>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-[#2a2a2a] transition-all text-sm"><Plus size={16} /> Add Product</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a1a1a] outline-none text-sm" />
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">#</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Image</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Product</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Category</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase">Active</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase">Landing</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${p.is_active === false ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3 text-sm text-gray-400">{i+1}</td>
                <td className="px-4 py-3">
                  {p.image_url ? <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><Image size={16} className="text-gray-300" /></div>}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{p.description}</p>
                </td>
                <td className="px-4 py-3"><span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">{p.category_name || '—'}</span></td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => handleToggle(p.id, 'is_active', p.is_active !== false)} className={`p-1.5 rounded-lg transition-colors ${p.is_active !== false ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`} title={p.is_active !== false ? 'Active – click to deactivate' : 'Inactive – click to activate'}>
                    <Power size={15} />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => handleToggle(p.id, 'show_on_landing', p.show_on_landing === true)} className={`p-1.5 rounded-lg transition-colors ${p.show_on_landing ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`} title={p.show_on_landing ? 'Visible on landing – click to hide' : 'Hidden from landing – click to show'}>
                    {p.show_on_landing ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Edit"><Pencil size={15} /></button>
                    {isAdmin && <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete"><Trash2 size={15} /></button>}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="text-center py-12 text-gray-400 text-sm">No products found</td></tr>}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-4 px-2">Showing {filtered.length} of {products.length} products</p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editing ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-semibold text-gray-600">Name (EN)</label><input value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" /></div>
                <div className="space-y-1"><label className="text-xs font-semibold text-gray-600">Name (ES)</label><input value={form.name_es} onChange={e => setForm({...form, name_es: e.target.value})} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" /></div>
              </div>
              <div className="space-y-1"><label className="text-xs font-semibold text-gray-600">Description (EN)</label><textarea value={form.description_en} onChange={e => setForm({...form, description_en: e.target.value})} rows="2" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] resize-none" /></div>
              <div className="space-y-1"><label className="text-xs font-semibold text-gray-600">Description (ES)</label><textarea value={form.description_es} onChange={e => setForm({...form, description_es: e.target.value})} rows="2" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] resize-none" /></div>
              <div className="space-y-1"><label className="text-xs font-semibold text-gray-600">Image URL</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" placeholder="https://..." /></div>
              <div className="space-y-1"><label className="text-xs font-semibold text-gray-600">Category</label>
                <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]">
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="w-4 h-4 accent-green-600 rounded" /><span className="text-sm text-gray-700">Active</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.show_on_landing} onChange={e => setForm({...form, show_on_landing: e.target.checked})} className="w-4 h-4 accent-blue-600 rounded" /><span className="text-sm text-gray-700">Show on Landing</span></label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-sm font-semibold hover:bg-[#2a2a2a]">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
