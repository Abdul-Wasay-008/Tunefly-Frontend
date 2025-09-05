import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { adminLogin } from "./api/adminLogin";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // for redirect after login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await adminLogin(email, password);
            localStorage.setItem("tf_admin_token", res.token);
            localStorage.setItem("tf_admin_user", JSON.stringify(res.user));
            navigate("/admin/dashboard");
        } catch (err: any) {
            console.error("ADMIN LOGIN ERROR:", err?.response ?? err);
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : "") ||
                err?.message ||
                "Login failed";
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-10"
                style={{ backgroundImage: "url('/background/bg.png')" }}
            ></div>

            {/* Main content */}
            <div className="relative z-20 w-[90%] xl:w-[70%] lg:w-[80%] max-w-6xl flex flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-between">
                {/* Left Section */}
                <div className="w-[10rem] lg:w-[12rem] lg:flex lg:items-center lg:justify-center">
                    <div className="text-center">
                        <img
                            src="/assets/logo.svg"
                            alt="Tunefly Logo"
                            className="w-24 lg:w-36 md:w-32 mx-auto mb-4"
                        />
                        <h1 className="text-3xl text-white font-semibold hidden lg:block">
                            Tunefly
                        </h1>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden lg:block w-[1px] h-[40rem] xl:h-[40rem] 2xl:h-[45rem] bg-gray-500 mx-6" />

                {/* Right Section */}
                <div className="w-full lg:w-1/2 md:w-full flex items-center justify-center">
                    <div className="w-[80%] max-w-md">
                        <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-center text-white mb-2">
                            Login
                        </h2>
                        <p className="text-xl 2xl:text-2xl text-center text-white mb-12">
                            to your admin panel
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Field */}
                            <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 xl:py-3 lg:py-2 md:py-3 bg-[#1F1F21] text-white xl:text-sm md:text-sm text-sm placeholder-gray-300 rounded-md focus:outline-none"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                <div className="flex items-center bg-[#1F1F21] rounded-md px-4 py-4 xl:py-3 lg:py-2 md:py-3">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex-1 bg-transparent text-white text-sm xl:text-sm md:text-sm placeholder-gray-300 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="ml-2 text-white"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 xl:py-1 lg:py-1 md:py-2 mt-6 font-semibold text-white rounded-md bg-gradient-to-r from-pink-500 to-teal-400 hover:opacity-90"
                            >
                                {loading ? "Logging in..." : "LOGIN"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
