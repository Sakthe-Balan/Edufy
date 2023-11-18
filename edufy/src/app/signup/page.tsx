"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const UserForm = () => {
  const [isAdmin, setisAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [srn, setSRN] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [dob, setDOB] = useState("");
  const [department_id, setDepartmentID] = useState("");
  const [password, setPassword] = useState("");
  const [Desc, setDesc] = useState("");

  const handleCheckboxChange = () => {
    setisAdmin(!isAdmin);
    // If you want to clear the srn field when isAdmin is checked, you can add the following line:
    setSRN("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      var requestBody = {
        isAdmin,
        name,
        email,
        srn,
        phone_number,
        dob,
        department_id,
        password,
        Desc,
      };

      console.log(requestBody);
      const response = await fetch("http://localhost:9090/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      // Optionally, you can perform additional actions after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, you can handle errors or display an error message to the user
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mx-auto max-w-md">Signup/Login</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded-md"
      >
        <div className="mb-4">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        {!isAdmin && (
          <div className="mb-4">
            <label>
              SRN:
              <input
                type="text"
                name="srn"
                value={srn}
                onChange={(e) => setSRN(e.target.value)}
                className="w-full p-2 border rounded-md text-black"
              />
            </label>
          </div>
        )}
        <div className="mb-4">
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Date of Birth:
            <input
              type="text"
              name="dob"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Department ID:
            <input
              type="number"
              name="department_id"
              value={department_id}
              onChange={(e) => setDepartmentID(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
            />
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isAdmin}
              onChange={handleCheckboxChange}
            />
            Admin
          </label>
          <div>
            <button
              type="submit"
              className="text-white py-2 px-4 rounded-md cursor-pointer bg-blue-500"
              onClick={() => {
                window.location.href = `/login`;
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </form>

      <br />
      <br />
      <br />
    </>
  );
};

export default UserForm;
