import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScreenShotViewer = () => {
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        fetchLogs();
      }, []);
    
      const fetchLogs = async () => {
        try {
          const response = await axios.get('http://localhost:5000/screenshots');
          const modifiedScreenshots = response.data.map(screenshot => ({
            ...screenshot,
            url: screenshot.url.replace('/upload/', '/upload/c_thumb,w_500,h_300,g_face/')
          }));
          setScreenshots(modifiedScreenshots);
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      };
  
    return (
      <div className="App">
        <h1>Screenshot Logs</h1>
        <div>
          {screenshots.map((screenshot, index) => (
            <div key={index} className="screenshot-item">
              <img src={screenshot.url} alt={`Screenshot ${index + 1}`} />
              <p>Timestamp: {new Date(screenshot.time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ScreenShotViewer;
