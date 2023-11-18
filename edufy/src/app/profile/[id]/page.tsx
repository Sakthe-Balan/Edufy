"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MyTable from "../../../layouts/components/table";

function Page({ params }: { params: { id: string } }) {
  const [placementDetails, setPlacementDetails] = useState<any[]>([]);
  const [totalMastersData, setTotalMastersData] = useState<any[]>([]);
  const [avgSalaryData, setAvgSalaryData] = useState<number | null>(null);
  const initialUserData = {
    IsAdmin: false,
    CreatedAt: "2023-11-17T20:35:45.970676+05:30",
    UpdatedAt: "2023-11-17T20:35:45.970676+05:30",
    Deleted: null,
    SRN: "PES1UG21CS031",
    Name: "adithya ganesh",
    Password: "1234",
    Email: "adithyag020@gmail.com",
    PhoneNumber: "8310271412",
    DepartmentID: 0,
    DOB: "07-10-2003",
    IDColumn: 0,
    Desc: "hello",
  };
  var data = {
    IsAdmin: false,
    CreatedAt: "2023-11-17T20:35:45.970676+05:30",
    UpdatedAt: "2023-11-17T20:35:45.970676+05:30",
    Deleted: null,
    SRN: "PES1UG21CS031",
    Name: "adithya ganesh",
    Password: "1234",
    Email: "adithyag020@gmail.com",
    PhoneNumber: "8310271412",
    DepartmentID: 0,
    DOB: "07-10-2003",
    IDColumn: 0,
    Desc: "hello",
  };
  console.log(params.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9090/getDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: params.id,
          }),
        });

        if (response.ok) {
          data = await response.json();
          console.log("Login successful:", data);
          setUserData(data);
          // Assuming you have a navigation function or component
          // that handles the redirection
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during reciv:", error);
        alert("An error occurred during reciv");
      }
    };

    // Call fetchData function
    fetchData();
  }, [params.id]);

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [contributions, setContributions] = useState<string[]>([]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    console.log(userData.SRN);
    setContributions([]);
    const putDatas = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/getstudentplacements",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ srn: userData.SRN }),
          },
        );

        if (response.ok) {
          var dtas = await response.json();
          console.log("successful place:", dtas.data);
          setContributions([...contributions, JSON.stringify(dtas.data)]);
          // Assuming you have a navigation function or component
          // that handles the redirection
        } else {
          console.error("place er");
        }
      } catch (error) {
        console.error("Error during place:", error);
        alert("An error occurred during place");
      }
    };

    const ptDatas = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/getstudentuniversities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ srn: userData.SRN }),
          },
        );

        if (response.ok) {
          var datass = await response.json();
          console.log("successful mast:", datass.data);
          setContributions([...contributions, JSON.stringify(datass.data)]);
          // Assuming you have a navigation function or component
          // that handles the redirection
        } else {
          console.error("update failed mast");
        }
      } catch (error) {
        console.error("Error during mast:", error);
        alert("An error occurred during mast");
      }
    };

    // Call fetchData function
    putDatas();
    ptDatas();
  }, [userData]);

  const handleSaveClick = () => {
    console.log("Updated User Data:", userData);
    // setContributions([...contributions, JSON.stringify(userData)]);
    const putData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/updatestudentprofile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userData.Name,
              email: userData.Email,
              srn: userData.SRN,
              phone_number: userData.PhoneNumber,
              dob: userData.DOB,
              dept_id: userData.DepartmentID,
              password: userData.Password,
            }),
          },
        );

        if (response.ok) {
          var daa = await response.json();
          console.log("successful updation:", daa);

          // Assuming you have a navigation function or component
          // that handles the redirection
        } else {
          console.error("update failed");
        }
      } catch (error) {
        console.error("Error during upd:", error);
        alert("An error occurred during upd");
      }
    };

    // Call fetchData function
    putData();
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
                {/* <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>IsAdmin:</label>
                  <input
                    type="checkbox"
                    checked={userData.isAdmin}
                    onChange={(e) =>
                      handleInputChange("isAdmin", e.target.checked)
                    }
                  />
                </div> */}
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={userData.Name}
                    onChange={(e) => handleInputChange("Name", e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userData.Email}
                    onChange={(e) => handleInputChange("Email", e.target.value)}
                  />
                </div>
                {/* <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>SRN:</label>
                  <input
                    type="text"
                    value={userData.SRN}
                    onChange={(e) => handleInputChange("srn", e.target.value)}
                  />
                </div> */}
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    value={userData.PhoneNumber}
                    onChange={(e) =>
                      handleInputChange("PhoneNumber", e.target.value)
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>DOB:</label>
                  <input
                    type="text"
                    value={userData.DOB}
                    onChange={(e) => handleInputChange("DOB", e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Department ID:</label>
                  <input
                    type="text"
                    value={userData.DepartmentID}
                    onChange={(e) =>
                      handleInputChange("DepartmentID", e.target.value)
                    }
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={userData.Password}
                    onChange={(e) =>
                      handleInputChange("Password", e.target.value)
                    }
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
                  <strong>IsAdmin:</strong> {userData.IsAdmin.toString()}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Name:</strong> {userData.Name}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Email:</strong> {userData.Email}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>SRN:</strong> {userData.SRN ? userData.SRN : "Nil"}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Phone Number:</strong> {userData.PhoneNumber}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>DOB:</strong> {userData.DOB}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Department ID:</strong> {userData.DepartmentID}
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 pr-2">
                  <strong>Password:</strong> {userData.Password}
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
          {!userData.IsAdmin && (
            <div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    window.location.href = `/contribution/${userData.SRN}`;
                  }}
                >
                  Contribute Placements/Interns
                </button>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    window.location.href = `/contributionmaster/${userData.SRN}`;
                  }}
                >
                  Contribute Masters
                </button>
              </div>

              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        "http://localhost:9090/allstudentplacementdetails",
                      );

                      if (response.ok) {
                        const data = await response.json();
                        setPlacementDetails(data.data);
                      } else {
                        console.error(
                          "Failed to fetch all student placement details",
                        );
                      }
                    } catch (error) {
                      console.error("Error during fetch:", error);
                      alert("An error occurred during fetch");
                    }
                  }}
                >
                  Get All Student Placement Details
                </button>
              </div>

              {/* Display fetched placement details below the button */}
              {placementDetails.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2">
                    All Student Placement Details
                  </h3>
                  <ul>
                    {placementDetails.map((detail, index) => (
                      <li key={index}>{JSON.stringify(detail)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button to fetch and display total masters data */}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        "http://localhost:9090/allstudentsuniversitydetails",
                      );

                      if (response.ok) {
                        const data = await response.json();
                        setTotalMastersData(data.data);
                      } else {
                        console.error("Failed to fetch total masters data");
                      }
                    } catch (error) {
                      console.error("Error during fetch:", error);
                      alert("An error occurred during fetch");
                    }
                  }}
                >
                  Get Total Masters Data
                </button>
              </div>

              {/* Display fetched total masters data below the button */}
              {totalMastersData.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2">Total Masters Data</h3>
                  <ul>
                    {totalMastersData.map((detail, index) => (
                      <li key={index}>{JSON.stringify(detail)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Button to fetch and display average salary data */}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        "http://localhost:9090/findavgsalary",
                      );

                      if (response.ok) {
                        const data = await response.json();
                        setAvgSalaryData(data.average_salary);
                      } else {
                        console.error("Failed to fetch average salary data");
                      }
                    } catch (error) {
                      console.error("Error during fetch:", error);
                      alert("An error occurred during fetch");
                    }
                  }}
                >
                  Get Average Salary Data
                </button>
              </div>

              {/* Display fetched average salary data below the button */}
              {avgSalaryData !== null && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2">
                    Average Salary Data
                  </h3>
                  <p>{`Average Salary: ${avgSalaryData}`}</p>
                </div>
              )}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    window.location.href = `/contributionmaster/${userData.SRN}`;
                  }}
                >
                  total number of students placed .
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2 p-4">
                  Previous Contributions
                </h3>
                <ul>
                  {contributions.map((contribution, index) => (
                    <li key={index}>{contribution}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {userData.IsAdmin && (
            <>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => alert("Contribute button clicked")}
                >
                  View All Contributions
                </button>
              </div>
            </>
          )}
        </div>

        <div className="rounded border border-gray-300 p-4 mb-4 w-full lg:w-1/4">
          <h3 className="text-xl font-bold mb-2">User Description</h3>
          <p>{userData.Desc}</p>
        </div>
      </motion.div>
      <br />
      <br />
      <br />
    </>
  );
}

export default Page;
