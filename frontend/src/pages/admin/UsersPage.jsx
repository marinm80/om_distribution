import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminUsers, createUser, updateUser, deleteUser } from '../../services/adminApi';
import { Plus, Pencil, Trash2, X, Shield, ShoppingBag } from 'lucide-react';

const ROLES = [
  { value: 'admin', label: 'Admin', icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
  { value: 'seller', label: 'Seller', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const UsersPage = () => {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ email: '', password: '', role: 'seller' });

  const fetchData = async () => {
    try {
      const res = await getAdminUsers(token);
      setUsers(res.data.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [token]);

  const openCreate = () => {
    setEditing(null);
    setForm({ email: '', password: '', role: 'seller' });
    setShowModal(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({ email: u.email, password: '', role: u.role });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email: form.email, role: form.role };
      if (form.password) payload.password = form.password;

      if (editing) {
        await updateUser(editing.id, payload, token);
      } else {
        if (!form.password) return alert('Password is required for new users');
        payload.password = form.password;
        await createUser(payload, token);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving user');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return;
    try {
      await deleteUser(id, token);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  const getRoleBadge = (role) => {
    const r = ROLES.find(x => x.value === role) || ROLES[1];
    const Icon = r.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${r.color} ${r.bg}`}>
        <Icon size={12} /> {r.label}
      </span>
    );
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">{users.length} registered users</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-[#2a2a2a] transition-all text-sm">
          <Plus size={18} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Created</th>
              <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${u.role === 'admin' ? 'bg-red-50' : 'bg-blue-50'}`}>
                      <span className={`text-xs font-bold ${u.role === 'admin' ? 'text-red-700' : 'text-blue-700'}`}>
                        {u.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{u.email}</p>
                      {u.id === currentUser?.id && <span className="text-[11px] text-emerald-600 font-medium">(You)</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{getRoleBadge(u.role)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(u)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Edit">
                      <Pencil size={16} />
                    </button>
                    {u.id !== currentUser?.id && (
                      <button onClick={() => handleDelete(u.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="4" className="text-center py-12 text-gray-400 text-sm">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">{editing ? 'Edit User' : 'New User'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Password {editing && '(leave blank to keep current)'}</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} {...(!editing && { required: true })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1a1a1a]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Role</label>
                <div className="flex gap-3">
                  {ROLES.map(r => (
                    <button key={r.value} type="button" onClick={() => setForm({ ...form, role: r.value })}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        form.role === r.value ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}>
                      <r.icon size={14} /> {r.label}
                    </button>
                  ))}
                </div>
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

export default UsersPage;
