import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Map, 
  Settings, 
  FileBarChart, 
  Home, 
  LogOut,
  UserPlus, 
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LogoConnect from '../LogoConnect';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { logout, hasPermission } = useAuth();

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', permission: 'view_dashboard' },
    { name: 'Visitantes', icon: UserPlus, href: '/visitors', permission: '' },
    { name: 'Visitas', icon: Home, href: '/visits', permission: '' },
    { name: 'Voluntários', icon: Users, href: '/volunteers', permission: 'manage_volunteers' },
    { name: 'Grupos', icon: Map, href: '/small-groups', permission: '' },
    { name: 'Escalas', icon: Clock, href: '/scheduling', permission: '' },
    { name: 'Agenda', icon: Calendar, href: '/calendar', permission: '' },
    { name: 'Relatórios', icon: FileBarChart, href: '/reports', permission: 'view_dashboard' },
    { name: 'Configurações', icon: Settings, href: '/settings', permission: 'manage_system' },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } border-r border-neutral-200`}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar header */}
        <div className="h-24 flex items-center justify-center px-4 border-b border-neutral-200">
          <div className="relative w-full">
            <div className="text-sm font-medium text-[#B25929] absolute -top-2 left-1/2 -translate-x-1/2">CIA</div>
            <LogoConnect className="scale-75 origin-center" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <div className="space-y-1">
            {navigation
              .filter((item) => !item.permission || hasPermission(item.permission))
              .map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-colors w-full ${
                      isActive
                        ? 'bg-[#B25929]/10 text-[#B25929] hover:bg-[#B25929]/20'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                  onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={logout}
            className="w-full flex items-center px-2 py-2.5 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;