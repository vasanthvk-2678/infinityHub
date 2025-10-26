import { FiArrowRight } from "react-icons/fi";
import { useDataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const { users, loading, error } = useDataContext();

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-red-600 font-medium">Some error occured. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-50">
            <header className="flex items-center justify-between bg-gradient-to-r from-blue-900 shadow-lg px-8 py-5 mb-10">
                <h1 className="text-3xl font-semibold text-white">Users</h1>
                <div className="flex items-center gap-3">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/10015/10015419.png"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
                    />
                </div>
            </header>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-8">
                {loading
                    ? Array(9).fill(null).map((_, i) => (  //skeleton loading with dummy 9 arrays
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 animate-pulse"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                                <div className="space-y-2">
                                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="w-full h-3 bg-gray-200 rounded"></div>
                                <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))
                    : users.map((user) => (
                        <div
                            key={user.id}
                            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <img
                                    src={user.profileImage}
                                    alt={user.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-700 space-y-2">
                                <p className="text-md">{user.email}</p>
                                <p className="font-medium">{user.company.name}</p>
                            </div>

                            <div
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                                onClick={() => navigate(`/user/${user.id}`)}
                            >
                                <FiArrowRight size={22} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default User;
