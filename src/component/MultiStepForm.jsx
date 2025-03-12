import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const MultiStepForm = ({ setShowForm, employee }) => {
    const [step, setStep] = useState(1);
    // const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState(employee || {
        firstName: "",
        lastName: "",
        displayName: "",
        gender: "",
        dob: "",
        workEmail: "",
        email: "",
        mobile: "",
        password: "",
        numberSeries: "",
        roles: "",
        jobTitle: "",
        jobType: "",
        department: "",
        location: "",
        workMode: "",
        reportingManager: "",
        jobDescription: "",
        employmentType: "",
        workShift: "",
        workingHours: "",
        workExperience: "",
        officeAddress: "",
        workAuthorization: "",
        salary: "",
        bonus: "",
        currency: "",
        paymentFrequency: "",
        stockOptions: "",
        benefits: ""
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (employee && Object.keys(employee).length > 0) {
            setFormData(employee);
        }
    }, [employee]);

    useEffect(() => {
        console.log("Employee data received:", employee);
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);


    const handleSubmit = async () => {
        try {
            const url = employee
                ? `https://json-for-employee-2.onrender.com/employee/${employee.id}` // Update existing user
                : "https://json-for-employee-2.onrender.com/employee"; // Create new user

            const method = employee ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // No image upload logic
            });

            if (response.ok) {
                console.log("Form Data Submitted Successfully:", formData);
                setShowForm(false);
            } else {
                console.error("Error submitting form:", response.statusText);
            }
        } catch (error) {
            console.error("Failed to submit form:", error);
        }
    };




    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="absolute z-50 inset-0 flex justify-center items-center bg-[#191B1F]">
            <div className="w-[70%] p-8 rounded-lg shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
                {/* Form Heading */}
                <h2 className="text-2xl font-bold text-white bg-purple-600 py-3 px-6 rounded-md text-center">
                    Create Employee Wizard
                </h2>

                {/* Steps Indicator */}
                <div className="flex justify-between items-center my-4">
                    {["Basic Details", "Job Details", "Work Details", "Compensation"].map((label, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 w-fit text-center">
                            {/* Step Number */}
                            <span
                                className={`w-10 h-10 flex justify-center items-center border-2 rounded-full font-bold 
                ${step === index + 1 ? "bg-purple-600 text-white border-purple-600" : "bg-gray-300 text-gray-600 border-gray-400"}`}
                            >
                                {index + 1}
                            </span>
                            {/* Step Label */}
                            <span
                                className={`mt-2 text-sm font-medium ${step === index + 1 ? "text-purple-600" : "text-gray-600"}`}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </div>


                {/* Step Forms */}
                {step === 1 && (
                    <div className=" flex flex-col gap-[1.5rem]">
                        {/* <label className="block text-sm font-medium text-white">First Name</label> */}
                        <div className=" flex gap-4">
                            <input
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                value={formData.firstName}
                                className="w-full p-2 border rounded-md bg-transparent text-white" />

                            <input
                                placeholder="Last Name"
                                type="text" name="lastName"
                                onChange={handleChange}
                                value={formData.lastName}
                                className="w-full p-2 border rounded-md bg-transparent text-white" />

                            <input placeholder="Display Name" type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="w-full p-2 border rounded-md bg-transparent text-white" />
                        </div>

                        <div className="w-full flex gap-4">
                            {/* Image upload */}
                            {/* <div className="w-full">
                                <label className="block text-sm font-medium text-white">Upload Image</label>
                                <input type="file" onChange={handleImageUpload} />
                                {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-32 h-32 mt-4" />}
                            </div> */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-white">Gender</label>
                                <select
                                    name="gender" value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                >
                                    <option value="" disabled selected className="text-black">Select Gender</option>
                                    <option value="Male" className="text-black">Male</option>
                                    <option value="Female" className="text-black">Female</option>
                                    <option value="Other" className="text-black">Other</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-white">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">

                            <div className="w-full">
                                <label className="block text-sm font-medium text-white">Work Email</label>
                                <input
                                    placeholder="Work Email"
                                    type="email"
                                    name="workEmail"
                                    value={formData.workEmail}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-white block mb-1">Email</label>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-white block mb-1">Mobile Number</label>
                                <input
                                    placeholder="Mobile Number"
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                />
                            </div>
                        </div>

                        {/* Work Type, Number Series, Roles */}
                        <div className="flex gap-4">
                            {/* <div className="w-full">
                                <label className="text-white block mb-1">Work Type</label>
                                <select
                                    name="workType"
                                    value={formData.workType}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                >
                                    <option value="" disabled selected className="text-black">Select Work Type</option>
                                    <option value="Full-time" className="text-black">Full-time</option>
                                    <option value="Part-time" className="text-black">Part-time</option>
                                    <option value="Internship" className="text-black">Internship</option>
                                </select>
                            </div> */}

                            <div className="w-full">
                                <label className="text-white block mb-1">Password</label>
                                <input
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-white block mb-1">Number Series</label>
                                <input
                                    placeholder="Number Series"
                                    type="text"
                                    name="numberSeries"
                                    onChange={handleChange}
                                    value={formData.numberSeries}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-white block mb-1">Roles</label>
                                <select
                                    name="roles"
                                    onChange={handleChange}
                                    value={formData.roles}
                                    className="w-full p-2 border rounded-md bg-transparent text-white"
                                >
                                    <option value="" disabled selected className="text-black">Select Role</option>
                                    <option value="Developer" className="text-black">Developer</option>
                                    <option value="Designer" className="text-black">Designer</option>
                                    <option value="Manager" className="text-black">Manager</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">Next</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="space-y-6">
                            {/* Row 1: Job Title, Job Type, Department */}
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label className="block text-gray-300 mb-1">Job Title</label>
                                    <input type="text" name="jobTitle" placeholder="Enter Job Title"
                                        onChange={handleChange} value={formData.jobTitle}
                                        className="w-full p-2 border rounded-md bg-transparent" />
                                </div>

                                {/* <div className="w-full">
                                    <label className="text-white block mb-1">Work Type</label>
                                    <select
                                        name="workType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md bg-transparent text-white"
                                    >
                                        <option value="" disabled selected className="text-black">Select Work Type</option>
                                        <option value="Full-time" className="text-black">Full-time</option>
                                        <option value="Part-time" className="text-black">Part-time</option>
                                        <option value="Internship" className="text-black">Internship</option>
                                    </select>
                                </div> */}

                                <div className="w-full">
                                    <label className="block text-gray-300 mb-1">Department</label>
                                    <select name="department"
                                        onChange={handleChange}
                                        value={formData.department}
                                        className="w-full p-2 border rounded-md bg-transparent ">
                                        <option value="">Select Department</option>
                                        <option value="engineering" className="text-black">Engineering</option>
                                        <option value="marketing" className="text-black">Marketing</option>
                                        <option value="sales" className="text-black">Sales</option>
                                        <option value="hr" className="text-black">HR</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 2: Location, Work Mode, Reporting Manager */}
                            <div className="flex gap-4">
                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Location</label>
                                    <input type="text" name="location" placeholder="Enter Location"
                                        onChange={handleChange} value={formData.location}
                                        className="w-full p-2 border rounded-md bg-transparent " />
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Work Mode</label>
                                    <select name="workMode"
                                        onChange={handleChange}
                                        value={formData.workMode}
                                        className="w-full p-2 border rounded-md bg-transparent ">
                                        <option value="" className="text-black">Select Work Mode</option>
                                        <option value="remote" className="text-black">Remote</option>
                                        <option value="on-site" className="text-black">On-site</option>
                                        <option value="hybrid" className="text-black">Hybrid</option>
                                    </select>
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Reporting Manager</label>
                                    <input type="text" name="reportingManager" placeholder="Enter Manager's Name"
                                        onChange={handleChange} value={formData.reportingManager}
                                        className="w-full p-2 border rounded-md bg-transparent " />
                                </div>
                            </div>

                            {/* Row 3: Job Description */}
                            <div>
                                <label className="block text-gray-300 mb-1">Job Description</label>
                                <textarea name="jobDescription" placeholder="Enter Job Description"
                                    onChange={handleChange} value={formData.jobDescription}
                                    className="w-full p-2 border rounded-md bg-transparent  h-24"></textarea>
                            </div>
                        </div>


                        <div className="flex justify-between mt-4">
                            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-md">Back</button>
                            <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className="space-y-6">
                            {/* Row 1: Employment Type, Work Shift, Working Hours */}
                            <div className="flex gap-4">
                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Employment Type</label>
                                    <select name="employmentType"
                                        onChange={handleChange}
                                        value={formData.employmentType}
                                        className="w-full p-2 border rounded-md bg-transparent ">
                                        <option value="" className="text-black">Select Employment Type</option>
                                        <option value="full-time" className="text-black">Full-time</option>
                                        <option value="part-time" className="text-black">Part-time</option>
                                        <option value="contract" className="text-black">Contract</option>
                                        <option value="freelance" className="text-black">Freelance</option>
                                    </select>
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Work Shift</label>
                                    <select name="workShift"
                                        onChange={handleChange}
                                        value={formData.workShift}
                                        className="w-full p-2 border rounded-md bg-transparent ">
                                        <option value="" className="text-black">Select Work Shift</option>
                                        <option value="morning" className="text-black">Morning</option>
                                        <option value="evening" className="text-black">Evening</option>
                                        <option value="night" className="text-black">Night</option>
                                    </select>
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Working Hours</label>
                                    <input
                                        type="text" name="workingHours" placeholder="e.g., 9 AM - 5 PM"
                                        onChange={handleChange} value={formData.workingHours}
                                        className="w-full p-2 border rounded-md bg-transparent" />
                                </div>
                            </div>

                            {/* Row 2: Work Experience, Office Address, Work Authorization */}
                            <div className="flex gap-4">
                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Work Experience (Years)</label>
                                    <input type="number" name="workExperience" placeholder="Enter Years"
                                        onChange={handleChange} value={formData.workExperience}
                                        className="w-full p-2 border rounded-md bg-transparent " />
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Office Address</label>
                                    <input type="text" name="officeAddress" placeholder="Enter Office Location"
                                        onChange={handleChange} value={formData.officeAddress}
                                        className="w-full p-2 border rounded-md bg-transparent " />
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Work Authorization</label>
                                    <select name="workAuthorization"
                                        onChange={handleChange}
                                        value={formData.workAuthorization}
                                        className="w-full p-2 border rounded-md bg-transparent ">
                                        <option value="" className="text-black">Select Authorization</option>
                                        <option value="citizen" className="text-black">Citizen</option>
                                        <option value="work-permit" className="text-black">Work Permit</option>
                                        <option value="visa" className="text-black">Visa</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between mt-4">
                            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-md">Back</button>
                            <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">Next</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <div className="space-y-6">
                            {/* Row 1: Salary, Bonus, Currency */}
                            <div className="flex gap-4">
                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Salary</label>
                                    <input type="number" name="salary" placeholder="Enter Salary Amount"
                                        onChange={handleChange} value={formData.salary}
                                        className="w-full p-2 border rounded-md bg-transparent" />
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Bonus</label>
                                    <input type="number" name="bonus" placeholder="Enter Bonus Amount"
                                        onChange={handleChange} value={formData.bonus}
                                        className="w-full p-2 border rounded-md bg-transparent " />
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Currency</label>
                                    <select name="currency"
                                        onChange={handleChange}
                                        value={formData.currency}
                                        className="w-full p-2 border rounded-md bg-transparent">
                                        <option value="" className="text-black">Select Currency</option>
                                        <option value="usd" className="text-black">USD</option>
                                        <option value="eur" className="text-black">EUR</option>
                                        <option value="inr" className="text-black">INR</option>
                                        <option value="gbp" className="text-black">GBP</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 2: Payment Frequency, Stock Options, Benefits */}
                            <div className="flex gap-4">
                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Payment Frequency</label>
                                    <select name="paymentFrequency"
                                        onChange={handleChange}
                                        value={formData.paymentFrequency}
                                        className="w-full p-2 border rounded-md bg-transparent ">
                                        <option value="" className="text-black">Select Payment Frequency</option>
                                        <option value="monthly" className="text-black">Monthly</option>
                                        <option value="bi-weekly" className="text-black">Bi-weekly</option>
                                        <option value="annually" className="text-black">Annually</option>
                                    </select>
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Stock Options</label>
                                    <input type="text" name="stockOptions" placeholder="Enter Stock Options"
                                        onChange={handleChange} value={formData.stockOptions}
                                        className="w-full p-2 border rounded-md bg-transparent " />
                                </div>

                                <div className="w-1/3">
                                    <label className="block text-gray-300 mb-1">Benefits</label>
                                    <input type="text" name="benefits" placeholder="Enter Benefits"
                                        onChange={handleChange} value={formData.benefits}
                                        className="w-full p-2 border rounded-md bg-transparent" />
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between mt-4">
                            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-md">Back</button>
                            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md">Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default MultiStepForm;
