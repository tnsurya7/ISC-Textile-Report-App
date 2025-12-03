import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Toast from '../../components/Toast';

export default function EditRecord() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    partyDc: '',
    paddingDc: '',
    partyName: '',
    fabricQuality: '',
    partyMtr: '',
    paddingMtr: '',
    shortOrExcess: '',
    printMtr: '',
    outwardMtr: '',
    balance: ''
  });

  useEffect(() => {
    if (id) {
      fetchRecord();
    }
  }, [id]);

  const fetchRecord = async () => {
    try {
      const response = await fetch('/api/getRecords');
      const data = await response.json();
      
      if (data.success) {
        const record = data.records.find(r => r.id === id);
        if (record) {
          setFormData(record);
        }
      }
    } catch (error) {
      console.error('Error fetching record:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/editRecord?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setToast({ message: 'Record updated successfully!', type: 'success' });
        setTimeout(() => router.push('/records'), 1500);
      } else {
        setToast({ message: 'Error: ' + data.error, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error updating record', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Record</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.label}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/records')}
            className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
