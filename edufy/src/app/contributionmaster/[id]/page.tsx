"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

type UserData = {
  srn: string;
  uname: string;
  pname: string;
  joined: boolean;
  desc: string;
};

type UserDataWithIndexSignature = UserData & { [key: string]: any };

const Page = ({ params }: { params: { id: string } }) => {
  const [userData, setUserData] = useState<UserDataWithIndexSignature>({
    srn: params.id,
    uname: "",
    pname: "",
    joined: false,
    desc: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (name: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: !prevUserData[name],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(userData);
    const putData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/addstudentmasters",
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
        className="max-w-md mx-auto p-4 border border-black rounded-md"
      >
        <>
          <div className="mb-4">
            <label>
              University Name:
              <input
                type="text"
                name="uname"
                value={userData.uname}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-black"
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Program Name:
              <input
                type="text"
                name="pname"
                value={userData.pname}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-black"
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Joined Masters:
              <input
                type="checkbox"
                name="joined"
                checked={userData.joined}
                onChange={() => handleCheckboxChange("joined")}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Comments:
              <input
                type="text"
                name="desc"
                value={userData.desc}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-black"
              />
            </label>
          </div>
        </>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white py-2 px-4 rounded-md cursor-pointer bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
      <button
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                    onClick={()=>{
                      var path=localStorage.getItem('path');
                      window.location.href=`/profile/`+path;
                    }}
                  >
                    Back
            </button>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Page;
