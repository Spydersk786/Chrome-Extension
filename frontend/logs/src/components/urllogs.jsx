import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UrlLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/urlvisited');
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
      <h2>URLs Visited</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>URL:</strong> {log.url} <br />
            <strong>Visited Times:</strong> {log.time.map((timestamp) => new Date(timestamp).toLocaleString()).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlLogs;
