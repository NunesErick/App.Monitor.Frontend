import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, Cell as PieCell
} from 'recharts';

dayjs.extend(duration);

const Graphs = ({ id, nome, rangeHour }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/Monitor/getlogappbyid/${id}?rangeHour=${rangeHour}`);
        const formatted = res.data.map(item => ({
          ...item,
          data_medicao_formatada: dayjs(item.data_medicao).format('HH:mm'),
        }));

        setData(formatted);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && rangeHour !== undefined) {
      setLoading(true);
      fetchData();
      intervalId = setInterval(fetchData, 60000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [id, rangeHour]);
  
  const countStatus = (data) => {
    const onlineCount = data.filter(item => item.status === 1).length;
    const offlineCount = data.filter(item => item.status === 0).length;
    return { onlineCount, offlineCount };
  };

  const { onlineCount, offlineCount } = countStatus(data);
  const onlinePercentage = (onlineCount / (onlineCount + offlineCount)) * 100;

  return (
    <div style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <h1>{nome}</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          gap: '1rem',
          padding: '1rem',
          height: '100%'
        }}>
          <div style={{ width: '48%', height: '300px', alignContent: 'center' }}>
            <ResponsiveContainer width="100%" height="50%" >	
              <BarChart data={data}>
                <XAxis dataKey="data_medicao_formatada" />
                <Tooltip
                  labelFormatter={(label) => `Horário: ${label}`}
                  formatter={(value) => (value === 1 ? 'Online' : 'Offline')}
                />
                <Bar dataKey="status">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.status === 1 ? '#4caf50' : '#f44336'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: '48%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={[
          { name: 'Online', value: onlineCount, fill: '#4caf50' },
          { name: 'Offline', value: offlineCount, fill: '#f44336' },
        ]}
        innerRadius="60%"
        outerRadius="80%"
        paddingAngle={5}
        dataKey="value"
      >
        <Cell key="online" fill="#4caf50" />
        <Cell key="offline" fill="#f44336" />
      </Pie>
      <text
        x="50%" 
        y="55%" 
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#4caf50"
        fontSize="18"
        fontWeight="bold"
      >
        {`${Math.round(onlinePercentage)}%`}
      </text>
      <Legend verticalAlign="top" height={30} />
    </PieChart>
</ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Graphs;
