
import React, { useState, useEffect, useCallback } from 'react';
import type { TokenResponse, GoogleTokenClient } from './types';
import { GOOGLE_CLIENT_ID, OAUTH_SCOPES } from './constants';
import AuthorizationCard from './components/AuthorizationCard';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isClientReady, setIsClientReady] = useState<boolean>(false);
  const [tokenClient, setTokenClient] = useState<GoogleTokenClient | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleAuthCallback = useCallback((tokenResponse: TokenResponse) => {
    if (tokenResponse.error) {
      console.error('Authorization error:', tokenResponse.error_description);
      setIsAuthorized(false);
      setAccessToken(null);
    } else if (tokenResponse.access_token) {
      console.log('Authorization successful!');
      setAccessToken(tokenResponse.access_token);
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    // This effect runs once to initialize the Google Identity Services client.
    if (window.google?.accounts?.oauth2) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: OAUTH_SCOPES.join(' '),
        callback: handleAuthCallback,
      });
      setTokenClient(client);
      setIsClientReady(true);
    } else {
        // Poll for the google object to be ready
        const intervalId = setInterval(() => {
            if (window.google?.accounts?.oauth2) {
                const client = window.google.accounts.oauth2.initTokenClient({
                    client_id: 270957121219-1ndrd0l18vsil76ju7q1ubbfoodi72qk.apps.googleusercontent.com,
                    scope: OAUTH_SCOPES.join(' '),
                    callback: handleAuthCallback,
                });
                setTokenClient(client);
                setIsClientReady(true);
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }
  }, [handleAuthCallback]);

  const handleAuthorize = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    }
  };

  const handleDisconnect = () => {
    if (accessToken) {
      window.google.accounts.oauth2.revoke(accessToken, () => {
        console.log('Token revoked.');
        setIsAuthorized(false);
        setAccessToken(null);
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
        <main className="w-full max-w-lg">
            <AuthorizationCard 
                isAuthorized={isAuthorized} 
                isClientReady={isClientReady}
                onAuthorize={handleAuthorize} 
                onDisconnect={handleDisconnect} 
            />
        </main>
    </div>
  );
};

export default App;
