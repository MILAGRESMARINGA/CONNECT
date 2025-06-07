import { FC, ReactNode } from 'react';
import { useRole } from '../../hooks/useRole';

interface ProtectedByRoleProps {
  children: ReactNode;
  permissions?: string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

const ProtectedByRole: FC<ProtectedByRoleProps> = ({
  children,
  permissions = [],
  requireAll = false,
  fallback = null,
}) => {
  const { hasAnyPermission, hasAllPermissions } = useRole();

  if (!permissions.length) return <>{children}</>;

  const hasAccess = requireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default ProtectedByRole;