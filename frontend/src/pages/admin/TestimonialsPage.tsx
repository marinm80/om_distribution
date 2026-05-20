import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminTestimonials, createTestimonial, deleteTestimonial } from '../../services/adminApi';
import { Plus, Trash2, X, Star } from 'lucide-react';
import { Testimonial } from '../../types';

const TestimonialsPage: React.FC = () => {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    author_name: '', content_en: '', content_es: '', rating: 5, role_en: '', role_es: '', image_url: ''
  });

  const fetchData = async () => {
    try {
      if (!token) return;
      const res = await getAdminTestimonials(token);
      setTestimonials(res.data.data.testimonials);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await createTestimonial(form, token);
      setShowModal(false);
      setForm({ author_name: '', content_en: '', content_es: '', rating: 5, role_en: '', role_es: '', image_url: '' });
      fetchData();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || 'Error creating testimonial');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id, token);
      fetchData();
    } catch (err) {
      alert('Error deleting testimonial');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">{testimonials.length} customer reviews</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-[#2a2a2a] transition-all text-sm">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative group">
            <button
              onClick={() => handleDelete(t.id)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={15} />
            </button>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <p className="text-sm text-gray-700 italic mb-4 line-clamp-3">"{t.content}"</p>
            <div className="flex items-center gap-3">
              {t.image_url ? (
                <img src={t.image_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-700">{t.author_name?.[0]}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-gray-900">{t.author_name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">No testimonials yet</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">New Testimonial</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Author Name</label>
                <input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Role (EN)</label>
                  <input value={form.role_en} onChange={(e) => setForm({ ...form, role_en: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Role (ES)</label>
                  <input value={form.role_es} onChange={(e) => setForm({ ...form, role_es: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Content (EN)</label>
                <textarea value={form.content_en} onChange={(e) => setForm({ ...form, content_en: e.target.value })} rows={2} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Content (ES)</label>
                <textarea value={form.content_es} onChange={(e) => setForm({ ...form, content_es: e.target.value })} rows={2} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Image URL</label>
                  <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-sm font-semibold hover:bg-[#2a2a2a]">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
