import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import MultiStepForm from "./MultiStepForm";

const RecordsList = () => {
    const [records, setRecords] = useState([]);
    const [viewUser, setViewUser] = useState(null);  // For ProfileModal
    const [updateUser, setUpdateUser] = useState(null); // For MultiStepForm
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://json-for-employee-2.onrender.com/employee"); // Fetching stored records
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleViewClick = (record) => {
        setViewUser(record);  // Open Profile Modal
    };

    const handleUpdateClick = (record) => {
        setUpdateUser(record);  // Set user for update
        setShowForm(true);      // Show MultiStepForm
    };

    const handleDeleteClick = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            try {
                const response = await fetch(`https://json-for-employee-2.onrender.com/employee/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("User deleted successfully!");
                    setRecords(records.filter(record => record.id !== userId)); // Update UI after deletion
                } else {
                    alert("Failed to delete user.");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("An error occurred while deleting the user.");
            }
        }
    };


    return (
        <div className="z-40 w-full h-full flex flex-wrap justify-center gap-6 relative">
            {records.map((record, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-xl p-6 w-[370px] text-center relative overflow-hidden"
                >
                    {/* Gray Background */}
                    <div className="relative w-full h-20 bg-gray-300 rounded-t-xl"></div>

                    {/* Profile Image - Centered & Elevated */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-10">
                        <img
                            src={
                                record.gender === "Male"
                                    ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"// Male Icon
                                    : "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"// Female Icon
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                    </div>

                    {/* User Details */}
                    <h3 className="mt-16 text-lg font-semibold text-gray-800">
                        {record.firstName + " " + record.lastName}
                    </h3>
                    <p className="text-gray-600 flex justify-center items-center gap-1">
                        📧 {record.email || "No Email"}
                    </p>

                    {/* Buttons Container */}
                    <div className="flex justify-around gap-4 mt-6">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 shadow-md"
                            onClick={() => handleViewClick(record)}
                        >
                            View
                        </button>

                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 shadow-md"
                            onClick={() => handleUpdateClick(record)}
                        >
                            Update
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-300 hover:bg-red-600 shadow-md"
                        onClick={() => handleDeleteClick(record.id)}
                    >
                        Delete
                    </button>
                </div>


            ))}

            {/* Profile Modal (View) */}
            {viewUser && <ProfileModal user={viewUser} onClose={() => setViewUser(null)} />}

            {/* MultiStepForm (Update) */}
            {showForm && updateUser && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <MultiStepForm setShowForm={setShowForm} employee={updateUser} />
                </div>
            )}
        </div>
    );
};

export default RecordsList;
