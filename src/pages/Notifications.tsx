import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const NoNotifications = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#1f1f21] text-white flex md:items-center justify-center">
            {/* ======= Mobile Layout ======= */}
            <div className="w-full flex flex-col md:hidden">
                {/* Top Nav */}
                <div className="flex items-center px-4 pt-8">
                    <ArrowLeftCircleIcon
                        className="h-8 w-8 text-gray-400 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="ml-4 text-2xl font-semibold">Notifications</h1>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                    <p className="text-2xl font-medium mb-4">No Notifications Yet</p>

                    <img
                        src="/Illustration/Notifications.svg"
                        alt="Notifications Icon"
                        className="h-64 w-64"
                    />

                    <p className="text-sm text-white">
                        Your notifications will appear here once you’ve received them.
                    </p>
                </div>
            </div>

            {/* ======= Desktop / Tablet Layout ======= */}
            <div className="hidden md:flex items-center justify-center w-full h-full px-4">
                <div className="max-w-xl w-full bg-[#2a2a2c] rounded-xl p-10 border border-gray-700 shadow-lg">
                    {/* Top Nav */}
                    <div className="flex items-center mb-10">
                        <ArrowLeftCircleIcon
                            className="h-8 w-8 text-gray-400 cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                        <h1 className="ml-4 text-2xl font-semibold">Notifications</h1>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center text-center">
                        <p className="text-2xl font-medium mb-4">No notifications yet</p>

                        <img
                            src="/Illustration/Notifications.svg"
                            alt="Notifications Icon"
                            className="h-52 w-52"
                        />

                        <p className="text-sm text-gray-300 max-w-xs">
                            Your notifications will appear here once you’ve received them.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoNotifications;
