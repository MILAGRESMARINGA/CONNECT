import { Outlet } from 'react-router-dom';
import LogoConnect from '../components/LogoConnect';

const AuthLayout = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center bg-[#B25929] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="w-full px-4 relative z-10">
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="relative">
            <div className="text-sm font-light tracking-wider text-white absolute -top-6 left-1/2 -translate-x-1/2">CIA</div>
            <LogoConnect />
          </div>
        </div>
      </div>

      <div className="w-full px-4 relative z-10">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm py-6 px-4 shadow-2xl md:rounded-lg md:py-8 md:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;