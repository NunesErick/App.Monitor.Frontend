import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Graphs from './components/graphs/Graphs.jsx';

dayjs.extend(duration);

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get("/api/Monitor/getapps");
        setApps(res.data);
      } catch (error) {
        console.error("Erro ao buscar aplicações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="app">
      <h1 style={{ textAlign: 'center' }}>Monitoramento de Aplicações</h1>
      <div style={{}} >
      {loading ? (
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '1rem',
          padding: '1rem'
        }}>
          {apps.map(app => (
            <div key={app.id} style={{
              flex: '1 1 33%',
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '8px',
            }}>
              <Graphs id={app.id} nome={app.nome} rangeHour={2} />
            </div>
          ))}
        </div>
        
      )}
      </div>
    </div>
  );  
};

export default App;
