import { FC } from 'react';
import './LogoConnect.css';

interface LogoConnectProps {
  className?: string;
}

const LogoConnect: FC<LogoConnectProps> = ({ className = '' }) => {
  return (
    <div className={`logo-connect ${className}`}>
      <div className="logo-connect__container">
        <div className="logo-connect__text">CONNECT</div>
        <div className="logo-connect__curve"></div>
        <div className="logo-connect__slogan">Conectando pessoas a Cristo</div>
      </div>
    </div>
  );
};

export default LogoConnect;