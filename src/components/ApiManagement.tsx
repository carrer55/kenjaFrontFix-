import React, { useState } from 'react';
import { ArrowLeft, Key, Plus, Copy, Eye, EyeOff, Trash2, RefreshCw, Activity } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface ApiManagementProps {
  onNavigate: (view: string) => void;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
  usageCount: number;
}

function ApiManagement({ onNavigate }: ApiManagementProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [newKeyForm, setNewKeyForm] = useState({
    name: '',
    permissions: [] as string[]
  });

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'メインAPI',
      key: 'kenja_live_1234567890abcdef1234567890abcdef',
      permissions: ['read:applications', 'write:applications', 'read:users'],
      createdAt: '2024-07-01T10:00:00Z',
      lastUsed: '2024-07-20T14:30:00Z',
      isActive: true,
      usageCount: 1250
    },
    {
      id: '2',
      name: '会計ソフト連携',
      key: 'kenja_live_abcdef1234567890abcdef1234567890',
      permissions: ['read:applications', 'read:expenses'],
      createdAt: '2024-06-15T09:00:00Z',
      lastUsed: '2024-07-19T16:45:00Z',
      isActive: true,
      usageCount: 856
    }
  ]);

  const availablePermissions = [
    { id: 'read:applications', label: '申請データ読み取り' },
    { id: 'write:applications', label: '申請データ書き込み' },
    { id: 'read:users', label: 'ユーザー情報読み取り' },
    { id: 'write:users', label: 'ユーザー情報書き込み' },
    { id: 'read:expenses', label: '経費データ読み取り' },
    { id: 'write:expenses', label: '経費データ書き込み' },
    { id: 'read:reports', label: 'レポートデータ読み取り' },
    { id: 'admin:all', label: '管理者権限（全操作）' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => 
      prev.includes(keyId) 
        ? prev.filter(id => id !== keyId)
        : [...prev, keyId]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('APIキーをクリップボードにコピーしました');
  };

  const generateApiKey = () => {
    return `kenja_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  };

  const handleCreateApiKey = () => {
    if (!newKeyForm.name || newKeyForm.permissions.length === 0) {
      alert('名前と権限を設定してください');
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyForm.name,
      key: generateApiKey(),
      permissions: newKeyForm.permissions,
      createdAt: new Date().toISOString(),
      isActive: true,
      usageCount: 0
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyForm({ name: '', permissions: [] });
    setShowCreateModal(false);
    alert('新しいAPIキーが作成されました');
  };

  const handleDeleteKey = (keyId: string) => {
    if (confirm('このAPIキーを削除してもよろしいですか？')) {
      setApiKeys(prev => prev.filter(key => key.id !== keyId));
      alert('APIキーが削除されました');
    }
  };

  const handleToggleKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, isActive: !key.isActive } : key
    ));
  };

  const handlePermissionToggle = (permission: string) => {
    setNewKeyForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const maskApiKey = (key: string) => {
    return `${key.substring(0, 12)}${'*'.repeat(20)}${key.substring(key.length - 8)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="flex h-screen relative">
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} onNavigate={onNavigate} currentView="api-management" />
        </div>

        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNavigate={onNavigate} currentView="api-management" />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMenuClick={toggleSidebar} onNavigate={onNavigate} />
          
          <div className="flex-1 overflow-auto p-4 lg:p-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>戻る</span>
                  </button>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">API管理</h1>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-navy-600 to-navy-800 text-white rounded-lg font-medium hover:from-navy-700 hover:to-navy-900 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>APIキー作成</span>
                </button>
              </div>

              {/* API使用状況 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl text-center">
                  <Activity className="w-8 h-8 text-navy-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">今月のAPI呼び出し</h3>
                  <p className="text-3xl font-bold text-slate-800">2,106</p>
                  <p className="text-sm text-slate-600">前月比 +12%</p>
                </div>
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl text-center">
                  <Key className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">アクティブキー</h3>
                  <p className="text-3xl font-bold text-slate-800">{apiKeys.filter(k => k.isActive).length}</p>
                  <p className="text-sm text-slate-600">/ {apiKeys.length} 個</p>
                </div>
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl text-center">
                  <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">成功率</h3>
                  <p className="text-3xl font-bold text-emerald-600">99.8%</p>
                  <p className="text-sm text-slate-600">過去30日間</p>
                </div>
              </div>

              {/* APIキー一覧 */}
              <div className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/30 shadow-xl">
                <div className="p-6 border-b border-white/30">
                  <h2 className="text-xl font-semibold text-slate-800">APIキー一覧</h2>
                </div>
                <div className="divide-y divide-white/20">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold text-slate-800">{apiKey.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              apiKey.isActive ? 'text-emerald-700 bg-emerald-100' : 'text-slate-700 bg-slate-100'
                            }`}>
                              {apiKey.isActive ? 'アクティブ' : '無効'}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center space-x-3">
                              <code className="bg-slate-800 text-emerald-400 px-3 py-2 rounded text-sm font-mono">
                                {visibleKeys.includes(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                              </code>
                              <button
                                onClick={() => toggleKeyVisibility(apiKey.id)}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-colors"
                              >
                                {visibleKeys.includes(apiKey.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(apiKey.key)}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-white/30 rounded-lg transition-colors"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-4">
                            <div>
                              <span className="font-medium">作成日:</span> {new Date(apiKey.createdAt).toLocaleDateString('ja-JP')}
                            </div>
                            <div>
                              <span className="font-medium">最終使用:</span> {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString('ja-JP') : '未使用'}
                            </div>
                            <div>
                              <span className="font-medium">使用回数:</span> {apiKey.usageCount.toLocaleString()}回
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-slate-700 mb-2">権限:</p>
                            <div className="flex flex-wrap gap-2">
                              {apiKey.permissions.map((permission) => (
                                <span key={permission} className="px-2 py-1 rounded-full text-xs font-medium text-blue-700 bg-blue-100">
                                  {availablePermissions.find(p => p.id === permission)?.label || permission}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleKey(apiKey.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              apiKey.isActive 
                                ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-50/30' 
                                : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50/30'
                            }`}
                            title={apiKey.isActive ? '無効化' : '有効化'}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKey(apiKey.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50/30 rounded-lg transition-colors"
                            title="削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APIキー作成モーダル */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">新しいAPIキーを作成</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  キー名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newKeyForm.name}
                  onChange={(e) => setNewKeyForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-400"
                  placeholder="例：会計ソフト連携"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  権限 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newKeyForm.permissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="w-4 h-4 text-navy-600 bg-white border-slate-300 rounded focus:ring-navy-400 focus:ring-2"
                      />
                      <span className="text-sm text-slate-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleCreateApiKey}
                className="px-4 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg transition-colors"
              >
                作成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiManagement;