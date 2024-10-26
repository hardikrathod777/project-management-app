import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to load projects.");
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        if (savedProjects.length) {
            setProjects((prevProjects) =>
                prevProjects.map((proj) => {
                    const savedProj = savedProjects.find((p) => p._id === proj._id);
                    return savedProj ? savedProj : proj;
                })
            );
        }
    }, []);

    const handleEdit = (id) => {
        navigate(`edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/projects/${id}`);
            setProjects(projects.filter((project) => project._id !== id));
        } catch (error) {
            console.error("Error deleting project");
        }
    };

    const toggleText = async (projectId) => {
        try {
            const response = await api.patch(`/api/projects/${projectId}/toggleStatus`);
            
            // Update the local state with the new project status
            setProjects((prevProjects) =>
                prevProjects.map((proj) =>
                    proj._id === projectId ? { ...proj, status: response.data.status } : proj
                )
            );
    
            // Update localStorage with the new projects data
            const updatedProjects = projects.map((proj) =>
                proj._id === projectId ? { ...proj, status: response.data.status } : proj
            );
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
        } catch (error) {
            console.error("Error updating project status:", error);
        }
    };
    

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-900 text-white ds-box">
            <h2 className="text-4xl font-bold text-center mb-12">
                Our Projects
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="flex flex-wrap justify-center gap-10">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div
                            key={project._id}
                            className="max-w-sm w-full rounded-lg shadow-lg bg-gray-800 transform transition-transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="p-6 space-y-4">
                                <h3 className="text-3xl font-semibold">
                                    {project.name}
                                </h3>
                                <p className="leading-relaxed break-words">
                                    {project.description}
                                </p>
                                <p className="text-2xl font-semibold text-green-400">
                                    ₹{project.budget.toLocaleString()}
                                </p>

                                <div className="mt-6 flex justify-between space-x-3">
                                    <button
                                        onClick={() => handleEdit(project._id)}
                                        className="flex-1 border border-yellow-600 text-yellow-600 rounded-md font-medium hover:bg-yellow-600 hover:text-white transition duration-200 py-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 border border-red-600 text-red-600 rounded-md font-medium hover:bg-red-600 hover:text-white transition duration-200 py-2"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => toggleText(project._id)}
                                        className={`flex-1 rounded-md font-medium transition duration-200 py-2 ${project.status === 'paid' ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-red-600 text-white hover:bg-red-500'}`}
                                    >
                                        {project.status === 'paid' ? 'Paid' : 'Unpaid'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No projects available.</p>
                )}
            </div>
        </div>
    );
}

export default Projects;
