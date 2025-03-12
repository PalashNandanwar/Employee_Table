const ProfileModal = ({ user, onClose }) => {
    if (!user) return null;
    console.log(user);
    // Ensure user data is available

    return (
        <div className=" fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-[800px] rounded-lg shadow-lg relative">
                {/* Header */}
                <div className="bg-purple-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                user.gender === "Male"
                                    ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"// Male Icon
                                    : "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"// Female Icon
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <h2 className="text-lg font-semibold">{user.firstName + " " + user.lastName}</h2>
                    </div>

                    <button onClick={onClose} className="text-white text-xl font-bold">
                        &times;
                    </button>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold">CONTACT DETAILS</h3>
                        <p className="text-gray-600">📧 {user.email}</p>
                        <p className="text-gray-600">📞 {user.mobile || "N/A"}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-gray-700 font-semibold">ADDRESS</h3>
                        <p className="text-gray-600">{user.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-gray-700 font-semibold">JOB TITLE</h3>
                            <p className="text-gray-600">{user.jobTitle || "Not Provided"}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold uppercase">employment Type</h3>
                            <p className="text-gray-600">{user.employmentType || "Not Provided"}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold">DEPARTMENT</h3>
                            <p className="text-gray-600">{user.department || "Not Provided"}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold uppercase">working Hours</h3>
                            <p className="text-gray-600">{user.workingHours || "Not Provided"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
