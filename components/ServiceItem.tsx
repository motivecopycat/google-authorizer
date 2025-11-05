
import React from 'react';

type ServiceType = 'sheets' | 'drive' | 'apps-script';

interface ServiceItemProps {
  name: string;
  type: ServiceType;
  isAuthorized: boolean;
}

const iconMap: Record<ServiceType, React.ReactNode> = {
  sheets: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13V3.5M10,14H12V12H14V14H16V16H14V18H12V16H10V14M8,18V12H9V18H8Z" />
    </svg>
  ),
  drive: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.71,3.5L1.5,14.03L4.53,19.5L10.75,9L7.71,3.5M12.03,8.5L9,13.5L12,18.5L18.25,8.5H12.03M17.16,19.5L22.5,10.03L16.28,0L13.25,5.5L17.16,19.5Z" fill="#4285F4" />
      <path d="M4.53,19.5L1.5,14.03L7.71,3.5L10.75,9L4.53,19.5Z" fill="#0F9D58" />
      <path d="M17.16,19.5L10.75,9L12.03,8.5H18.25L22.5,10.03L17.16,19.5Z" fill="#F4B400" />
      <path d="M12,18.5L9,13.5L4.53,19.5H17.16L12,18.5Z" fill="#DB4437"/>
    </svg>
  ),
  'apps-script': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.4,3L4,5.92V18.08L9.4,21L14.8,18.08V15.5L11,17.42V14.17L14.8,12.08V5.92L9.4,3M11,12.17L13,13.25V14.42L11,15.5V12.17M11,7.58L13,8.67V11L11,9.92V7.58M20,13.08L16.2,15.5V5.92L20,8.33V13.08Z" />
    </svg>
  ),
};

const StatusIndicator: React.FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => {
  return (
    <div className={`flex items-center text-sm font-medium ${isAuthorized ? 'text-green-600' : 'text-yellow-600'}`}>
      {isAuthorized ? (
        <>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Authorized
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Pending
        </>
      )}
    </div>
  );
};

const ServiceItem: React.FC<ServiceItemProps> = ({ name, type, isAuthorized }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
      <div className="flex items-center">
        <div className="mr-3 p-1 rounded-full bg-gray-200">{iconMap[type]}</div>
        <span className="font-medium text-gray-700">{name}</span>
      </div>
      <StatusIndicator isAuthorized={isAuthorized} />
    </div>
  );
};

export default ServiceItem;
