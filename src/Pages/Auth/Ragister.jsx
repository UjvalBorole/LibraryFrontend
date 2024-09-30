import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Ragister = () => {
 
  const [first, setFirst] = useState('');
  const [last,setLast] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [conPass, setConPass] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Handler function for button clicks
  const handleSelectAccount = (accountType) => {
    setSelectedAccount(accountType);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    let password = "";
    if (conPass === pass) {
      password = pass;
    } else {
      setErrorMessage("Passwords do not match");
      return;
    }

    const data = {
      fullName: first + last,
      email: email,
      password: password,
      phonenumber: phone,
    };

    let path = "";
    if(selectedAccount == "User"){
    path = "http://localhost:9090/api/auth/registerUser/3";
  }else {
      path = "http://localhost:9090/api/auth/registerUser/2";

    }

    try {
      const response = await axios.post(path, data, { withCredentials: true });
      console.log('Data uploaded successfully: ', response.data);
      setSuccessMsg('User Signin Successfully please try to login');
      setErrorMessage("");

      
    } catch (error) {
      setSuccessMsg("");
      if (error.response) {
        console.error('Error response', error.response.data);
        setErrorMessage(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.error('Error request: ', error.request);
        setErrorMessage('No response from the server.');
      } else {
        console.error('Error', error.message);
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <> 
    <section className="m-3 bg-white dark:bg-gray-900 ">
    <div className="flex justify-center min-h-screen">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            "url('./ragister.jpg')",
        }}
      ></div>

      <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
        <div className="w-full">
          <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
            Get your free account now.
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Let’s get you all set up so you can verify your personal account
            and begin setting up your profile.
          </p>
          {errorMessage && <><div className='text-red-700 m-1'> {errorMessage}</div></>}
          {successMsg && <><div className='text-green-700'> {successMsg}</div></>}
        
          <div className="mt-6">
      <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

      <div className="mt-3 md:flex md:items-center md:-mx-2">
        {/* Author Button */}
        <button
          onClick={() => handleSelectAccount("Author")}
          className={`flex justify-center w-full px-6 py-3 mt-4 ${
            selectedAccount === "Author"
              ? "text-white bg-blue-500"
              : "text-blue-500 border border-blue-500"
          } rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="mx-2">Author</span>
        </button>

        {/* User Button */}
        <button
          onClick={() => handleSelectAccount("User")}
          className={`flex justify-center w-full px-6 py-3 mt-4 ${
            selectedAccount === "User"
              ? "text-white bg-blue-500"
              : "text-blue-500 border border-blue-500"
          } rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="mx-2">User</span>
        </button>
      </div>

      {/* Example: Showing the selected account type */}
      {selectedAccount && (
        <p className="mt-4 text-gray-500 dark:text-gray-300">
          Selected account type: {selectedAccount}
        </p>
      )}
    </div>

          <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={first}
                onChange={(e)=>setFirst(e.target.value)}
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Snow"
                value={last}
                onChange={(e)=>setLast(e.target.value)}
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="XXX-XX-XXXX-XXX"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                placeholder="johnsnow@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={conPass}
                onChange={(e)=>setConPass(e.target.value)}
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <button
              className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              <span>Sign Up</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 dark:text-blue-400 focus:outline-none focus:underline hover:underline"
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section> </>
  );
};



