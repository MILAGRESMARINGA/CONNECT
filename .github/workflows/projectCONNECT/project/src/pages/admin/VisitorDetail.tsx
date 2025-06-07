import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash, Mail, Phone, MapPin, Calendar, User, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const VisitorDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [visitor, setVisitor] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching visitor data
    // In a real application, you would fetch from your API
    setTimeout(() => {
      setVisitor({
        id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, Anytown, USA',
        firstVisit: '2023-01-15',
        lastVisit: '2023-06-22',
        totalVisits: 8,
        smallGroup: 'Young Adults',
        notes: 'Interested in volunteering with youth ministry.',
        status: 'active',
        familyMembers: [
          { id: '102', name: 'Jane Doe', relationship: 'Spouse' },
          { id: '103', name: 'Jimmy Doe', relationship: 'Child' }
        ],
        visitHistory: [
          { date: '2023-06-22', type: 'Sunday Service', checkedInBy: 'Mark Wilson' },
          { date: '2023-05-14', type: 'Sunday Service', checkedInBy: 'Sarah Johnson' },
          { date: '2023-04-02', type: 'Easter Service', checkedInBy: 'Mark Wilson' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!visitor) {
    return (
      <div className="p-8">
        <Link to="/visitors" className="flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Visitantes
        </Link>
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded">
          Visitante não encontrado. O visitante solicitado pode ter sido removido ou você não tem permissão para visualizá-lo.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/visitors" className="flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Visitantes
        </Link>
        <div className="flex space-x-2">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-700 transition-colors">
            <Edit className="h-4 w-4 mr-2" /> Editar
          </button>
          <button className="bg-error-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-error-700 transition-colors">
            <Trash className="h-4 w-4 mr-2" /> Excluir
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-800">
            {visitor.firstName} {visitor.lastName}
          </h2>
          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
            visitor.status === 'active' ? 'bg-success-100 text-success-800' : 
            visitor.status === 'inactive' ? 'bg-neutral-100 text-neutral-800' : 
            'bg-warning-100 text-warning-800'
          }`}>
            {visitor.status === 'active' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
        
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-4">Informações de Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="text-neutral-700">{visitor.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-500">Telefone</p>
                  <p className="text-neutral-700">{visitor.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-500">Endereço</p>
                  <p className="text-neutral-700">{visitor.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-4">Informações de Visita</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-500">Primeira Visita</p>
                  <p className="text-neutral-700">{visitor.firstVisit}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-500">Última Visita</p>
                  <p className="text-neutral-700">{visitor.lastVisit}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-500">Total de Visitas</p>
                  <p className="text-neutral-700">{visitor.totalVisits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800">Membros da Família</h3>
          </div>
          <div className="p-6">
            {visitor.familyMembers.length > 0 ? (
              <ul className="divide-y divide-neutral-200">
                {visitor.familyMembers.map((member: any) => (
                  <li key={member.id} className="py-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-neutral-500 mr-3" />
                      <div>
                        <p className="font-medium text-neutral-800">{member.name}</p>
                        <p className="text-sm text-neutral-500">{member.relationship}</p>
                      </div>
                    </div>
                    <Link 
                      to={`/visitors/${member.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Ver
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-500">Nenhum membro da família registrado.</p>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800">Grupo</h3>
          </div>
          <div className="p-6">
            {visitor.smallGroup ? (
              <div className="flex items-start">
                <Users className="h-5 w-5 text-neutral-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-800">{visitor.smallGroup}</p>
                  <Link 
                    to="/small-groups"
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Ver detalhes do grupo
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-neutral-500">Não está em nenhum grupo.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800">Histórico de Visitas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Registrado por
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {visitor.visitHistory.map((visit: any, index: number) => (
                <tr key={index} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {visit.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {visit.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {visit.checkedInBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800">Observações</h3>
        </div>
        <div className="p-6">
          {visitor.notes ? (
            <p className="text-neutral-700">{visitor.notes}</p>
          ) : (
            <p className="text-neutral-500">Nenhuma observação disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorDetail;