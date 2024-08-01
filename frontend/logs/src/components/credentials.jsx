import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/credentials`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <h3>URL: {log.url}</h3>
            <p>Keys: {log.keys.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogViewer;
