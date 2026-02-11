import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Users, Activity, TrendingUp, Eye, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { projectId, publicAnonKey, functionName } from '../utils/supabase/info';
import { supabase } from '../utils/supabaseClient';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeTab, setActiveTab] = useState<'users' | 'blue_elite'>('users');
  const [blueEliteData, setBlueEliteData] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else {
      loadBlueEliteData();
    }
  }, [currentPage, filterType, activeTab]);

  const loadAnalytics = async () => {
    try {
      // 1. Fetch backend analytics for general stats
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/analytics/dashboard`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();

      let finalStats = null;
      if (data.success) {
        finalStats = data.stats;
        setChartData(data.chartData || []);
      }

      // 2. Fetch ALL users to calculate correct "Kids by Title" stats client-side 
      // (Workaround for backend aggregation issue)
      try {
        const usersResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/${functionName}/admin/users?page=1&limit=1000&type=kid`,
          {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }
        );
        const usersData = await usersResponse.json();

        if (usersData.users) {
          const kids = usersData.users;
          const byTitle = {
            Treasures: 0,
            Sparks: 0,
            Stars: 0,
            Trailblazers: 0
          };

          kids.forEach((kid: any) => {
            const age = kid.age;
            if (typeof age === 'number') {
              if (age >= 0 && age <= 2) byTitle.Treasures++;
              else if (age >= 3 && age <= 5) byTitle.Sparks++;
              else if (age >= 6 && age <= 9) byTitle.Stars++;
              else if (age >= 10 && age <= 12) byTitle.Trailblazers++;
            } else if (kid.title) {
              // Fallback to title string matching if age is missing
              const t = kid.title.toLowerCase();
              if (t.includes('treasure')) byTitle.Treasures++;
              else if (t.includes('spark')) byTitle.Sparks++;
              else if (t.includes('star')) byTitle.Stars++;
              else if (t.includes('trailblazer')) byTitle.Trailblazers++;
            }
          });

          // Override backend stats
          if (finalStats) {
            finalStats.usersByTitle = byTitle;
          } else {
            // Fallback if backend analytics completely failed
            finalStats = {
              totalUsers: 0, logins: 0, pageVisits: 0, signups: 0,
              usersByType: { kid: 0, parent: 0, leader: 0 },
              usersByCountry: {},
              usersByTitle: byTitle
            };
          }
        }
      } catch (err) {
        console.error("Failed to calculate client-side stats:", err);
      }

      if (finalStats) {
        setStats(finalStats);
      }

    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/admin/users?page=${currentPage}&limit=20&type=${filterType}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBlueEliteData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blue_elite_staff_giving')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlueEliteData(data || []);
    } catch (error) {
      console.error("Error loading blue elite data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => users.filter(user =>
    searchQuery === '' ||
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  ), [users, searchQuery]);

  const filteredBlueElite = useMemo(() => blueEliteData.filter(item =>
    searchQuery === '' ||
    item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.zone.toLowerCase().includes(searchQuery.toLowerCase())
  ), [blueEliteData, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-5xl font-extrabold">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-xl">Manage users and view analytics</p>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-[#FF6B9D]/10 to-[#FF6B9D]/5 rounded-2xl border border-[#FF6B9D]/20"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-[#FF6B9D]" />
                <span className="text-3xl">{stats.totalUsers}</span>
              </div>
              <h3 className="text-gray-900">Total Users</h3>
              <p className="text-sm text-gray-600">All registered users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-[#A78BFA]/10 to-[#A78BFA]/5 rounded-2xl border border-[#A78BFA]/20"
            >
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-[#A78BFA]" />
                <span className="text-3xl">{stats.logins}</span>
              </div>
              <h3 className="text-gray-900">Total Logins</h3>
              <p className="text-sm text-gray-600">All time</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-[#4ECDC4]/10 to-[#4ECDC4]/5 rounded-2xl border border-[#4ECDC4]/20"
            >
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8 text-[#4ECDC4]" />
                <span className="text-3xl">{stats.pageVisits}</span>
              </div>
              <h3 className="text-gray-900">Page Visits</h3>
              <p className="text-sm text-gray-600">Total views</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl border border-purple-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <span className="text-3xl">{stats.signups}</span>
              </div>
              <h3 className="text-gray-900">Signups</h3>
              <p className="text-sm text-gray-600">New registrations</p>
            </motion.div>
          </div>
        )}

        {/* Analytics Chart */}
        {chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-12"
          >
            <h2 className="text-gray-900 mb-6 text-2xl font-bold">Activity Over Time</h2>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#A78BFA"
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                  name="Page Visits"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="logins"
                  stroke="#4ECDC4"
                  fillOpacity={1}
                  fill="url(#colorLogins)"
                  name="Logins"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* User Type Stats */}
        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-white rounded-2xl shadow-lg"
            >
              <h3 className="text-gray-900 mb-4">Users by Type</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kids</span>
                  <span className="px-3 py-1 bg-[#FF6B9D]/10 text-[#FF6B9D] rounded-full">
                    {stats.usersByType.kid}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Parents/Teachers</span>
                  <span className="px-3 py-1 bg-[#A78BFA]/10 text-[#A78BFA] rounded-full">
                    {stats.usersByType.parent}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pastors/Leaders</span>
                  <span className="px-3 py-1 bg-[#4ECDC4]/10 text-[#4ECDC4] rounded-full">
                    {stats.usersByType.leader}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-white rounded-2xl shadow-lg"
            >
              <h3 className="text-gray-900 mb-4">Kids by Title</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Treasures (0-2)</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {stats.usersByTitle.Treasures}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sparks (3-5)</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                    {stats.usersByTitle.Sparks}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stars (6-9)</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {stats.usersByTitle.Stars}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trailblazers (10-12)</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {stats.usersByTitle.Trailblazers}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 bg-white rounded-2xl shadow-lg"
            >
              <h3 className="text-gray-900 mb-4">Top Countries</h3>
              <div className="space-y-3 max-h-[200px] overflow-y-auto">
                {Object.entries(stats.usersByCountry || {}).map(([country, count]: any) => (
                  <div key={country} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm truncate">{country}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 bg-gradient-to-br from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] rounded-2xl text-white"
            >
              <h3 className="mb-4">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <p>📊 Total Signups: {stats.signups}</p>
                <p>👥 Total Logins: {stats.logins}</p>
                <p>👁️ Page Views: {stats.pageVisits}</p>
                <p>✨ Active Users: {stats.totalUsers}</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-gray-900 text-3xl font-bold">
              {activeTab === 'users' ? 'User Management' : 'Blue Elite Staff Giving'}
            </h2>

            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'users'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('blue_elite')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'blue_elite'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                Staff Giving
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'users' ? "Search users..." : "Search staff..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B9D]"
              />
            </div>
            {activeTab === 'users' && (
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B9D]"
              >
                <option value="all">All Users</option>
                <option value="kid">Kids</option>
                <option value="parent">Parents/Teachers</option>
                <option value="leader">Pastors/Leaders</option>
              </select>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {activeTab === 'users' ? (
                    <>
                      <th className="text-left py-3 px-4 text-gray-600">Title</th>
                      <th className="text-left py-3 px-4 text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-gray-600">Username</th>
                      <th className="text-left py-3 px-4 text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 text-gray-600">Occupation</th>
                      <th className="text-left py-3 px-4 text-gray-600">Country</th>
                      <th className="text-left py-3 px-4 text-gray-600">Visits</th>
                      <th className="text-left py-3 px-4 text-gray-600">Last Visit</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left py-3 px-4 text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-gray-600">Title</th>
                      <th className="text-left py-3 px-4 text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-gray-600">Department</th>
                      <th className="text-left py-3 px-4 text-gray-600">Church</th>
                      <th className="text-left py-3 px-4 text-gray-600">Zone</th>
                      <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  activeTab === 'users' ? (
                    filteredUsers.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-8 text-gray-500">No users found</td></tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600">{user.title || '-'}</td>
                          <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                          <td className="py-3 px-4 text-gray-600">{user.username}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${user.type === 'kid'
                              ? 'bg-[#FF6B9D]/10 text-[#FF6B9D]'
                              : user.type === 'parent'
                                ? 'bg-[#A78BFA]/10 text-[#A78BFA]'
                                : 'bg-[#4ECDC4]/10 text-[#4ECDC4]'
                              }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.occupation || '-'}</td>
                          <td className="py-3 px-4 text-gray-600">{user.country || 'Unknown'}</td>
                          <td className="py-3 px-4 text-gray-600">{user.visitCount || 0}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    filteredBlueElite.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-8 text-gray-500">No records found</td></tr>
                    ) : (
                      filteredBlueElite.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{item.title}</td>
                          <td className="py-3 px-4 font-medium">{item.first_name} {item.last_name}</td>
                          <td className="py-3 px-4 text-gray-600">{item.department}</td>
                          <td className="py-3 px-4 text-gray-600">{item.church}</td>
                          <td className="py-3 px-4 text-gray-600">{item.zone}</td>
                          <td className="py-3 px-4 text-gray-900 font-semibold">{item.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'success' || item.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (Only for Users for now) */}
          {!loading && activeTab === 'users' && filteredUsers.length > 0 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
