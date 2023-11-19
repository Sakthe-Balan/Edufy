// pages/HomePage.js
"use client";
import React, { useState } from "react";
import MyTable from "../../layouts/components/table"; // Assuming the correct path

function HomePage() {
  const initialData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 22 },
    { id: 4, name: "Alice", age: 28 },
    { id: 5, name: "Charlie", age: 26 },
    { id: 6, name: "Eva", age: 29 },
    { id: 7, name: "Frank", age: 23 },
    { id: 8, name: "Grace", age: 27 },
    { id: 9, name: "Henry", age: 31 },
    { id: 10, name: "Isabel", age: 24 },
    { id: 11, name: "Jack", age: 32 },
    { id: 12, name: "Lily", age: 21 },
    { id: 13, name: "Mark", age: 33 },
    { id: 14, name: "Nina", age: 26 },
    { id: 15, name: "Oliver", age: 30 },
  ];
  const [tableData, setTableData] = useState(initialData);

  const handleNameCheckboxChange = () => {
    // Make a backend call for name filter
    // Replace the following line with your actual backend call
    // For example, you can use axios or fetch to make an API call
    // axios.get('/api/data?filter=name').then(response => setTableData(response.data));
    // This is just a placeholder, replace it with your actual logic
    setTableData(initialData); // Placeholder for the updated data
  };

  const handleAgeCheckboxChange = () => {
    // Make a backend call for age filter
    // Replace the following line with your actual backend call
    // For example, you can use axios or fetch to make an API call
    // axios.get('/api/data?filter=age').then(response => setTableData(response.data));
    // This is just a placeholder, replace it with your actual logic
    setTableData(initialData); // Placeholder for the updated data
  };

  return (
    <div className="flex p-4">
      <div className="mr-4 bg">
        <h2 className="mb-4 text-center ">Contributions</h2>
        <div className=" border-2  p-4 rounded-md border-black ">
          <div>
            <h2 className="text-black">Filter</h2>
            <label className="flex items-center ">
              <input type="checkbox" onChange={handleNameCheckboxChange} />
              <span className="ml-2">Show Name</span>
            </label>
          </div>
          <div>
            <label className="flex items-center ">
              <input type="checkbox" onChange={handleAgeCheckboxChange} />
              <span className="ml-2 ">Show Age</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 border border-gray-300 rounded-md">
        <MyTable data={tableData} />
      </div>
    </div>
  );
}

export default HomePage;
