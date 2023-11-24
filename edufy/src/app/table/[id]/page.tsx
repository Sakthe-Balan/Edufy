// pages/HomePage.js
"use client";
import React, { useState, useEffect } from "react";
import MyTable from "../../../layouts/components/table"; // Assuming the correct path

function HomePage({ params }: { params: { id: string } }) {
  const initialData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 22 },
    // ... (remaining initial data)
  ];

  const [originalData, setOriginalData] = useState(initialData);
  const [tableData, setTableData] = useState(originalData);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [summaryData, setSummaryData] = useState({
    avgSalary: 0,
    totalPlaced: 0,
    totalMasters: 0,
  });

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
          setOriginalData(data.data); // Update originalData as well
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

  const handleReset = () => {
    setTableData(originalData);
    setSelectedFilter(null);
  };

  const handleFilterChange = async (filterEndpoint: string) => {
    try {
      const response = await fetch("http://localhost:9090" + filterEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const filteredData = await response.json();
        console.log("successful retrieval:", filteredData.data);
        setTableData(filteredData.data);
        setSelectedFilter(filterEndpoint);
      } else {
        console.error("retrieval failed");
      }
    } catch (error) {
      console.error("Error during retrieval:", error);
      alert("An error occurred during retrieval");
    }
  };

  const handleRadioChange = (value: string) => {
    switch (value) {
      case "ctc12":
        handleFilterChange("/tier1");
        break;
      case "ctc8":
        handleFilterChange("/tier2");
        break;
      case "ctc":
        handleFilterChange("/tier3");
        break;
      default:
        break;
    }
  };

  const calculateSummaryData = async () => {
    try {
      const avgSalaryResponse = await fetch(
        "http://localhost:9090/findavgsalary",
      );
      if (avgSalaryResponse.ok) {
        const avgSalaryData = await avgSalaryResponse.json();
        setSummaryData((prevData) => ({
          ...prevData,
          avgSalary: avgSalaryData.data.average_salary,
        }));
      } else {
        console.error("Average salary retrieval failed");
      }

      const totalPlacedResponse = await fetch(
        "http://localhost:9090/findtotalplaced",
      );
      if (totalPlacedResponse.ok) {
        const totalPlacedData = await totalPlacedResponse.json();
        setSummaryData((prevData) => ({
          ...prevData,
          totalPlaced: totalPlacedData.data.total_placed,
        }));
      } else {
        console.error("Total placed retrieval failed");
      }

      const totalMastersResponse = await fetch(
        "http://localhost:9090/findtotalmasterjoined",
      );
      if (totalMastersResponse.ok) {
        const totalMastersData = await totalMastersResponse.json();
        setSummaryData((prevData) => ({
          ...prevData,
          totalMasters: totalMastersData.data.total_joined,
        }));
      } else {
        console.error("Total masters retrieval failed");
      }
    } catch (error) {
      console.error("Error during summary data calculation:", error);
      alert("An error occurred during summary data calculation");
    }
  };
  const handleSummaryClick = () => {
    // Logic to calculate average salary, total placed, and total masters
    calculateSummaryData();

    // Show the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col p-4 min-h-screen">
        <div className="flex mb-4">
          <div className="w-screen bg">
            <div className="flex justify-between">
              <h2 className="mb-4 text-left">Contributions</h2>
              <button
                className="ml-2 text-white px-2 h-10 bg-blue-500 rounded-md"
                onClick={handleSummaryClick}
              >
                Summary
              </button>
            </div>

          <div className="border-2 p-4 rounded-md border-gray-200">
             <h3 className="mb-2 text-left w-full">Filter</h3>
              <div className="flex flex-row">
               {(params.id=="1")&&(<> <div className="flex flex-row  ">
                  <input
                    className="ml-2  relative top-2"
                    type="radio"
                    name="filter"
                    value="ctc12"
                    checked={selectedFilter === "/tier1"}
                    onChange={() => handleRadioChange("ctc12")}
                  />
                  <span className="ml-2  relative top-1">CTC &gt;12</span>
                </div>
                <div className="flex items-center">
                  <input
                    className="ml-2 "
                    type="radio"
                    name="filter"
                    value="ctc8"
                    checked={selectedFilter === "/tier2"}
                    onChange={() => handleRadioChange("ctc8")}
                  />
                  <span className="ml-2">CTC &gt;8 &lt;12</span>
                </div>
                <div className="flex items-center">
                  <input
                    className="ml-2"
                    type="radio"
                    name="filter"
                    value="ctc"
                    checked={selectedFilter === "/tier3"}
                    onChange={() => handleRadioChange("ctc")}
                  />
                  <span className="ml-2">CTC &lt;8</span>
                </div>
                <div className="flex items-center">
                  <button
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div></>)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow p-4 border border-gray-300 rounded-md">
          <MyTable data={tableData} />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto  bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md max-w-screen-md border border-gray-300">
            <h3 className="mb-4 text-2xl  text-black font-semibold">Summary</h3>
            <p className="text-black font-semibold">
              Average Salary: {summaryData.avgSalary} LPA
            </p>
            <p className="text-black font-semibold">
              Total Placed: {summaryData.totalPlaced} People
            </p>
            <p className="text-black font-semibold">
              {" "}
              Total Masters: {summaryData.totalMasters} People
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
