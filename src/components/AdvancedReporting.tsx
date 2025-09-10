import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Download, Calendar, Filter, TrendingUp, Users, Building, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface AdvancedReportingProps {
  onNavigate: (view: string) => void;
}

function AdvancedReporting({ onNavigate }: AdvancedReportingProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState('expense-analysis');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-12-31' });
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const reportTypes = [
    { id: 'expense-analysis', label: '経費分析レポート', icon: BarChart3 },
    { id: 'department-comparison', label: '部門別比較レポート', icon: Building },
    { id: 'user-activity', label: 'ユーザー活動レポート', icon: Users },
    { id: 'compliance-report', label: 'コンプライアンスレポート', icon: FileText },
    { id: 'tax-optimization', label: '節税効果レポート', icon: TrendingUp }
  ];

  const departments = ['営業部', '総務部', '開発部', '企画部', '経理部'];

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    alert(`${format.toUpperCase()}形式でレポートをエクスポートします`);
  };

  const renderExpenseAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/30 rounded-lg p-6 text-center">
          <h3 className="text-sm text-slate-600 mb-2">総経費額</h3>
          <p className="text-3xl font-bold text-slate-800">¥2,450,000</p>
          <p className="text-sm text-emerald-600">前年比 +12%</p>
        </div>
        <div className="bg-white/30 rounded-lg p-6 text-center">
          <h3 className="text-sm text-slate-600 mb-2">出張回数</h3>
          <p className="text-3xl font-bold text-slate-800">156回</p>
          <p className="text-sm text-amber-600">前年比 +8%</p>
        </div>
        <div className="bg-white/30 rounded-lg p-6 text-center">
          <h3 className="text-sm text-slate-600 mb-2">平均単価</h3>
          <p className="text-3xl font-bold text-slate-800">¥15,705</p>
          <p className="text-sm text-red-600">前年比 +3%</p>
        </div>
        <div className="bg-white/30 rounded-lg p-6 text-center">
          <h3 className="text-sm text-slate-600 mb-2">節税効果</h3>
          <p className="text-3xl font-bold text-emerald-600">¥980,000</p>
          <p className="text-sm text-emerald-600">年間節税額</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">月別経費推移</h3>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">グラフ表示エリア</p>
          </div>
        </div>
        <div className="bg-white/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">経費カテゴリ別分析</h3>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">円グラフ表示エリア</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDepartmentComparison = () => (
    <div className="space-y-6">
      <div className="bg-white/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">部門別経費比較</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/30">
                <th className="text-left py-3 px-4 font-medium text-slate-700">部門</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">総経費</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">出張回数</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">平均単価</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">前年比</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/20">
                <td className="py-3 px-4 text-slate-800">営業部</td>
                <td className="py-3 px-4 text-right text-slate-800">¥980,000</td>
                <td className="py-3 px-4 text-right text-slate-800">62回</td>
                <td className="py-3 px-4 text-right text-slate-800">¥15,806</td>
                <td className="py-3 px-4 text-right text-emerald-600">+15%</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 px-4 text-slate-800">開発部</td>
                <td className="py-3 px-4 text-right text-slate-800">¥650,000</td>
                <td className="py-3 px-4 text-right text-slate-800">35回</td>
                <td className="py-3 px-4 text-right text-slate-800">¥18,571</td>
                <td className="py-3 px-4 text-right text-amber-600">+8%</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 px-4 text-slate-800">総務部</td>
                <td className="py-3 px-4 text-right text-slate-800">¥420,000</td>
                <td className="py-3 px-4 text-right text-slate-800">28回</td>
                <td className="py-3 px-4 text-right text-slate-800">¥15,000</td>
                <td className="py-3 px-4 text-right text-red-600">-2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23334155%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

      <div className="flex h-screen relative">
        <div className="hidden lg:block">
          <Sidebar isOpen={true} onClose={() => {}} onNavigate={onNavigate} currentView="advanced-reporting" />
        </div>

        {isSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onNavigate={onNavigate} currentView="advanced-reporting" />
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
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">高度なレポート</h1>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-900 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Excel</span>
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>

              {/* フィルター */}
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4 border border-white/30 shadow-xl mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                  >
                    {reportTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
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
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-4 py-3 bg-white/50 border border-white/40 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-400 backdrop-blur-xl"
                  >
                    <option value="all">すべての部署</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* レポート内容 */}
              <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 border border-white/30 shadow-xl">
                {selectedReport === 'expense-analysis' && renderExpenseAnalysis()}
                {selectedReport === 'department-comparison' && renderDepartmentComparison()}
                {selectedReport === 'user-activity' && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">ユーザー活動レポート</h3>
                    <p className="text-slate-600">ユーザーの活動状況とシステム利用状況を分析</p>
                  </div>
                )}
                {selectedReport === 'compliance-report' && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">コンプライアンスレポート</h3>
                    <p className="text-slate-600">法令遵守状況と規程適用状況の分析</p>
                  </div>
                )}
                {selectedReport === 'tax-optimization' && (
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">節税効果レポート</h3>
                    <p className="text-slate-600">出張日当制度による節税効果の詳細分析</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedReporting;