import React, { useState } from 'react';
import CredentialLogs from './components/credentials';
import UrlVisitedLogs from './components/urllogs';
import ScreenshotLogs from './components/screenshots';

const App = () => {
  const [view, setView] = useState('none');

  const handleShowCredentials = () => setView('credentials');
  const handleShowUrls = () => setView('urls');
  const handleShowScreenShots = () => setView('screenshots');

  return (
    <div>
      <h1>Log Viewer</h1>
      <button onClick={handleShowCredentials}>Show Credential Logs</button>
      <button onClick={handleShowUrls}>Show URL Logs</button>
      <button onClick={handleShowScreenShots}>Show Screenshots Logs</button>

      {view === 'credentials' && <CredentialLogs/>}
      {view === 'urls' && <UrlVisitedLogs/>}
      {view === 'screenshots' && <ScreenshotLogs/>}
    </div>
  );
};

export default App;
