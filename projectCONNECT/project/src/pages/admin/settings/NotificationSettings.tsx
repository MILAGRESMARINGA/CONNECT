import { useState } from 'react';
import { Bell, ChevronLeft, Mail, MessageSquare, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'whatsapp' | 'push';
  enabled: boolean;
  config: {
    sender?: string;
    subject?: string;
    template?: string;
  };
}

interface NotificationEvent {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  channels: string[];
}

const NotificationSettings = () => {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: '1',
      name: 'System Email',
      type: 'email',
      enabled: true,
      config: {
        sender: 'noreply@connect.com',
        subject: 'CONNECT - {event_name}',
        template: 'default_email',
      },
    },
    {
      id: '2',
      name: 'WhatsApp Notifications',
      type: 'whatsapp',
      enabled: true,
      config: {
        sender: '+5544999999999',
        template: 'default_whatsapp',
      },
    },
    {
      id: '3',
      name: 'Push Notifications',
      type: 'push',
      enabled: false,
      config: {
        template: 'default_push',
      },
    },
  ]);

  const [events, setEvents] = useState<NotificationEvent[]>([
    {
      id: '1',
      name: 'New Visitor',
      description: 'When a new visitor is registered',
      enabled: true,
      channels: ['1', '2'],
    },
    {
      id: '2',
      name: 'Decision Made',
      description: 'When someone accepts Jesus or reconciles',
      enabled: true,
      channels: ['1', '2'],
    },
    {
      id: '3',
      name: 'Visit Scheduled',
      description: 'When a new visit is scheduled',
      enabled: true,
      channels: ['1', '2'],
    },
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel =>
      channel.id === channelId
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  const toggleEvent = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, enabled: !event.enabled }
        : event
    ));
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'whatsapp':
        return <MessageSquare className="h-5 w-5" />;
      case 'push':
        return <BellRing className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

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
              <Bell className="h-6 w-6 text-neutral-500" />
              Notification Settings
            </h1>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Configure notification channels and event triggers
          </p>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-900">Notification Channels</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {channels.map(channel => (
            <div key={channel.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${channel.enabled ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-500'}`}>
                    {getChannelIcon(channel.type)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-neutral-900">{channel.name}</h3>
                    <div className="mt-1 text-sm text-neutral-500">
                      {channel.config.sender && (
                        <div>From: {channel.config.sender}</div>
                      )}
                      {channel.config.subject && (
                        <div>Subject: {channel.config.subject}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => toggleChannel(channel.id)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      channel.enabled ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        channel.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Events */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-900">Event Notifications</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {events.map(event => (
            <div key={event.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900">{event.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{event.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    {event.channels.map(channelId => {
                      const channel = channels.find(c => c.id === channelId);
                      if (!channel) return null;
                      return (
                        <span
                          key={channelId}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {channel.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => toggleEvent(event.id)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      event.enabled ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        event.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;