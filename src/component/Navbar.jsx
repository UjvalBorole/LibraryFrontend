import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [search,setSearch] = useState('');
  const [dropdown,setDropdown] = useState(false);
  const [dataArray, setDataArray] = useState([0]);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');


  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/user/${userId}`, config); 
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [config,userId]);

  const handlesignout = ()=>{
      localStorage.removeItem('userId');
      localStorage.removeItem('authToken');
      navigate('/login');

  }


  const handlesearch = (event)=>{
    event.preventDefault();
    navigate(`/allbook/0/${search}`)
  }

// console.log("user",user)
  return (
    <>
      <header className="bg-white dark:bg-slate-300">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="block text-teal-600 dark:text-teal-300" href="#">
            <span className="sr-only">Home</span>
           
            <img src="/vite.png" className="h-8" alt="" srcset="" />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to={'/home'}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to={'/order'}
                  >
                    Purchased
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to={'/likes'}
                  >
                    Likes
                  </Link>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </nav>
            <div class="relative mt-4 md:mt-0">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>

              <form onSubmit={handlesearch}>
              <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} class="w-full py-1 pl-10 pr-4 text-black bg-white border rounded-lg dark:bg-slate-100 dark:text-black dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search Book Title..." />
              </form>
            </div>
            {/* <!-- Profile dropdown --> */}
            <div class="relative ml-3">
              <div>
                {user && user.userimage!==''? <button onClick={()=>setDropdown(!dropdown)} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full"
                  src={`/${IMAGE_BASE_URL}/users/${user.userimage}`}
                  alt="" />
                </button>:''}
              </div>
              {dropdown === true && <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <button onClick={handlesignout} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
              </div>}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

