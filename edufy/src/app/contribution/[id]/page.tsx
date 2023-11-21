"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

type UserData = {
  srn: string;
  company_name: string;
  testexpr: string;
  iorp: string;
  selectedforint: boolean;
  doi: string;
  intexp: string;
  ctc: string;
  selected: boolean;
  // applied_for_masters: boolean;
  // university_name: string;
  // program_name: string;
  // joined_masters: boolean;
};

type UserDataWithIndexSignature = UserData & { [key: string]: any };

const MainForm = ({ params }: { params: { id: string } }) => {
  const [isPlacement, setIsPlacement] = useState(false);
  const [isMasters, setIsMasters] = useState(false);
  const [userData, setUserData] = useState<UserDataWithIndexSignature>({
    srn: params.id,
    company_name: "",
    testexpr: "",
    iorp: "",
    selectedforint: false,
    doi: "",
    intexp: "",
    ctc: "",
    selected: false,
  });
  // applied_for_masters: false,
  // university_name: "",
  // program_name: "",
  // joined_masters: false,

  const handleCheckboxChange = (key: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: !prevUserData[key],
    }));

    // Handle conditional rendering based on user responses
    if (key === "selectedforint") {
      setIsPlacement(!userData.selectedforint);
    } else if (key === "applied_for_masters") {
      setIsMasters(userData.applied_for_masters);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    // If it's a checkbox, handle it separately
    if (type === "checkbox") {
      handleCheckboxChange(name);
    } else {
      let updatedValue = value;

      // Handle specific logic for iorp
      if (name === "iorp") {
        updatedValue = value.toLowerCase() === "summer" ? "1" : "2";
        setIsPlacement(updatedValue === "2"); // Adjust conditional rendering
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: updatedValue,
      }));

      // Handle conditional rendering based on user responses
      if (name === "applied_for_masters") {
        setIsMasters(updatedValue.toLowerCase() === "yes");
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    const putData = async () => {
      try {
        const response = await fetch(
          "http://10.30.204.60:9090/addstudentplacements",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          },
        );

        if (response.ok) {
          var data = await response.json();
          console.log("successful updation:", data);
          window.location.href = `/profile/${data.name} `;
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
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mx-auto max-w-md">Contribute</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded-md"
      >
        <div className="mb-4">
          <label>
            Summer Intern or Placement:
            <div>
              <label>
                <input
                  type="radio"
                  name="iorp"
                  value="summer"
                  checked={userData.iorp === "1"}
                  onChange={handleChange}
                  className="mr-2 text-black"
                />
                Summer Intern
              </label>
              <label>
                <input
                  type="radio"
                  name="iorp"
                  value="placement"
                  checked={userData.iorp === "2"}
                  onChange={handleChange}
                  className="ml-4 text-black"
                />
                Placement
              </label>
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            Company Name:
            <input
              type="text"
              name="company_name"
              value={userData.company_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            Test Experience:
            <input
              type="text"
              name="testexpr"
              value={userData.testexpr}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            Interview Selected:
            <input
              type="checkbox"
              name="selectedforint"
              checked={userData.selectedforint}
              onChange={() => handleCheckboxChange("selectedforint")}
              className="text-black"
            />
          </label>
        </div>

        {userData.selectedforint && (
          <>
            <div className="mb-4">
              <label>
                Interview Date:
                <input
                  type="text"
                  name="doi"
                  value={userData.doi}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md text-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Interview Experience:
                <input
                  type="text"
                  name="intexp"
                  value={userData.intexp}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md text-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                ctc/Stipend:
                <input
                  type="text"
                  name="ctc"
                  value={userData.ctc}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md text-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                selected:
                <input
                  type="checkbox"
                  name="selected"
                  checked={userData.selected}
                  onChange={() => handleCheckboxChange("selected")}
                />
              </label>
            </div>
          </>
        )}

        {/* <div className="mb-4">
          <label>
            Applied for Masters:
            <input
              type="checkbox"
              name="applied_for_masters"
              checked={userData.applied_for_masters}
              onChange={() => handleCheckboxChange("applied_for_masters")}
            />
          </label>
        </div>

        {userData.applied_for_masters && (
          <>
            <div className="mb-4">
              <label>
                University Name:
                <input
                  type="text"
                  name="university_name"
                  value={userData.university_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Program Name:
                <input
                  type="text"
                  name="program_name"
                  value={userData.program_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Joined Masters:
                <input
                  type="checkbox"
                  name="joined_masters"
                  checked={userData.joined_masters}
                  onChange={() => handleCheckboxChange("joined_masters")}
                />
              </label>
            </div>
          </>
        )} */}

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white py-2 px-4 rounded-md cursor-pointer bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      <br />
      <br />
      <br />
    </>
  );
};

export default MainForm;
