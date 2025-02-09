import React from 'react';

interface ErrorMessageProps {
  error: string | null;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className = "" }) => {
  if (!error) return null;
  
  return (
    <div className={`text-red-500 text-center p-2 ${className}`}>
      {error}
    </div>
  );
}; 