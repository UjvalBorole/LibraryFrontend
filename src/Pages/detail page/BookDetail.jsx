import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BookCard } from "../Home/Bookcard2";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function BookDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState({});
  const [views, setViews] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [likeId, setLikeId] = useState(0);
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState("");

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  // Fetch book data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/api/book/${id}`,
          config
        );

        // Only update if the data has changed
        if (JSON.stringify(response.data) !== JSON.stringify(dataArray)) {
          setDataArray(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, config]); // Fetch data only when `id` changes

  // Fetch likes and views by bookId
  useEffect(() => {
    const fetchStats = async () => {
      if (dataArray.bookId) {
        try {
          const viewsResponse = await axios.get(
            `http://localhost:9090/api/views/book/${dataArray.bookId}`,
            config
          );
          setViews(viewsResponse.data);
         
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, [dataArray.bookId, config]); // Fetch stats only when `bookId` changes


  useEffect(() => {
    const fetchStats = async () => {
      if (dataArray.bookId) {
        try {

          const likesResponse = await axios.get(
            `http://localhost:9090/api/like/book/${dataArray.bookId}`,
            config
          );
          setLikes(likesResponse.data);

        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, [dataArray.bookId, config, likeState]); // Fetch stats only when `bookId` changes


  useEffect(() => {
    const fetchStats = async () => {
      if (dataArray.bookId) {
        try {
          const orderResponse = await axios.get(
            `http://localhost:9090/api/orders/user/${userId}/book/${dataArray.bookId}`,
            config
          );
          setOrders(orderResponse.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, [dataArray.bookId, config]); // Fetch stats only when `bookId` changes

  useEffect(() => {
    const fetchStats = async () => {
      if (dataArray.bookId) {
        try {
          // http://localhost:9090/api/comment/1
          const commentResponse = await axios.get(
            `http://localhost:9090/api/comment/${dataArray.bookId}`,
            config
          );
          console.log(commentResponse.data)
          setComments(commentResponse.data);

        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, [dataArray.bookId, config]); // Fetch stats only when `bookId` changes


  useEffect(() => {
    const fetchStats = async () => {
      if (dataArray.bookId) {
        try {
          const likeResponse = await axios.get(
            `http://localhost:9090/api/like/user/${userId}/book/${dataArray.bookId}`,
            config
          );
          setLikeId(likeResponse.data.likeId);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, [dataArray.bookId, config, likeState]); // Fetch stats only when `bookId` changes


  const handlelike = async () => {
    console.log(config);
    if (!likeState) {
      try {
        const response = await axios.post(
          `http://localhost:9090/api/like/user/${userId}/book/${dataArray.bookId}`,
          {}, // Empty body if no request data is required
          config // Pass the config object with Authorization header
        );
        console.log(response.data);
        setLikeId(response.data.likeId);
        setLikeState(true);
      } catch (error) {
        if (error.response) {
          console.error("Error response", error.response.data);
          setErrorMessage(`Error: ${error.response.data}`);
        } else if (error.request) {
          console.error("Error request: ", error.request);
          setErrorMessage("No response from the server.");
        } else {
          console.error("Error", error.message);
          setErrorMessage("An unknown error occured.");
        }
      }
    } else {
      try {
        const response = await axios.delete(
          `http://localhost:9090/api/like/${likeId}`,
          // {}, // Empty body if no request data is required
          config // Pass the config object with Authorization header
        );
        console.log(response);
        setLikeState(false);
      } catch (error) {
        if (error.response) {
          console.error("Error response", error.response.data);
          setErrorMessage(`Error: ${error.response.data}`);
        } else if (error.request) {
          console.error("Error request: ", error.request);
          setErrorMessage("No response from the server.");
        } else {
          console.error("Error", error.message);
          setErrorMessage("An unknown error occured.");
        }
      }
    }
  };

  const handleview = async () => {
    try {
      const response = await axios.post(
        // /api/views/user/{userId}/book/{bookId}
        `http://localhost:9090/api/views/user/${userId}/book/${dataArray.bookId}`,
        {}, // Empty body if no request data is required
        config // Pass the config object with Authorization header
      );
      // console.log(response.data);
      setLikeId(response.data.likeId);
      setLikeState(true);
    } catch (error) {
      if (error.response) {
        console.error("Error response", error.response.data);
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        console.error("Error request: ", error.request);
        setErrorMessage("No response from the server.");
      } else {
        console.error("Error", error.message);
        setErrorMessage("An unknown error occured.");
      }
    }
  };

  const handlecomment = async (event) => {
    event.preventDefault();
    const data = {
      content: input,
    };
    try {
      const response = await axios.post(
        // /api/comment/{bookId}/user/{userId}/comments
        `http://localhost:9090/api/comment/${dataArray.bookId}/user/${userId}/comments`,
        data,
        config // Pass the config object with Authorization header
      );
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response", error.response.data);
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        console.error("Error request: ", error.request);
        setErrorMessage("No response from the server.");
      } else {
        console.error("Error", error.message);
        setErrorMessage("An unknown error occured.");
      }
    }
  };

  // Calculate the star rating based on likes and views
  const viewsLength = views.length;
  const likesLength = likes.length;
  const value = viewsLength > 0 ? (likesLength * 5) / viewsLength : 0;
  const stars = Array.from({ length: Math.round(value) });

  const date = new Date(Number(dataArray.bookAddedDate)); // Convert to Date object
  const date1 = date.toString().substring(0, 24);

  const userOrder = orders;
  let RecommendedBooks = [];
  if (isLoading == false) {
    RecommendedBooks = dataArray.userDto.books;
  }
  console.log(dataArray);

  function handledate(bookAddedDate) {
    const date = new Date(Number(bookAddedDate)); // Convert to a Date object
    let date1 = date.toString().substring(0, 24);
    return date1;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {dataArray && (
        <div class="font-sans">
          <div class="p-4 lg:max-w-7xl max-w-xl max-lg:mx-auto">
            <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
              <div class="min-h-[500px] lg:col-span-3 bg-gradient-to-tr  from-[#94b4f848] via-[#b5c9ff21] to-[#fff2d793] rounded-lg w-full lg:sticky top-0 text-center p-6">
                <img
                  src={`/${IMAGE_BASE_URL}/bookpic/${dataArray.bookImageName}`}
                  alt="Product"
                  class="w-3/5 rounded object-cover mx-auto py-6"
                />
              </div>

              <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-gray-800">
                  {dataArray.bookTitle}{" "}
                  <span className="text-sm text-gray-400">
                    views:{viewsLength}
                  </span>
                </h2>

                <div class="flex flex-wrap gap-4 mt-4">
                  <p class="text-gray-800 text-xl font-bold">
                    Author: {dataArray.userDto.fullName}
                  </p>
                  {dataArray.price !== 0 ? (
                    <p class="text-gray-800 text-xl font-bold">
                      Price: Rs. {dataArray.price}
                      {userOrder.length !== 0 ? (
                        <span className="text-sm px-2 text-red-600">Paid</span>
                      ) : (
                        ""
                      )}
                    </p>
                  ) : (
                    ""
                  )}
                  <p class="text-gray-400 text-sm">
                    Published Date: {date1}
                    <span class="text-sm ml-1"></span>
                  </p>
                </div>

                <div class="flex space-x-2 mt-4">
                  {stars.map((_, index) => (
                    <svg
                      class="w-5 fill-orange-400"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  ))}
                </div>

                <div class="mt-8 mb-5">
                  <h3 class="text-xl font-bold text-gray-800">
                    About this Book
                  </h3>
                  <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                    <li>{dataArray.bookdescription}</li>
                    <li>
                      Book Author Email:{dataArray.userDto.email} And Phone No.{" "}
                      {dataArray.userDto.phonenumber}
                    </li>
                  </ul>
                </div>

                {userOrder.length === '0' ? (
                  <Link
                    to={`/purchase/${dataArray.bookId}`}
                    type="button"
                    class="w-full mt-3 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold rounded-md"
                  >
                    Purchase Book
                  </Link>
                ) : (
                  <Link
                    onClick={handleview}
                    to={`/content/${dataArray.bookId}`}
                    type="button"
                    class="w-full mt-3 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold rounded-md"
                  >
                    Read this Book
                  </Link>
                )}
                {likesLength > 0 ? (
                  <button
                    onClick={handlelike}
                    class=" mx-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Likes ({likes.length})
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handlelike}
                    class=" mx-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Likes
                    </span>
                  </button>
                )}
                {dataArray && dataArray.isprintable == true? <Link to={`/print/${dataArray.bookId}`} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Printable
              </span>
              </Link>:""}


                <div class="mt-8">
                  <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
                  <div class="space-y-3 mt-4">
                    <div class="flex items-center">
                      <p class="text-sm text-gray-800 font-bold">5.0</p>
                      <svg
                        class="w-5 fill-orange-400 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div class="bg-gray-300 rounded w-full h-2 ml-3">
                        <div class="w-2/3 h-full rounded bg-orange-400"></div>
                      </div>
                      <p class="text-sm text-gray-800 font-bold ml-3">66%</p>
                    </div>

                    <div class="flex items-center">
                      <p class="text-sm text-gray-800 font-bold">4.0</p>
                      <svg
                        class="w-5 fill-orange-400 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div class="bg-gray-300 rounded w-full h-2 ml-3">
                        <div class="w-1/3 h-full rounded bg-orange-400"></div>
                      </div>
                      <p class="text-sm text-gray-800 font-bold ml-3">33%</p>
                    </div>

                    <div class="flex items-center">
                      <p class="text-sm text-gray-800 font-bold">3.0</p>
                      <svg
                        class="w-5 fill-orange-400 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div class="bg-gray-300 rounded w-full h-2 ml-3">
                        <div class="w-1/6 h-full rounded bg-orange-400"></div>
                      </div>
                      <p class="text-sm text-gray-800 font-bold ml-3">16%</p>
                    </div>

                    <div class="flex items-center">
                      <p class="text-sm text-gray-800 font-bold">2.0</p>
                      <svg
                        class="w-5 fill-orange-400 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div class="bg-gray-300 rounded w-full h-2 ml-3">
                        <div class="w-1/12 h-full rounded bg-orange-400"></div>
                      </div>
                      <p class="text-sm text-gray-800 font-bold ml-3">8%</p>
                    </div>

                    <div class="flex items-center">
                      <p class="text-sm text-gray-800 font-bold">1.0</p>
                      <svg
                        class="w-5 fill-orange-400 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div class="bg-gray-300 rounded w-full h-2 ml-3">
                        <div class="w-[6%] h-full rounded bg-orange-400"></div>
                      </div>
                      <p class="text-sm text-gray-800 font-bold ml-3">6%</p>
                    </div>
                  </div>

                  <form
                    className="max-w-md mx-auto my-3"
                    onSubmit={handlecomment}
                  >
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Comment
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* Optional icon here */}
                      </div>
                      <input
                        type="search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        id="default-search"
                        className="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Comment..."
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-500 dark:hover:bg-orange-800 dark:focus:ring-orange-800"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  {isLoading ? (
                    <p>Loading...</p>
                  ) : comments && comments.length > 0 ? (
                    comments.map((item) => (
                      <div key={item.id} class="flex items-start mt-8">
                        <img
                          src={`/${IMAGE_BASE_URL}/users/${item.user.userimage}`}
                          class="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div class="ml-3">
                          <h4 class="text-sm font-bold">
                            {item.user.fullName}
                          </h4>
                          <div class="flex space-x-1 mt-1">
                            <p class="text-xs !ml-2 font-semibold">
                              {handledate(item.date)}
                            </p>
                          </div>
                          <p class="text-xs mt-4">{item.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    ""
                  )}
                  <button
                    type="button"
                    class="w-full mt-8 px-4 py-2.5 bg-transparent border border-orange-400 text-gray-800 font-semibold rounded-lg"
                  >
                    Read all reviews
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : RecommendedBooks && RecommendedBooks.length > 0 ? (
              <section class="py-6  bg-slate-200 mt-4 ">
                <div class=" max-w-7xl sm:px-6 ">
                  <h2 class="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
                    Recommended products list
                  </h2>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
                    {RecommendedBooks.map((item) => (
                      <Link to={`/bookdetail/${item.bookId}`}>
                        <BookCard key={item.bookId} {...item} />
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      )}
      )
    </div>
  );
}
