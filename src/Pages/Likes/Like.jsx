import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function Like() {
  const [isloading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [likesCount, setLikesCount] = useState({});
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  const totalLikes = async (bookId) => {
    if (bookId) {
      try {
        const likesResponse = await axios.get(
          `http://localhost:9090/api/like/book/${bookId}`,
          config
        );
        // Return the number of likes
        return likesResponse.data.length;
      } catch (error) {
        console.error("Error fetching stats:", error);
        return 0;
      }
    }
    return 0;
  };

  // Fetch likes for all books
  const fetchLikesForBooks = async (books) => {
    const updatedLikesCount = {};
    for (const item of books) {
      const count = await totalLikes(item.book.bookId);
      updatedLikesCount[item.book.bookId] = count;
    }
    setLikesCount(updatedLikesCount); // Update the likes count state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/api/like/user/${userId}`,
          config
        );
        const arr = response.data.reverse();
        setDataArray(arr);
        await fetchLikesForBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, config]);

  if (isloading) return <div>Loading...</div>;

  return (
    <div>
      {dataArray && dataArray.length > 0 ? (
        <section class="dark:bg-slate-200">
          <div class="px-2 mb-12 mx-auto py-8 max-w-4xl">
            <header>
              <h2 class="mb-4 font-semibold dark:text-gray-800 text-2xl text-center">
                Books You Order
              </h2>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
              {dataArray.map((item) => (
                <article
                  class="flex border rounded dark:border-slate-700/50 dark:bg-slate-500 w-[350px] h-[200px]"
                  key={item.book.bookId}
                >
                  <Link to={`/bookdetail/${item.book.bookId}`}>
                    <img
                      class="object-cover w-[140px] h-full rounded-l"
                      loading="lazy"
                      src={`/${IMAGE_BASE_URL}/bookpic/${item.book.bookImageName}`}
                      alt={item.book.bookTitle}
                      width="140"
                      height="200"
                    />
                  </Link>

                  <div class="flex flex-col justify-between flex-1 p-2 overflow-hidden">
                    <div class="flex flex-col gap-2">
                      <h3 class="font-semibold dark:text-white line-clamp-2">
                        {item.book.bookTitle}
                      </h3>
                      <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {item.book.bookdescription.substring(0, 25)}...
                      </p>
                    </div>

                    <div class="flex items-center justify-end gap-2 dark:text-gray-300 flex-wrap">
                      <div class="flex items-center gap-1 px-2 py-1 border rounded dark:border-gray-700">
                        <span>
                          Likes: {likesCount[item.book.bookId] || 0}{" "}
                          {/* Renders the like count */}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
}
