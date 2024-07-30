import React, { useState } from 'react';
import CredentialLogs from './components/credentials';
import UrlVisitedLogs from './components/urllogs';

const App = () => {
  const [view, setView] = useState('none');

  const handleShowCredentials = () => setView('credentials');
  const handleShowUrls = () => setView('urls');

  return (
    <div>
      <h1>Log Viewer</h1>
      <button onClick={handleShowCredentials}>Show Credential Logs</button>
      <button onClick={handleShowUrls}>Show URL Logs</button>

      {view === 'credentials' && <CredentialLogs/>}
      {view === 'urls' && <UrlVisitedLogs/>}
    </div>
  );
};

export default App;
