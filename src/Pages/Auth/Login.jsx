import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ContextApi} from "../../context/Context";


export const Login = () => {
  const navigate = useNavigate(); 
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [userid,setUserid] = useState(0);
  const { userId, setUserId } = useContext(ContextApi);
  
  useEffect(() => {
    if (userid) {
      console.log('UserID updated:', userid);
      setUserId(userid);
      localStorage.setItem('userId', userid);
      navigate('/home');  
    }
  }, [userid]); 

    const handleSubmit = async(event)=>{
      event.preventDefault();

      const data = {
          username:username,
          password:password,
      };
      try{
        const response = await axios.post('http://localhost:9090/api/auth/login',data,{withCredentials:true});
        // console.log('Data uploaded successfully: ',response.data);
        const token = response.data.token;
        localStorage.setItem('authToken',token);

        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

       const user  =  await axios.get(`http://localhost:9090/api/user/getUserByEmail/${username}`,config);
       const fetchuserId = user.data.userid;
        setUserid(fetchuserId);
        setErrorMessage("");
        // navigate('/home')
        console.log('Login Successful, token stored: ',token);
        setUserId()

      }catch(error){
        if(error.response){
          console.error('Error response',error.response.data);
          setErrorMessage(`Error: ${error.response.data}`);
        }else if(error.request){
          console.error('Error request: ',error.request);
          setErrorMessage('No response from the server.')
        }else{
          console.error('Error',error.message);
          setErrorMessage('An unknown error occured.');
        }
      }
    };

    const handlegoogle = () =>{
      window.location.href = 'http://localhost:9090/oauth2/authorization/google'
      useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const response = await axios.get('http://localhost:9090/api/user');
            console.log("user data",response.data); // Contains user info (email, name, etc.)
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        };
      
        fetchUserInfo();
      }, []);
    }
  return (

    <div className="flex w-full mt-20 item-center justify-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
    <div
      className=" bg-cover lg:block lg:w-1/2"
      style={{
        backgroundImage:
          "url('./public/login.png')",
      }}
    ></div>

    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
      <div className="flex justify-center mx-auto">
        <img
          className="w-auto h-7 sm:h-8"
          src="./public/vite.png"
          alt=""
        />
      </div>

      <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
        Welcome back!
      </p>

      <div
        onClick={handlegoogle}
        className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <div className="px-4 py-2">
          <svg className="w-6 h-6" viewBox="0 0 40 40">
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#FFC107"
            />
            <path
              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
              fill="#FF3D00"
            />
            <path
              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
              fill="#4CAF50"
            />
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#1976D2"
            />
          </svg>
        </div>

        <span className="w-5/6 px-4 py-3 font-bold text-center">
          Sign in with Google
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

        <a
          href="#"
          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or login with email
        </a>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
      </div>

      <form action="" onSubmit={handleSubmit}>
        {errorMessage && <><div className='text-red-500'>{errorMessage}</div></>}
      <div className="mt-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          htmlFor="LoggingEmailAddress"
        >
          Email Address
        </label>
        <input
          id="LoggingEmailAddress"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          type="email"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}

        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="loggingPassword"
          >
            Password
          </label>
          <a
            href="#"
            className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
          >
            Forget Password?
          </a>
        </div>

        <input
          id="loggingPassword"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          Sign In
        </button>
      </div>
      </form>
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

        <Link
          to={"/ragister"}
          className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or sign up
        </Link>

        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
  </div>
  );
};

