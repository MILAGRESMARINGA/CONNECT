import React from 'react';
import { Settings as SettingsIcon, Users, Bell, Lock, Database, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const settingsSections = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      path: '/settings/users',
    },
    {
      title: 'Notifications',
      description: 'Configure email and system notifications',
      icon: Bell,
      path: '/settings/notifications',
    },
    {
      title: 'Security',
      description: 'Security settings and authentication options',
      icon: Lock,
      path: '/settings/security',
    },
    {
      title: 'Data Management',
      description: 'Database settings and data retention policies',
      icon: Database,
      path: '/settings/database',
    },
    {
      title: 'Workflow',
      description: 'Customize workflow and automation rules',
      icon: Workflow,
      path: '/settings/workflow',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-neutral-500" />
            System Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Configure system-wide settings and manage user access
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <Link
            key={index}
            to={section.path}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-neutral-100"
          >
            <div className="flex items-start gap-4">
              <div className="text-primary-600">
                <section.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">{section.title}</h3>
                <p className="text-neutral-600 text-sm mt-1">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;