import React from 'react';

const RotateDeviceModal = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#0a0a0c',
      color: '#ffffff',
      zIndex: 99999,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px', textAlign: 'center',
    }}>
      <style>{`
        @keyframes rotatePhone {
          0%, 10% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(-90deg); }
          90%, 100% { transform: rotate(0deg); }
        }
        .animated-phone {
          animation: rotatePhone 2.5s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div style={{ width: '80px', height: '80px', marginBottom: '24px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animated-phone">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#334155" />
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#fff" style={{ clipPath: 'inset(0 0 0 0)' }} />
          <line x1="10" y1="4" x2="14" y2="4" strokeWidth="1" />
          <line x1="10" y1="20" x2="14" y2="20" strokeWidth="1" />
        </svg>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.025em', margin: '0 0 8px 0' }}>
        Modo Cardboard Activo
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '280px', margin: '0 0 32px 0', lineHeight: '1.5' }}>
        Por favor, gira tu dispositivo de forma horizontal para iniciar la inmersión VR.
      </p>

      <button 
        onClick={() => {
          const scene = document.getElementById("MainScene");
          if (scene) scene.exitVR();
        }}
        style={{
          padding: '12px 24px',
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          color: '#f8fafc',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      >
        Salir del modo VR
      </button>
    </div>
  );
};

export default RotateDeviceModal;