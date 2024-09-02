import React, { useState } from 'react';

interface ICustomAlertProps {
  message: string | undefined;
  type: string;
  className: string;
  children?: React.ReactNode;
}

export const CustomAlert: React.FC<ICustomAlertProps> = ({ message, type, className }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={`${className}-${type} ${show ? 'show' : ''}`} role="alert">
      {message}
      <button type="button" className="close" aria-label="Close" onClick={() => setShow(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

