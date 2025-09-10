import React, { useState } from 'react';
import { ArrowLeft, Shield, Search, Filter, Eye, Download, Clock, User, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface AuditLogsProps {
  onNavigate: (view: string) => void;
}

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  result: 'success' | 'failure';
  details: string;
}

function AuditLogs({ onNavigate }: AuditLogsProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // サンプル監査ログデータ
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-07-20T14:30:00Z',
      userId: 'user-001',
      userName: '田中太郎',
      action: 'APPLICATION_APPROVED',
      resource: 'business_trip_application',
      resourceId: 'BT-2024-001',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      result: 'success',
      details: '東京出張申請を承認'
    },
    {
      id: '2',
      timestamp: '2024-07-20T10:15:00Z',
      userId: 'user-002',
      userName: '佐藤花子',
      action: 'USER_LOGIN',
      resource: 'authentication',
      resourceId: 'auth-session-001',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      result: 'success',
      details: 'ユーザーログイン成功'
    },
    {
      id: '3',
      timestamp: '2024-07-20T09:45:00Z',
      userId: 'user-003',
      userName: '鈴木次郎',
      action: 'REGULATION_UPDATED',
      resource: 'travel_regulation',
      resourceId: 'REG-2024-001',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      result: 'success',
      details: '出張規程v3.0を更新'
    },
    {
      id: '4',
      timestamp: '2024-07-19T16:20:00Z',
      userId: 'user-004',
      userName: '高橋美咲',
      action: 'LOGIN_FAILED',
      resource: 'authentication',
      resourceId: 'auth-attempt-001',
      ipAddress: '203.0.113.1',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      result: 'failure',
      details: 'パスワード認証失敗（3回目）'
    }
  ];

  const actionTypes = [
    'USER_LOGIN',
    'USER_LOGOUT',
    'LOGIN_FAILED',
    'APPLICATION_CREATED',
    'APPLICATION_APPROVED',
    'APPLICATION_REJECTED',
    'REGULATION_CREATED',
    'REGULATION_UPDATED',
    'USER_INVITED',
    'SETTINGS_CHANGED'
  ];

  const users = ['田中太郎', '佐藤花子', '鈴木次郎', '高橋美咲'];

  const getActionLabel = (action: string) => {
    const labels: { [key: string]: string } = {
      'USER_LOGIN': 'ユーザーログイン',
      'USER_LOGOUT': 'ユーザーログアウト',
      'LOGIN_FAILED': 'ログイン失敗',
      'APPLICATION_CREATED': '申請作成',
      'APPLICATION_APPROVED': '申請承認',
      'APPLICATION_REJECTED': '申請否認',
      'REGULATION_CREATED': '規程作成',
      'REGULATION_UPDATED': '規程更新',
      'USER_INVITED': 'ユーザー招待',
      'SETTINGS_CHANGED': '設定変更'
    };
    return labels[action] || action;
  };

  const getActionColor = (action: string) => {
    if (action.includes('FAILED') || action.includes('REJECTED')) {
      return 'text-red-700 bg-red-100';
    }
    if (action.includes('APPROVED') || action.includes('SUCCESS')) {
      return 'text-emerald-700 bg-emerald-100';
    }
    if (action.includes('LOGIN') || action.includes('LOGOUT')) {
      return 'text-blue-700 bg-blue-100';
    }
    return 'text-slate-700 bg-slate-100';
  };

  const getResultColor = (result: string) => {
    return result === 'success' 
      ? 'text-emerald-700 bg-emerald-100' 
      : 'text-red-700 bg-red-100';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesUser = userFilter === 'all' || log.userName === userFilter;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const logDate = new Date(log.timestamp);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = logDate >= startDate && logDate <= endDate;
    }
    
    return matchesSearch && matchesAction && matchesUser && matchesDate;
  });

  const handleExport = () => {
    alert('監査ログをCSVファイルでエクスポートします');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="flex h-screen relative">
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} onNavigate={onNavigate} currentView="audit-logs" />
        </div>

        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNavigate={onNavigate} currentView="audit-logs" />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMenuClick={toggleSidebar} onNavigate={onNavigate} />
          
          <div className="flex-1 overflow-auto p-4 lg:p-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>戻る</span>
                  </button>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">監査ログ</h1>
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-900 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>ログ出力</span>
                </button>
              </div>

              {/* フィルター */}
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4 border border-white/30 shadow-xl mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="ユーザー、アクション、詳細で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                    />
                  </div>
                  <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                  >
                    <option value="all">すべてのアクション</option>
                    {actionTypes.map(action => (
                      <option key={action} value={action}>{getActionLabel(action)}</option>
                    ))}
                  </select>
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                  >
                    <option value="all">すべてのユーザー</option>
                    {users.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                  />
                </div>
              </div>

              {/* ログ一覧 */}
              <div className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/30 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/30 border-b border-white/30">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-slate-700">日時</th>
                        <th className="text-left py-4 px-6 font-medium text-slate-700">ユーザー</th>
                        <th className="text-left py-4 px-6 font-medium text-slate-700">アクション</th>
                        <th className="text-left py-4 px-6 font-medium text-slate-700">リソース</th>
                        <th className="text-left py-4 px-6 font-medium text-slate-700">結果</th>
                        <th className="text-left py-4 px-6 font-medium text-slate-700">IPアドレス</th>
                        <th className="text-center py-4 px-6 font-medium text-slate-700">詳細</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-500">
                            条件に一致するログが見つかりません
                          </td>
                        </tr>
                      ) : (
                        filteredLogs.map((log) => (
                          <tr key={log.id} className="border-b border-white/20 hover:bg-white/20 transition-colors">
                            <td className="py-4 px-6 text-slate-700 text-sm">
                              {new Date(log.timestamp).toLocaleString('ja-JP')}
                            </td>
                            <td className="py-4 px-6 text-slate-800">{log.userName}</td>
                            <td className="py-4 px-6">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                                {getActionLabel(log.action)}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-700 text-sm">{log.resourceId}</td>
                            <td className="py-4 px-6">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(log.result)}`}>
                                {log.result === 'success' ? '成功' : '失敗'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-600 text-sm font-mono">{log.ipAddress}</td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => alert(`詳細: ${log.details}\nUser Agent: ${log.userAgent}`)}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-colors"
                                title="詳細表示"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;