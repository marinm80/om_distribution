import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminCategories, createCategory, updateCategory, deleteCategory } from '../../services/adminApi';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const CategoriesPage = () => {
  const { token, user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name_en: '', name_es: '' });

  const fetchData = async () => {
    try {
      const res = await getAdminCategories(token);
      setCategories(res.data.data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [token]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name_en: '', name_es: '' });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ name_en: cat.name_en, name_es: cat.name_es });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateCategory(editing.id, form, token);
      } else {
        await createCategory(form, token);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category? Products in it will lose their category.')) return;
    try {
      await deleteCategory(id, token);
      fetchData();
    } catch (err) {
      alert('Error deleting category');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">{categories.length} product categories</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-[#2a2a2a] transition-all text-sm">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-gray-900">{cat.name_es}</p>
                <p className="text-sm text-gray-500">{cat.name_en}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil size={15} /></button>
                {isAdmin && <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>}
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">No categories yet</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">{editing ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Name (EN)</label>
                <input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Name (ES)</label>
                <input value={form.name_es} onChange={(e) => setForm({ ...form, name_es: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
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

export default CategoriesPage;
