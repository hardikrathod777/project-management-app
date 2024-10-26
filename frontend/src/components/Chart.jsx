import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
} from 'recharts';
import api from '../api';

function Chart() {
    const [chartData, setChartData] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const projectsResponse = await api.get('/api/projects');
                const projectCount = Array.isArray(projectsResponse.data) ? projectsResponse.data.length : 0;
                setProjectCount(projectCount);

                const newChartData = [
                    { name: "Projects", count: projectCount },
                ];
                setChartData(newChartData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
                setError("Failed to load chart data.");
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="w-full p-6 rounded-lg bg-gray-900 text-white shadow-lg ds-box">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Dashboard Overview</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {!error && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="flex flex-col items-center justify-center bg-gray-800 p-6 shadow-lg rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-300">Total Projects</h3>
                            <p className="text-4xl font-bold text-blue-500">{projectCount}</p>
                        </div>
                    </div>

                    <div className="w-full h-96 bg-gray-800 shadow-xl rounded-lg p-6 flex items-center justify-center">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={chartData} 
                                margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#ccc' }} />
                                <YAxis type="number" tick={{ fontSize: 14, fill: '#ccc' }} />
                                <Tooltip wrapperStyle={{ fontSize: '0.875rem' }} contentStyle={{ backgroundColor: '#333', borderColor: '#666' }} />
                                <Legend />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={30} animationDuration={1500}>
                                    <Cell fill="url(#colorProjects)" />
                                </Bar>
                                <defs>
                                    <linearGradient id="colorProjects" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#1E90FF" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                        
                        ) : (
                            <p className="text-center text-gray-500">Loading chart data...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chart;
