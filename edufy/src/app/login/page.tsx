"use client";
// Import necessary dependencies
import React, { useState, ChangeEvent } from "react";
import { FormEvent } from "react";

// Create the Login component
const LoginForm = () => {
  // State for email, password, and admin checkbox
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle changes in the form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  // Handle form submission
  // ...

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          isAdmin: isAdmin,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Handle the successful login, such as redirecting the user or storing a token.
      } else {
        console.error("Login failed");
        // Handle the login failure, such as displaying an error message.
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors that might occur during the login process.
    }

    // Reset form fields after submission if needed
    setLoginData({ email: "", password: "" });
    setIsAdmin(false);
  };

  // ...

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mx-auto max-w-md">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded-md"
      >
        <div className="mb-4">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </label>
        </div>
        <div className="flex flex-row justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Login
          </button>
          <label>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default LoginForm;

{
  /* <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            {post.title}
          </Link> */
}
