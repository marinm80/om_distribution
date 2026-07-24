/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardStats } from '../../services/adminApi';
import { Package, Tags, Mail, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ContactLead } from '../../types';

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalContacts: number;
}

interface ChartDataPoint {
  month: string;
  count: number;
}

const StatCard: React.FC<{ icon: React.ElementType, label: string, value?: number, color: string, bgColor: string }> = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
        <Icon size={22} className={color} />
      </div>
      <TrendingUp size={16} className="text-emerald-500" />
    </div>
    <p className="text-3xl font-bold text-gray-900">{value?.toLocaleString() ?? '—'}</p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

const DashboardHome: React.FC = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentContacts, setRecentContacts] = useState<ContactLead[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!token) return;
        const res = await getDashboardStats(token);
        setStats(res.data.data.stats);
        setRecentContacts(res.data.data.recentContacts);
        setChartData(res.data.data.contactsByMonth);
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Package} label="Total Products" value={stats?.totalProducts} color="text-blue-600" bgColor="bg-blue-50" />
        <StatCard icon={Tags} label="Categories" value={stats?.totalCategories} color="text-purple-600" bgColor="bg-purple-50" />
        <StatCard icon={Mail} label="Contact Leads" value={stats?.totalContacts} color="text-emerald-600" bgColor="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Leads</h3>
          <p className="text-sm text-gray-500 mb-6">Monthly lead submissions</p>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#999' }} />
                <YAxis tick={{ fontSize: 12, fill: '#999' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
                <Bar dataKey="count" fill="#1a1a1a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available yet
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Activity</h3>
          <p className="text-sm text-gray-500 mb-6">Latest contact submissions</p>
          <div className="space-y-4">
            {recentContacts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No contacts yet</p>
            )}
            {recentContacts.map((c) => (
              <div key={c.id} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-700">{c.full_name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">{c.email}</p>
                  <div className="flex items-center gap-1 mt-1 text-gray-400">
                    <Clock size={11} />
                    <span className="text-[11px]">
                      {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
