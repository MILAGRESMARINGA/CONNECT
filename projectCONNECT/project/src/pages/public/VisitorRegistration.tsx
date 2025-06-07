import { useState, useEffect } from 'react';
import { Church, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import QRCode from 'react-qr-code';

interface FormData {
  nome: string;
  telefone: string;
  idade: number;
  cidade: string;
  bairro: string;
  primeira_visita: boolean;
  aceitou_jesus: boolean;
  reconciliou: boolean;
  recebeu_brinde: boolean;
  data_culto: string;
}

interface VisitorHistory {
  primeira_visita: boolean;
  aceitou_jesus: boolean;
  recebeu_brinde: boolean;
  data_culto: string;
}

const VisitorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    idade: 0,
    cidade: '',
    bairro: '',
    primeira_visita: true,
    aceitou_jesus: false,
    reconciliou: false,
    recebeu_brinde: false,
    data_culto: new Date().toISOString(),
  });
  const [submitted, setSubmitted] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [visitorHistory, setVisitorHistory] = useState<VisitorHistory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkVisitorHistory = async (telefone: string) => {
    // Mock API call - in real app, this would be a database query
    const mockHistory = {
      primeira_visita: false,
      aceitou_jesus: true,
      recebeu_brinde: true,
      data_culto: '2024-02-15',
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (telefone === '44999999999') { // Mock existing visitor
      setVisitorHistory(mockHistory);
      setError('Este visitante já foi registrado anteriormente e não pode ser cadastrado novamente.');
      return true;
    }

    setVisitorHistory(null);
    setError(null);
    return false;
  };

  const handlePhoneChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const telefone = e.target.value;
    setFormData(prev => ({ ...prev, telefone }));
    
    if (telefone.length >= 11) {
      await checkVisitorHistory(telefone);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const nextStep = () => {
    if (error) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;

    // Generate QR code with visitor data
    const qrData = JSON.stringify({
      id: Math.random().toString(36).substr(2, 9),
      nome: formData.nome,
      primeira_visita: formData.primeira_visita,
      timestamp: new Date().toISOString(),
    });
    setQrCodeValue(qrData);
    setSubmitted(true);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-8">
          <Church size={56} className="mx-auto text-white" />
          <h2 className="mt-4 text-3xl font-bold text-white">
            Bem-vindo à Igreja CIA
          </h2>
          <p className="mt-2 text-white text-opacity-90">
            Ministério CONNECT - Ficha de Visitante
          </p>
        </div>

        {!submitted ? (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-neutral-400'}`}>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">Dados Pessoais</span>
                </div>
                <div className="h-0.5 w-10 bg-neutral-200"></div>
                <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-neutral-400'}`}>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">Decisão</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="p-6">
                  <div className="mb-6">
                    <label htmlFor="nome" className="block text-sm font-medium text-neutral-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="telefone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    {error && (
                      <div className="mt-2 p-2 bg-error-50 text-error-700 text-sm rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p>{error}</p>
                      </div>
                    )}
                    {visitorHistory && !error && (
                      <div className="mt-2 p-2 bg-warning-50 text-warning-700 text-sm rounded-md">
                        <p>Histórico do visitante:</p>
                        <ul className="mt-1 list-disc list-inside">
                          <li>Última visita: {new Date(visitorHistory.data_culto).toLocaleDateString()}</li>
                          <li>{visitorHistory.aceitou_jesus ? 'Já aceitou Jesus' : 'Não aceitou Jesus'}</li>
                          <li>{visitorHistory.recebeu_brinde ? 'Já recebeu brinde' : 'Não recebeu brinde'}</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="idade" className="block text-sm font-medium text-neutral-700 mb-1">
                      Idade *
                    </label>
                    <input
                      type="number"
                      id="idade"
                      name="idade"
                      required
                      min="0"
                      max="120"
                      value={formData.idade}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="cidade" className="block text-sm font-medium text-neutral-700 mb-1">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        required
                        value={formData.cidade}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="bairro" className="block text-sm font-medium text-neutral-700 mb-1">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        required
                        value={formData.bairro}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!!error}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próximo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="primeira_visita"
                          name="primeira_visita"
                          type="checkbox"
                          checked={formData.primeira_visita}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="primeira_visita" className="font-medium text-neutral-700">
                          Esta é a primeira visita
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="aceitou_jesus"
                          name="aceitou_jesus"
                          type="checkbox"
                          checked={formData.aceitou_jesus}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="aceitou_jesus" className="font-medium text-neutral-700">
                          Aceitou Jesus hoje
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="reconciliou"
                          name="reconciliou"
                          type="checkbox"
                          checked={formData.reconciliou}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="reconciliou" className="font-medium text-neutral-700">
                          Reconciliou com Jesus hoje
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="recebeu_brinde"
                          name="recebeu_brinde"
                          type="checkbox"
                          checked={formData.recebeu_brinde}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="recebeu_brinde" className="font-medium text-neutral-700">
                          Recebeu brinde
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 text-center">
            <div className="rounded-full h-16 w-16 flex items-center justify-center bg-success-100 mx-auto">
              <CheckCircle size={32} className="text-success-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
              Registro Concluído!
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {formData.primeira_visita
                ? 'Obrigado pelo seu registro! Use o QR code abaixo para retirar seu brinde na entrada do templo.'
                : 'Obrigado pelo seu registro! Que bom ter você novamente conosco.'}
            </p>

            {formData.primeira_visita && (
              <div className="mt-6 p-4 bg-white border-2 border-neutral-200 rounded-lg inline-block">
                <QRCode
                  value={qrCodeValue}
                  size={180}
                  level="H"
                />
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    nome: '',
                    telefone: '',
                    idade: 0,
                    cidade: '',
                    bairro: '',
                    primeira_visita: true,
                    aceitou_jesus: false,
                    reconciliou: false,
                    recebeu_brinde: false,
                    data_culto: new Date().toISOString(),
                  });
                  setError(null);
                  setVisitorHistory(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Registrar outro visitante
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorRegistration;