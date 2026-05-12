import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminProducts, getAdminCategories, createProduct, updateProduct, deleteProduct } from '../../services/adminApi';
import { Plus, Pencil, Trash2, X, Search, Image, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ProductsPage = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [form, setForm] = useState({
    name_en: '', name_es: '', description_en: '', description_es: '', image_url: '', category_id: ''
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        getAdminProducts(token),
        getAdminCategories(token),
      ]);
      setProducts(prodRes.data.data.products);
      setCategories(catRes.data.data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [token]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name_en: '', name_es: '', description_en: '', description_es: '', image_url: '', category_id: categories[0]?.id || '' });
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name_en: product.name_en || product.name || '',
      name_es: product.name_es || product.name || '',
      description_en: product.description_en || product.description || '',
      description_es: product.description_es || product.description || '',
      image_url: product.image_url || '',
      category_id: product.category_id || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProduct(editing.id, form, token);
      } else {
        await createProduct(form, token);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id, token);
      fetchData();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  // --- PDF Catalog Download ---
  const downloadCatalogPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(26, 26, 26);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('OM Distribution', 14, 25);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Product Catalog', 14, 35);

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 210 - 14, 35, { align: 'right' });

    // Separator
    doc.setDrawColor(230, 230, 230);
    doc.line(14, 50, 196, 50);

    // Group products by category
    const grouped = {};
    const catalogProducts = filterCategory === 'all'
      ? products
      : products.filter(p => String(p.category_id) === String(filterCategory));

    catalogProducts.forEach((p) => {
      const cat = p.category_name || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });

    let yPos = 58;
    const categories = Object.keys(grouped);

    categories.forEach((cat, catIdx) => {
      // Check if we need a new page
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      // Category header
      doc.setFillColor(245, 245, 240);
      doc.roundedRect(14, yPos - 5, 182, 10, 2, 2, 'F');
      doc.setTextColor(26, 26, 26);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(cat.toUpperCase(), 18, yPos + 2);
      yPos += 14;

      // Product table for this category
      const tableData = grouped[cat].map((p, i) => [
        i + 1,
        p.name || '—',
        (p.description || '—').substring(0, 80) + ((p.description || '').length > 80 ? '...' : ''),
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['#', 'Product Name', 'Description']],
        body: tableData,
        margin: { left: 14, right: 14 },
        headStyles: {
          fillColor: [26, 26, 26],
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold',
          cellPadding: 4,
        },
        bodyStyles: {
          fontSize: 9,
          cellPadding: 4,
          textColor: [60, 60, 60],
        },
        alternateRowStyles: {
          fillColor: [250, 250, 248],
        },
        columnStyles: {
          0: { cellWidth: 12, halign: 'center' },
          1: { cellWidth: 55, fontStyle: 'bold' },
          2: { cellWidth: 'auto' },
        },
        theme: 'grid',
        styles: {
          lineColor: [230, 230, 230],
          lineWidth: 0.3,
        },
      });

      yPos = doc.lastAutoTable.finalY + 12;
    });

    // Footer on last page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text(
        `OM Distribution - Product Catalog | Page ${i} of ${pageCount}`,
        105, 290,
        { align: 'center' }
      );
    }

    doc.save(`OM_Distribution_Catalog_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || String(p.category_id) === String(filterCategory);
    return matchSearch && matchCat;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500 mt-1">{products.length} items in catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={downloadCatalogPDF}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm"
          >
            <Download size={18} />
            Download PDF
          </button>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-[#2a2a2a] transition-all text-sm">
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/10 outline-none text-sm"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] bg-white"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name_es || c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">#</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Image</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, i) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                <td className="px-6 py-4">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"><Image size={18} className="text-gray-300" /></div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{product.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    {product.category_name || '—'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(product)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" className="text-center py-12 text-gray-400 text-sm">No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary bar */}
      <div className="flex items-center justify-between mt-4 px-2">
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {products.length} products
        </p>
        <button
          onClick={downloadCatalogPDF}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FileText size={14} />
          Export filtered as PDF
        </button>
      </div>

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
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Name (EN)</label>
                  <input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" placeholder="Product name in English" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Name (ES)</label>
                  <input value={form.name_es} onChange={(e) => setForm({ ...form, name_es: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" placeholder="Nombre del producto" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Description (EN)</label>
                <textarea value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] resize-none" placeholder="Describe the product..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Description (ES)</label>
                <textarea value={form.description_es} onChange={(e) => setForm({ ...form, description_es: e.target.value })} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] resize-none" placeholder="Descripción del producto..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Image URL</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" placeholder="https://..." />
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="w-20 h-20 rounded-xl object-cover mt-2 border border-gray-200" onError={(e) => e.target.style.display = 'none'} />
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Category</label>
                <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]">
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name_es} / {c.name_en}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-sm font-semibold hover:bg-[#2a2a2a]">{editing ? 'Update Product' : 'Create Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
