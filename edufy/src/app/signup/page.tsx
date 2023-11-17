"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { FormEvent } from "react";

const UserForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    srn: "",
    phone_number: "",
    dob: "",
    department_id: "",
    password: "",
  });

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
    // If you want to clear the srn field when isAdmin is checked, you can add the following line:
    setUserData({ ...userData, srn: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // ...

  // Handle form submission
  // ...

  // Handle form submission

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isAdmin
            ? {
                name: userData.name,
                isAdmin: true,
                email: userData.email,
                password: userData.password,
              }
            : { ...userData, isAdmin: false },
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(userData);
      console.log("Form submitted successfully:", data);
      // Optionally, you can perform additional actions after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, you can handle errors or display an error message to the user
    }
  };

  // ...

  // ...

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
              value={userData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
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
                value={userData.srn}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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
              value={userData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Date of Birth:
            <input
              type="text"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Department ID:
            <input
              type="number"
              name="department_id"
              value={userData.department_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <button
              type="submit"
              className="text-white py-2 px-4 rounded-md cursor-pointer bg-blue-500"
            >
              SignUp
            </button>
            <a href="/login" className=" hover:underline cursor-pointer">
              Login
            </a>
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isAdmin}
              onChange={handleCheckboxChange}
            />
            Admin
          </label>
        </div>
      </form>

      <br />
      <br />
      <br />
    </>
  );
};

export default UserForm;
