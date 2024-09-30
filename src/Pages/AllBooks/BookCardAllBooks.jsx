import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function BookCardAllBooks(props) {
  const [views, setViews] = useState([]);
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem("authToken");
  const viewsLength = views.length;
  const likesLength = likes.length;
//   console.log(token);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    // Fetching data using axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/api/views/book/${props.bookId}`,
          config
        ); // Example URL
        setViews(response.data);
        const response1 = await axios.get(
          `http://localhost:9090/api/like/book/${props.bookId}`,
          config
        ); // Example URL
        setLikes(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);
  
  // console.log(`${IMAGE_BASE_URL}/bookpic/${props.bookImageName}`);
    // console.log(likesLength,"likes  ",viewsLength,"viewlength")
  const value = ((likesLength * 5) / viewsLength);
  const stars = Array.from({ length: value });
  const user = props.userDto;
  
  return (
    <div>
      <div class="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
        {/* Premium Tag */}
        {Number(props.price) !== 0 && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            Premium
          </span>
        )}
        
        <div class="w-5/6 h-[220px] p-2 overflow-hidden mx-auto aspect-w-5 aspect-h-8">
          <img
            src={`/${IMAGE_BASE_URL}/bookpic/${props.bookImageName}`}
            alt="Product 3"
            class="h-full w-full object-contain"
          />
        </div>

        <div class="p-2 bg-white">
          <h3 class="text-lg font-bold text-gray-800">{props.bookTitle}</h3>
          {user && user.length > 0?<h4 class="text-sm text-gray-800 font-bold mt-1">
            Author:{user.fullName}
          </h4>:""}
          <p class="text-gray-600 text-sm mt-2">{props.bookdescription}</p>

          <div class="flex space-x-2 mt-4">
            {stars.map((_, index) => (
              <svg
                key={index}
                className="w-4 fill-[#facc15]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}

            {
              <Link
              to={`/bookdetail/${props.bookId}`}
                type="button"
                // onClick={handleread}
                className="absolute  bottom-2 right-1 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Details
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
