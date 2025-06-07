export type Role = 'coordenador' | 'lider' | 'coleta' | 'callback' | 'visita';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermissions {
  coordenador: Permission[];
  lider: Permission[];
  coleta: Permission[];
  callback: Permission[];
  visita: Permission[];
}

export const PERMISSIONS: RolePermissions = {
  coordenador: [
    { id: 'manage_visitors', name: 'Gerenciar Visitantes', description: 'Acesso total ao módulo de visitantes' },
    { id: 'manage_decisions', name: 'Gerenciar Decisões', description: 'Gerenciar decisões e acompanhamentos' },
    { id: 'manage_callbacks', name: 'Gerenciar Callbacks', description: 'Gerenciar e distribuir callbacks' },
    { id: 'manage_visits', name: 'Gerenciar Visitas', description: 'Gerenciar e agendar visitas' },
    { id: 'manage_groups', name: 'Gerenciar GCs', description: 'Gerenciar grupos e líderes' },
    { id: 'view_reports', name: 'Ver Relatórios', description: 'Acesso a todos os relatórios' },
    { id: 'manage_users', name: 'Gerenciar Usuários', description: 'Gerenciar usuários e permissões' },
    { id: 'manage_schedules', name: 'Gerenciar Escalas', description: 'Criar e editar escalas' },
    { id: 'manage_system', name: 'Configurar Sistema', description: 'Configurações gerais do sistema' },
  ],
  lider: [
    { id: 'view_visitors', name: 'Visualizar Visitantes', description: 'Visualizar dados de visitantes' },
    { id: 'view_decisions', name: 'Visualizar Decisões', description: 'Visualizar decisões e acompanhamentos' },
    { id: 'view_callbacks', name: 'Visualizar Callbacks', description: 'Visualizar status de callbacks' },
    { id: 'manage_team_visits', name: 'Gerenciar Visitas da Equipe', description: 'Gerenciar visitas da equipe' },
    { id: 'manage_own_groups', name: 'Gerenciar GCs Próprios', description: 'Gerenciar GCs sob sua liderança' },
    { id: 'approve_volunteers', name: 'Aprovar Voluntários', description: 'Aprovar novos voluntários' },
    { id: 'view_team_schedule', name: 'Ver Escala da Equipe', description: 'Visualizar escala da equipe' },
  ],
  coleta: [
    { id: 'register_visitors', name: 'Cadastrar Visitantes', description: 'Cadastrar novos visitantes' },
    { id: 'view_registration_confirmation', name: 'Ver Confirmação', description: 'Ver confirmação de cadastro' },
  ],
  callback: [
    { id: 'view_decisions_list', name: 'Ver Lista de Decisões', description: 'Visualizar lista de decisões' },
    { id: 'manage_callback_status', name: 'Gerenciar Status', description: 'Atualizar status de callbacks' },
    { id: 'send_whatsapp', name: 'Enviar WhatsApp', description: 'Enviar mensagens via WhatsApp' },
  ],
  visita: [
    { id: 'view_visits', name: 'Ver Visitas', description: 'Visualizar visitas agendadas' },
    { id: 'manage_visit_status', name: 'Gerenciar Status', description: 'Atualizar status de visitas' },
    { id: 'view_visit_history', name: 'Ver Histórico', description: 'Visualizar histórico de visitas' },
  ],
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[];
}