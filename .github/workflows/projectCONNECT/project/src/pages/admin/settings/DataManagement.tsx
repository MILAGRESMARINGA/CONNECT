import { useState } from 'react';
import { Database, ChevronLeft, Download, Trash2, Archive, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BackupJob {
  id: string;
  type: 'manual' | 'automatic';
  status: 'completed' | 'in_progress' | 'failed';
  size: string;
  timestamp: string;
}

const DataManagement = () => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [retentionDays, setRetentionDays] = useState(30);
  
  const [backups] = useState<BackupJob[]>([
    {
      id: '1',
      type: 'automatic',
      status: 'completed',
      size: '256 MB',
      timestamp: '2024-03-15 00:00:00',
    },
    {
      id: '2',
      type: 'manual',
      status: 'completed',
      size: '255 MB',
      timestamp: '2024-03-14 14:30:00',
    },
    {
      id: '3',
      type: 'automatic',
      status: 'failed',
      size: '0 MB',
      timestamp: '2024-03-13 00:00:00',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-neutral-900 flex items-center gap-2">
              <Database className="h-6 w-6 text-neutral-500" />
              Data Management
            </h1>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Manage database backups and data retention policies
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Archive className="h-4 w-4 mr-2" />
            Backup Now
          </button>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-900">Backup Settings</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">Automatic Backups</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Enable daily automatic backups of your database
                  </p>
                </div>
                <button
                  onClick={() => setAutoBackup(!autoBackup)}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    autoBackup ? 'bg-primary-600' : 'bg-neutral-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                      autoBackup ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                value={retentionDays}
                onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
              <p className="mt-2 text-sm text-neutral-500">
                Backups older than this will be automatically deleted
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-900">Backup History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {backup.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      backup.type === 'automatic' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {backup.type === 'automatic' ? 'Automatic' : 'Manual'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {backup.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      backup.status === 'completed'
                        ? 'bg-success-100 text-success-800'
                        : backup.status === 'in_progress'
                        ? 'bg-warning-100 text-warning-800'
                        : 'bg-error-100 text-error-800'
                    }`}>
                      {backup.status === 'completed' && 'Completed'}
                      {backup.status === 'in_progress' && (
                        <>
                          <RefreshCw className="animate-spin h-3 w-3 mr-1" />
                          In Progress
                        </>
                      )}
                      {backup.status === 'failed' && 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      Download
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;