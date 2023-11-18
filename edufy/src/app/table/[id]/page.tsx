// pages/HomePage.js
"use client";
import React, { useState, useEffect } from "react";
import MyTable from "../../../layouts/components/table"; // Assuming the correct path

function HomePage({ params }: { params: { id: string } }) {
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

  useEffect(() => {
    let path = "";
    if (params.id === "1") {
      path = "/allstudentplacementdetails";
    } else if (params.id === "2") {
      path = "/allstudentsuniversitydetails";
    }

    const getData = async () => {
      try {
        const response = await fetch("http://localhost:9090" + path, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("successful retrieval:", data.data);
          setTableData(data.data);
        } else {
          console.error("retrieval failed");
        }
      } catch (error) {
        console.error("Error during retrieval:", error);
        alert("An error occurred during retrieval");
      }
    };

    getData();
  }, [params.id]);

  const [tableData, setTableData] = useState(initialData);

  const handleNameCheckboxChange = () => {
    // Make a backend call for name filter
    // Replace the following line with your actual backend call
    // axios.get('/api/data?filter=name').then(response => setTableData(response.data));
    setTableData(initialData);
  };

  const handleAgeCheckboxChange = () => {
    // Make a backend call for age filter
    // Replace the following line with your actual backend call
    // axios.get('/api/data?filter=age').then(response => setTableData(response.data));
    setTableData(initialData);
  };

  return (
    <>
      <div className="flex flex-col p-4 min-h-screen">
        <div className="flex mb-4">
          <div className="w-screen bg">
            <h2 className="mb-4 text-left">Contributions</h2>
            <div className="border-2 p-4 rounded-md border-gray-200">
              <h3 className="mb-2 text-left w-full">Filter</h3>
              <div className="flex flex-row">
                <div className="flex flex-row  ">
                  <input
                    className="ml-2"
                    type="checkbox"
                    onChange={handleNameCheckboxChange}
                  />
                  <span className="ml-2">Show Name</span>
                </div>
                <div className="flex items-center">
                  <input
                    className="ml-2"
                    type="checkbox"
                    onChange={handleAgeCheckboxChange}
                  />
                  <span className="ml-2">Show Age</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow p-4 border border-gray-300 rounded-md">
          <MyTable data={tableData} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
