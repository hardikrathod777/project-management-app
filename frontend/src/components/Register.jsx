import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/auth/register", { username, email, password });
            navigate('/login');
        } catch (error) {
            console.error("Error registering");
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 sign-up-bg">
            <div className="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md shadow-box">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Sign Up</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition duration-150"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-white">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
