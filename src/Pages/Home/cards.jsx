import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ResponsiveCardLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const token = localStorage.getItem("authToken");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/categories/",
          config
        );
        setDataArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(dataArray)
  return (
    <>
      <div class="bg-gray-100 p-4 sm:p-4 md:p-8 mt-5">
        <h2 className="text-xl font-semibold pb-3 px-3">Books Categories</h2>

        <div class="container mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {/* cards */}
            {isLoading ? (
              <p>Loading...</p>
            ) : dataArray && dataArray.length > 0 ? (
              dataArray.map((item) => (
                <Link
                  to={`/allbook/${item.categoryId}/${item.categoryTitle}`}
                  class="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
                >
                  <span class="text-md mb-0 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-xl">
                    {item.categoryTitle}
                  </span>
                  <span class="text-sm leading-normal text-gray-400 sm:block">
                    {item.categoryDescription}
                  </span>
                </Link>
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
