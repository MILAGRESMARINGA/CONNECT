import { useAuth } from '../context/AuthContext';
import { PERMISSIONS } from '../types/auth';

export function useRole() {
  const { user } = useAuth();

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false;
    
    // Coordenador tem todas as permissões
    if (user.role === 'coordenador') return true;
    
    // Verifica se o usuário tem a permissão específica
    return user.permissions.includes(permissionId);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const getRolePermissions = () => {
    if (!user) return [];
    return PERMISSIONS[user.role] || [];
  };

  return {
    role: user?.role,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getRolePermissions,
  };
}