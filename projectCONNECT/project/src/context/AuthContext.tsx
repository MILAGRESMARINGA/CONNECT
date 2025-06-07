import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, Role, PERMISSIONS } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  hasPermission: () => false,
});

// Mock users with roles and permissions
const mockUsers = [
  {
    id: '1',
    name: 'Coordenador Teste',
    email: 'coordenador@test.com',
    password: 'test@123',
    role: 'coordenador' as Role,
    permissions: PERMISSIONS.coordenador.map(p => p.id),
  },
  {
    id: '2',
    name: 'Líder Teste',
    email: 'lider@test.com',
    password: 'test@123',
    role: 'lider' as Role,
    permissions: PERMISSIONS.lider.map(p => p.id),
  },
  {
    id: '3',
    name: 'Coleta Teste',
    email: 'coleta@test.com',
    password: 'test@123',
    role: 'coleta' as Role,
    permissions: PERMISSIONS.coleta.map(p => p.id),
  },
  {
    id: '4',
    name: 'Callback Teste',
    email: 'callback@test.com',
    password: 'test@123',
    role: 'callback' as Role,
    permissions: PERMISSIONS.callback.map(p => p.id),
  },
  {
    id: '5',
    name: 'Visita Teste',
    email: 'visita@test.com',
    password: 'test@123',
    role: 'visita' as Role,
    permissions: PERMISSIONS.visita.map(p => p.id),
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('connectUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Credenciais inválidas');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('connectUser', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('connectUser');
  };

  const hasPermission = (permission: string) => {
    if (!user || !user.permissions) return false;
    if (user.role === 'coordenador') return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);