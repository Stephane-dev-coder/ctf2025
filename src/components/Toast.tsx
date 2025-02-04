import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-4 right-4 p-4 rounded-lg shadow-lg
        transition-all duration-300 ease-in-out
        transform translate-y-0 scale-100
        font-mono text-sm
        border-2 
        ${type === 'success' 
          ? 'bg-black/90 text-green-500 border-green-500' 
          : 'bg-black/90 text-red-500 border-red-500'
        }
        backdrop-blur-sm
        hover:scale-105
        cursor-pointer
      `}
      onClick={onClose}
    >
      <div className="flex items-center gap-2">
        <span className={`text-xl ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {type === 'success' ? '✓' : '✗'}
        </span>
        {message}
      </div>
    </div>
  );
}; 