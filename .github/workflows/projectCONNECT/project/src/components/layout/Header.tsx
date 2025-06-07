import { useState } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, message: '3 callbacks pendentes', time: '5 minutos atrás' },
    { id: 2, message: '2 novas visitas agendadas', time: '30 minutos atrás' },
    { id: 3, message: 'Novo visitante registrado', time: '1 hora atrás' },
  ];

  return (
    <header className="sticky top-0 bg-white shadow z-20">
      <div className="flex justify-between items-center h-16 px-4 lg:px-6">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <div className="ml-4 relative rounded-md shadow-sm max-w-xs hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-neutral-300 rounded-md h-9"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <span className="absolute -top-1 -right-1 h-4 w-4 text-xs rounded-full bg-red-500 text-white flex items-center justify-center">
                {notifications.length}
              </span>
              <Bell className="h-6 w-6" />
            </button>

            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-3 border-b border-neutral-200">
                  <h3 className="text-sm font-medium text-neutral-700">Notificações</h3>
                </div>
                <div className="py-1 max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <a
                      key={notification.id}
                      href="#"
                      className="block px-4 py-3 hover:bg-neutral-50 transition ease-in-out duration-150"
                    >
                      <p className="text-sm text-neutral-700">{notification.message}</p>
                      <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
                    </a>
                  ))}
                </div>
                <div className="border-t border-neutral-200 p-2">
                  <a
                    href="#"
                    className="block text-center text-sm text-primary-600 hover:text-primary-500 hover:underline"
                  >
                    Ver todas
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="flex items-center">
            <span className="hidden md:block text-sm font-medium text-neutral-700 mr-2">
              {user?.name}
            </span>
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-primary-700 transition-colors">
              {user?.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;