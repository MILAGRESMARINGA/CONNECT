import { useState } from 'react';
import { Lock, ChevronLeft, Shield, Key, History } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SecurityLog {
  id: string;
  user: string;
  action: string;
  ip: string;
  timestamp: string;
}

const SecuritySettings = () => {
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    expiryDays: 90,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [logs] = useState<SecurityLog[]>([
    {
      id: '1',
      user: 'João Silva',
      action: 'Login successful',
      ip: '192.168.1.100',
      timestamp: '2024-03-15 14:30:00',
    },
    {
      id: '2',
      user: 'Maria Santos',
      action: 'Password changed',
      ip: '192.168.1.101',
      timestamp: '2024-03-15 13:45:00',
    },
    {
      id: '3',
      user: 'Pedro Oliveira',
      action: 'Failed login attempt',
      ip: '192.168.1.102',
      timestamp: '2024-03-15 13:15:00',
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
              <Lock className="h-6 w-6 text-neutral-500" />
              Security Settings
            </h1>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Configure security policies and view access logs
          </p>
        </div>
      </div>

      {/* Password Policy */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center">
            <Key className="h-5 w-5 text-neutral-500 mr-2" />
            <h2 className="text-lg font-medium text-neutral-900">Password Policy</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Minimum Length
              </label>
              <input
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, minLength: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={passwordPolicy.expiryDays}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, expiryDays: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={passwordPolicy.requireUppercase}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireUppercase: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">
                Require uppercase letters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={passwordPolicy.requireLowercase}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireLowercase: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">
                Require lowercase letters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={passwordPolicy.requireNumbers}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireNumbers: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">
                Require numbers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={passwordPolicy.requireSymbols}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireSymbols: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">
                Require special characters
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-neutral-500 mr-2" />
            <h2 className="text-lg font-medium text-neutral-900">Two-Factor Authentication</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-neutral-900">Enable 2FA</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                twoFactorEnabled ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center">
            <History className="h-5 w-5 text-neutral-500 mr-2" />
            <h2 className="text-lg font-medium text-neutral-900">Security Logs</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {log.ip}
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

export default SecuritySettings;