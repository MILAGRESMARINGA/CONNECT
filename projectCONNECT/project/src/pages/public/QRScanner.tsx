import { useState, useEffect } from 'react';
import { QrCode, ChevronLeft, Gift, AlertCircle } from 'lucide-react';

// In a real app, we would use a proper QR code scanner library
// This is just a mock implementation to demonstrate the UI
const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | { 
    valid: boolean; 
    firstTime: boolean;
    name: string;
  }>(null);
  
  const startScanning = () => {
    setScanning(true);
    
    // Mock scanning - in a real app we would use the device camera
    setTimeout(() => {
      // Simulate a successful scan
      const result = Math.random() > 0.3;
      if (result) {
        setScanResult({
          valid: true,
          firstTime: Math.random() > 0.3,
          name: "Ana Beatriz Silva"
        });
      } else {
        setScanResult({
          valid: false,
          firstTime: false,
          name: ""
        });
      }
      setScanning(false);
    }, 2000);
  };
  
  const resetScan = () => {
    setScanResult(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center">
              <QrCode className="h-6 w-6 text-primary-600" />
              <h2 className="ml-2 text-lg font-medium text-neutral-900">
                Verificação de QR Code
              </h2>
            </div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="p-1 rounded-full hover:bg-neutral-100"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-500" />
            </button>
          </div>
          
          <div className="p-6">
            {!scanResult ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-48 h-48 mx-auto border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center bg-neutral-50">
                    {scanning ? (
                      <div className="text-center">
                        <div className="animate-pulse flex items-center justify-center">
                          <QrCode className="h-8 w-8 text-primary-500" />
                        </div>
                        <p className="mt-2 text-sm text-neutral-600">Escaneando...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <QrCode className="h-8 w-8 mx-auto text-neutral-400" />
                        <p className="mt-2 text-sm text-neutral-500">
                          Clique no botão abaixo para iniciar o scanner
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={startScanning}
                  disabled={scanning}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {scanning ? 'Escaneando...' : 'Iniciar Scanner'}
                </button>
              </>
            ) : (
              <div className="text-center">
                {scanResult.valid ? (
                  <>
                    <div className={`rounded-full h-16 w-16 flex items-center justify-center mx-auto ${
                      scanResult.firstTime ? 'bg-success-100' : 'bg-warning-100'
                    }`}>
                      {scanResult.firstTime ? (
                        <Gift size={32} className="text-success-600" />
                      ) : (
                        <AlertCircle size={32} className="text-warning-600" />
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-neutral-900">
                      {scanResult.firstTime ? 'Brinde Liberado!' : 'Visita Recorrente'}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      {scanResult.firstTime 
                        ? `${scanResult.name} está na primeira visita e pode receber o brinde.` 
                        : `${scanResult.name} já esteve conosco anteriormente.`}
                    </p>
                    
                    {scanResult.firstTime ? (
                      <div className="mt-6 p-3 bg-success-50 text-success-800 text-sm rounded-md">
                        Por favor, entregue o brinde de boas-vindas.
                      </div>
                    ) : (
                      <div className="mt-6 p-3 bg-warning-50 text-warning-800 text-sm rounded-md">
                        Esta pessoa já recebeu um brinde anteriormente.
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-error-100 mx-auto">
                      <AlertCircle size={32} className="text-error-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-neutral-900">
                      QR Code Inválido
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      Este QR code não é válido ou não está registrado no sistema.
                    </p>
                    
                    <div className="mt-6 p-3 bg-error-50 text-error-800 text-sm rounded-md">
                      Por favor, peça para o visitante fazer o registro.
                    </div>
                  </>
                )}
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={resetScan}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Escanear outro código
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;