
import React from 'react';

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={`flex space-x-1.5 ${className || ''}`}>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-slow" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-slow" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-slow" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export default LoadingDots;
