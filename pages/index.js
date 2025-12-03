import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Toast from '../components/Toast';
import DeleteModal from '../components/DeleteModal';
import { exportToPDF } from '../utils/pdfExport';
import { exportToExcel } from '../utils/excelExport';

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, record: null });
  const [dateFilter, setDateFilter] = useState('all');
  const [customDates, setCustomDates] = useState({ start: '', end: '' });
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '', partyDc: '', paddingDc: '', partyName: '', fabricQuality: '', partyMtr: '', paddingMtr: '',
    shortOrExcess: '', printMtr: '', outwardMtr: '', balance: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Ensure client-side only
    if (typeof window === 'undefined') return;
    
    setFormData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
    fetchRecords();

    // PWA Install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [records, searchTerm, dateFilter, customDates]);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/getRecords');
      const data = await response.json();
      if (data.success) setRecords(data.records);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...records];
    if (searchTerm) {
      filtered = filtered.filter(record =>
        Object.values(record).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    const now = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(r => r.date === now.toISOString().split('T')[0]);
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(r => new Date(r.date) >= weekAgo);
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now); monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter(r => new Date(r.date) >= monthAgo);
    } else if (dateFilter === 'custom' && customDates.start && customDates.end) {
      filtered = filtered.filter(r => r.date >= customDates.start && r.date <= customDates.end);
    }
    setFilteredRecords(filtered);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/addRecord', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setToast({ message: 'Record added!', type: 'success' });
        setFormData({ date: new Date().toISOString().split('T')[0], partyDc: '', paddingDc: '', partyName: '', fabricQuality: '', partyMtr: '', paddingMtr: '', shortOrExcess: '', printMtr: '', outwardMtr: '', balance: '' });
        fetchRecords();
        setTimeout(() => setActiveTab('records'), 1500);
      } else {
        setToast({ message: 'Error: ' + data.error, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error adding record', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deleteRecord?id=${deleteModal.record.id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchRecords();
        setDeleteModal({ isOpen: false, record: null });
        setToast({ message: 'Deleted!', type: 'success' });
      }
    } catch (error) {
      setToast({ message: 'Error', type: 'error' });
    }
  };

  const handleSelectRecord = (id) => setSelectedRecords(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedRecords(selectedRecords.length === filteredRecords.length ? [] : filteredRecords.map(r => r.id));

  const handleInstallClick = async () => {
    if (typeof window === 'undefined') return;
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallButton(false);
        setToast({ message: 'App installed successfully!', type: 'success' });
      }
      setDeferredPrompt(null);
    } else {
      // Show instructions for manual installation
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        setToast({ message: 'PWA install only works on HTTPS. Deploy to production to enable installation.', type: 'warning' });
      } else if (isIOS) {
        setToast({ message: 'iOS: Tap Share (📤) → "Add to Home Screen"', type: 'info' });
      } else if (isAndroid) {
        setToast({ message: 'Android: Tap menu (⋮) → "Install app"', type: 'info' });
      } else {
        setToast({ message: 'Desktop: Click Chrome menu (⋮) → "Install Indian Soft Colours"', type: 'info' });
      }
    }
  };

  const stats = {
    totalRecords: filteredRecords.length,
    totalPartyMtr: filteredRecords.reduce((sum, r) => sum + (parseFloat(r.partyMtr) || 0), 0),
    totalPrintMtr: filteredRecords.reduce((sum, r) => sum + (parseFloat(r.printMtr) || 0), 0),
    totalOutwardMtr: filteredRecords.reduce((sum, r) => sum + (parseFloat(r.outwardMtr) || 0), 0),
    totalBalance: filteredRecords.reduce((sum, r) => sum + (parseFloat(r.balance) || 0), 0)
  };

  if (!mounted || loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1"></div>
        <Image src="/logo.png" alt="Logo" width={60} height={60} className="object-contain" style={{ width: 'auto', height: 'auto' }} priority={false} />
        <div className="flex-1 flex justify-end">
          <button onClick={handleInstallClick} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Install App
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab('add')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
        <button onClick={() => setActiveTab('records')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${activeTab === 'records' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Records
        </button>
        <button onClick={() => setActiveTab('reports')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${activeTab === 'reports' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Reports
        </button>
      </div>

      {activeTab === 'add' && (
        <div className="bg-white rounded-lg shadow p-4 border">
          <h2 className="text-xl font-bold mb-4">Add New Record</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'date', label: 'Date', type: 'date' },
                { name: 'partyDc', label: 'Party DC No', type: 'text' },
                { name: 'paddingDc', label: 'Padding DC No', type: 'text' },
                { name: 'partyName', label: 'Party Name', type: 'text' },
                { name: 'fabricQuality', label: 'Fabric Quality', type: 'text' },
                { name: 'partyMtr', label: 'Party Mtr', type: 'text' },
                { name: 'paddingMtr', label: 'Padding Mtr', type: 'text' },
                { name: 'shortOrExcess', label: 'Short/Excess', type: 'text' },
                { name: 'printMtr', label: 'Print Mtr', type: 'text' },
                { name: 'outwardMtr', label: 'Outward Mtr', type: 'text' },
                { name: 'balance', label: 'Balance', type: 'text' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder={field.label} />
                </div>
              ))}
            </div>
            <button type="submit" disabled={saving} className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2">
              {saving ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add Record
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'records' && (
        <div>
          <div className="bg-white rounded-lg shadow p-4 mb-4 border">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-md" />
              </div>
              <button onClick={() => exportToPDF(selectedRecords.length > 0 ? filteredRecords.filter(r => selectedRecords.includes(r.id)) : filteredRecords, 'records.pdf')} className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF
              </button>
              <button onClick={() => exportToExcel(selectedRecords.length > 0 ? filteredRecords.filter(r => selectedRecords.includes(r.id)) : filteredRecords, 'records.xlsx')} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Excel
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0} onChange={handleSelectAll} /></th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Party DC</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Padding DC</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Party</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Fabric</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Balance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><input type="checkbox" checked={selectedRecords.includes(record.id)} onChange={() => handleSelectRecord(record.id)} /></td>
                    <td className="px-4 py-3 text-sm">{record.date}</td>
                    <td className="px-4 py-3 text-sm">{record.partyDc || record.party_dc}</td>
                    <td className="px-4 py-3 text-sm">{record.paddingDc || record.padding_dc}</td>
                    <td className="px-4 py-3 text-sm">{record.partyName}</td>
                    <td className="px-4 py-3 text-sm">{record.fabricQuality}</td>
                    <td className="px-4 py-3 text-sm">{record.balance}</td>
                    <td className="px-4 py-3 text-sm">
                      <button onClick={() => router.push(`/edit/${record.id}`)} className="text-blue-600 mr-3">Edit</button>
                      <button onClick={() => setDeleteModal({ isOpen: true, record })} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <div className="bg-white rounded-lg shadow p-4 mb-4 border">
            <div className="flex flex-wrap gap-2 mb-4">
              {['all', 'today', 'week', 'month', 'custom'].map((filter) => (
                <button key={filter} onClick={() => setDateFilter(filter)} className={`px-4 py-2 rounded-md capitalize ${dateFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{filter}</button>
              ))}
            </div>
            {dateFilter === 'custom' && (
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={customDates.start} onChange={(e) => setCustomDates({...customDates, start: e.target.value})} className="px-3 py-2 border rounded-md" />
                <input type="date" value={customDates.end} onChange={(e) => setCustomDates({...customDates, end: e.target.value})} className="px-3 py-2 border rounded-md" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
            <div className="bg-white rounded-lg shadow p-4 border"><div className="text-xs text-gray-600">Records</div><div className="text-2xl font-bold">{stats.totalRecords}</div></div>
            <div className="bg-white rounded-lg shadow p-4 border"><div className="text-xs text-gray-600">Party Mtr</div><div className="text-xl font-bold text-green-600">{stats.totalPartyMtr.toFixed(2)}</div></div>
            <div className="bg-white rounded-lg shadow p-4 border"><div className="text-xs text-gray-600">Print Mtr</div><div className="text-xl font-bold text-purple-600">{stats.totalPrintMtr.toFixed(2)}</div></div>
            <div className="bg-white rounded-lg shadow p-4 border"><div className="text-xs text-gray-600">Outward Mtr</div><div className="text-xl font-bold text-orange-600">{stats.totalOutwardMtr.toFixed(2)}</div></div>
            <div className="bg-white rounded-lg shadow p-4 border"><div className="text-xs text-gray-600">Balance</div><div className="text-xl font-bold text-blue-600">{stats.totalBalance.toFixed(2)}</div></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => exportToPDF(filteredRecords, 'report.pdf')} className="flex-1 bg-red-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Export PDF
            </button>
            <button onClick={() => exportToExcel(filteredRecords, 'report.xlsx')} className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>
      )}

      <DeleteModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, record: null })} onConfirm={handleDelete} recordInfo={deleteModal.record} />
    </div>
  );
}
