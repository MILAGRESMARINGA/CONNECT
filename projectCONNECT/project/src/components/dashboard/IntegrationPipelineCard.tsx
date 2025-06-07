import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface PipelineStage {
  id: string;
  name: string;
  count: number;
  complete: boolean;
}

const IntegrationPipelineCard = () => {
  // Mock data for pipeline stages
  const [stages] = useState<PipelineStage[]>([
    { id: 'register', name: 'Cadastro', count: 248, complete: true },
    { id: 'decision', name: 'Decisão', count: 176, complete: true },
    { id: 'callback', name: 'Callback', count: 134, complete: true },
    { id: 'visit', name: 'Visita', count: 98, complete: false },
    { id: 'smallgroup', name: 'Grupo', count: 65, complete: false },
    { id: 'baptism', name: 'Batismo', count: 42, complete: false },
    { id: 'integration', name: 'Integrado', count: 36, complete: false },
  ]);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5 border-b border-neutral-200">
        <h2 className="text-lg font-medium text-neutral-800">Pipeline de Integração</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Acompanhamento dos visitantes em cada etapa do processo
        </p>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex flex-col items-center min-w-[80px]">
              <div className="relative">
                {stage.complete ? (
                  <CheckCircle className="h-10 w-10 text-success-500" />
                ) : (
                  <Circle className="h-10 w-10 text-neutral-300" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {stage.count}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-center font-medium text-neutral-700">
                {stage.name}
              </p>
              
              {/* Arrow between stages */}
              {index < stages.length - 1 && (
                <div className="absolute right-[-22px] top-[18px]">
                  <ArrowRight className="h-5 w-5 text-neutral-400" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-primary-700">Taxa de Conversão</h3>
              <span className="text-primary-800 font-bold">71%</span>
            </div>
            <p className="mt-1 text-xs text-primary-600">
              Visitantes que fizeram decisão
            </p>
          </div>
          
          <div className="bg-success-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-success-700">Taxa de Integração</h3>
              <span className="text-success-800 font-bold">14.5%</span>
            </div>
            <p className="mt-1 text-xs text-success-600">
              Visitantes completamente integrados
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-50 px-5 py-3">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Ver relatório completo
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPipelineCard;