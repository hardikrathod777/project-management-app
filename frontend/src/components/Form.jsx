import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function Form() {
    const [formData, setFormData] = useState({ name: "", description: "", budget: "" });
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (id) {
            const fetchProjects = async () => {
                try {
                    const response = await api.get(`/api/projects/${id}`);
                    setFormData(response.data);
                    setIsEditMode(true);
                } catch (error) {
                    console.error("Error fetching project data:", error);
                }
            };
            fetchProjects();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/api/projects/${id}`, formData);

            } else {
                await api.post("/api/projects", formData);

            }
            navigate("/projects");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-lg ds-box">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
                {isEditMode ? "Edit Project" : "Add Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Project Name"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-300 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Project Description"
                        rows="4"
                    />
                </div>

                <div>
                    <label htmlFor="budget" className="block text-gray-300 font-medium mb-2">
                        Budget
                    </label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Budget Amount"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-200"
                >
                    {isEditMode ? "Update Project" : "Add Project"}
                </button>
            </form>
        </div>
    );
}

export default Form;
