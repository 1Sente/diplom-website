import React from 'react';

export default function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Иконка */}
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(99,102,241,0.4)',
        flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Название */}
      <span style={{
        fontSize: '20px',
        fontWeight: '900',
        letterSpacing: '-0.05em',
        background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        NEXUS
      </span>
      <span style={{
        fontSize: '11px',
        color: '#71717a',
        fontWeight: '500',
        letterSpacing: '0.05em',
        marginLeft: '-4px',
        alignSelf: 'flex-end',
        paddingBottom: '2px',
      }}>
        ADMIN
      </span>
    </div>
  );
}
