
import React from 'react';
import ServiceItem from './ServiceItem';

interface AuthorizationCardProps {
  isAuthorized: boolean;
  isClientReady: boolean;
  onAuthorize: () => void;
  onDisconnect: () => void;
}

const services = [
  { name: 'Google Sheets', type: 'sheets' as const },
  { name: 'Google Drive', type: 'drive' as const },
  { name: 'Apps Script', type: 'apps-script' as const },
];

const AuthorizationCard: React.FC<AuthorizationCardProps> = ({ 
  isAuthorized, 
  isClientReady,
  onAuthorize, 
  onDisconnect 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 ease-in-out transform hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {isAuthorized ? 'Access Granted' : 'Authorize Google Services'}
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          {isAuthorized
            ? 'You have successfully granted access. You can now disconnect at any time.'
            : 'To continue, this app requires permission to access the following Google services on your behalf.'}
        </p>

        <div className="w-full space-y-3 mb-8">
          {services.map((service) => (
            <ServiceItem 
              key={service.name} 
              name={service.name} 
              type={service.type} 
              isAuthorized={isAuthorized} 
            />
          ))}
        </div>

        {isAuthorized ? (
          <button
            onClick={onDisconnect}
            className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-200"
          >
            Disconnect Access
          </button>
        ) : (
          <button
            onClick={onAuthorize}
            disabled={!isClientReady}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isClientReady ? 'Authorize with Google' : 'Initializing...'}
          </button>
        )}
         {!isAuthorized && (
            <p className="text-xs text-gray-500 mt-4">
                You will be prompted to sign in and grant permissions in a Google pop-up window.
            </p>
        )}
      </div>
    </div>
  );
};

export default AuthorizationCard;
