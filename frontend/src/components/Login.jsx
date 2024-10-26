import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/auth/login", { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate('/');
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 sign-up-bg">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md shadow-md shadow-box">
                <h2 className="text-2xl font-medium text-white text-center mb-4">Sign In</h2>

                {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm text-white">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-500 text-white text-sm font-medium rounded-md hover:bg-purple-600 transition duration-150"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-white">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
