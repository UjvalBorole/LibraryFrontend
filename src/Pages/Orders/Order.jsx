import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;
// src={`/${IMAGE_BASE_URL}/bookpic/${props.bookImageName}`}
{
  /* <Link to={`/bookdetail/${props.bookId}`} */
}

export default function Order() {
  const [isloading, setIsLoading] = useState(true);

  const [dataArray, setDataArray] = useState([0]);
  const [freeBook, setFreeBook] = useState([0]);
  const [premiumBook, setPremiumBook] = useState([0]);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  //   console.log(token)
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
        // /api/orders/user/{userId}

        const response = await axios.get(
          `http://localhost:9090/api/orders/user/${userId}`,
          config
        ); // Example URL
        setDataArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const date = (date1) => {
    const date2 = new Date(Number(date1)); // Convert to a Date object
    let date3 = date2.toString().substring(0, 24);
    return date3;
  };

  //   console.log(dataArray)
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
                <article class="flex border rounded dark:border-slate-700/50 dark:bg-slate-500 w-[350px] h-[200px]">
                  <Link to={`/bookdetail/${item.book.bookId}`}>
                    <img
                      class="object-cover w-[140px] h-full rounded-l"
                      loading="lazy"
                      src={`/${IMAGE_BASE_URL}/bookpic/${item.book.bookImageName}`}
                      alt="Anselm Kiefer"
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
                        {item.book.bookdescription.substring(0,25)}...
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {date(item.date)}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Book price : {item.book.price} <br />
                        Platform Fees: 25

                      </p>
                    </div>

                    <div class="flex items-center justify-end gap-2 dark:text-gray-300 flex-wrap">
                      <div
                        target="_blank"
                
                        class="flex items-center gap-1 px-2 py-1 border rounded dark:border-gray-700"
                        aria-label="Buy on Amazon for 189₹"
                      >
                        <span>Total: Rs.{item.book.price + 25}</span>
                      </div>
                      {/* <a
                        target="_blank"
                        href=""
                        class="flex items-center gap-1 px-2 py-1 border rounded dark:border-gray-700"
                        aria-label="Buy on Flipkart for 150₹"
                      >
                        <span>150₹</span>
                      </a> */}
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
