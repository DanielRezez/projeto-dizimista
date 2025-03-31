import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getNotificationStyles = () => {
    const baseStyles = "fixed top-4 right-4 max-w-md px-4 py-3 rounded z-50 shadow-lg transition-all duration-300 ease-in-out";
    
    switch (type) {
      case 'error':
        return `${baseStyles} bg-red-100 border border-red-400 text-red-700`;
      case 'success':
        return `${baseStyles} bg-green-100 border border-green-400 text-green-700`;
      default:
        return `${baseStyles} bg-blue-100 border border-blue-400 text-blue-700`;
    }
  };

  return (
    <div className={getNotificationStyles()} role="alert">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Notification;
