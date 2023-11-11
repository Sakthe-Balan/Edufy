'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Page({ params }: { params: { id: object } }) {
  const initialUserData = {
    isAdmin: true,
    name: 'John Doe',
    email: 'john.doe@example.com',
    srn: 123456,
    phone_number: '123-456-7890',
    dob: '1990-01-01',
    department_id: 1,
    password: '********',
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [contributions, setContributions] = useState<string[]>([]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log('Updated User Data:', userData);
    setContributions([...contributions, JSON.stringify(userData)]);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row justify-center p-8 space-y-4 lg:space-x-4 lg:space-y-0"
      >
        <div className="flex flex-col items-start w-full lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Profile Page</h2>

          {isEditing ? (
            <div className="rounded border border-gray-300 p-4 mb-4 w-full">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>IsAdmin:</label>
                  <input
                    type="checkbox"
                    checked={userData.isAdmin}
                    onChange={(e) => handleInputChange('isAdmin', e.target.checked)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>SRN:</label>
                  <input
                    type="text"
                    value={userData.srn}
                    onChange={(e) => handleInputChange('srn', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    value={userData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>DOB:</label>
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Department ID:</label>
                  <input
                    type="text"
                    value={userData.department_id}
                    onChange={(e) => handleInputChange('department_id', e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="rounded border border-gray-300 p-4 mb-4 w-full">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>IsAdmin:</strong> {userData.isAdmin.toString()}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Name:</strong> {userData.name}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Email:</strong> {userData.email}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>SRN:</strong> {userData.srn}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Phone Number:</strong> {userData.phone_number}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>DOB:</strong> {userData.dob}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Department ID:</strong> {userData.department_id}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Password:</strong> {userData.password}
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
          {!userData.isAdmin && (
            <div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => alert('Contribute button clicked')}
                >
                  Contribute
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Previous Contributions</h3>
                <ul>
                  {contributions.map((contribution, index) => (
                    <li key={index}>{contribution}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {userData.isAdmin && (
            <>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => alert('Contribute button clicked')}
                >
                  View All Contributions
                </button>
              </div>
            </>
          )}
        </div>

        <div className="rounded border border-gray-300 p-4 mb-4 w-full lg:w-1/4">
          <h3 className="text-xl font-bold mb-2">User Description</h3>
          <p>{userData.isAdmin ? 'Administrator' : 'Regular User'}</p>
        </div>
      </motion.div>
      <br />
      <br />
      <br />
    </>
  );
}

export default Page;
