import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartPie, FaProjectDiagram, FaPlusCircle, FaDollarSign } from 'react-icons/fa'; // Importing icons

function AdminDashboard() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/projects');
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    setData([]);
                    console.error("Data is not in array format.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex h-screen flex-col bg-gradient-to-b from-gray-800 to-gray-600">
            <header className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md border-b border-gray-700">
                <h1 className="flex items-center font-bold text-2xl">
                    <span className="text-blue-600">Project Management</span>
                </h1>

                <button onClick={handleLogout} className="text-purple-500 text-lg font-semibold hover:text-purple-600 transition duration-200">
                    Sign Out
                </button>
            </header>

            <div className="flex flex-1">
                <aside className="w-1/6 bg-black text-gray-300 p-6 border-r border-gray-600">
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="flex items-center text-lg font-medium hover:text-purple-500 transition duration-150">
                                    <FaChartPie className="mr-2" />
                                    Overview
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="flex items-center text-lg font-medium hover:text-purple-500 transition duration-150">
                                    <FaProjectDiagram className="mr-2" />
                                    Manage Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/addproject" className="flex items-center text-lg font-medium hover:text-purple-500 transition duration-150">
                                    <FaPlusCircle className="mr-2" />
                                    Create New Project
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-8 bg-gray-100 overflow-y-auto sign-up-bg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
