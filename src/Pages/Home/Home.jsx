import React, { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import axios from "axios";
import ResponsiveCardLayout from "./cards";
import RecommendedBook from "./RecommendedBook";
import { Link } from "react-router-dom";

export default function Home() {
  const [isloading, setIsLoading] = useState(true);

  const [dataArray, setDataArray] = useState([0]);
  const [freeBook, setFreeBook] = useState([0]);
  const [premiumBook, setPremiumBook] = useState([0]);
  const token = localStorage.getItem("authToken");

  console.log(token);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch data when the component mounts
  useEffect(() => {
    // Fetching data using axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/book/books",
          config
        ); // Example URL
        setDataArray(response.data);
        const content = response.data.content || [];
        const freeBooksArray = content
          .filter((book) => book.price === 0)
          .slice(0, 6);
        const premiumBooksArray = content
          .filter((book) => book.price !== 0)
          .slice(0, 6);
        setFreeBook(freeBooksArray);
        setPremiumBook(premiumBooksArray);
        // setCatDataArray(response.data.content)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  const reversedContent = dataArray?.content
    ? [...dataArray.content].reverse().slice(0, 6)
    : [];
  const dataArray1 = dataArray?.content
    ? [...dataArray.content].slice(0, 7)
    : [];

  return (
    <>
      <header className="bg-slate-100 dark:bg-slate-200">
        <div className="container px-6 py-2 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-800 lg:text-4xl">
                  Best Books to Read <br /> your{" "}
                  <span className="text-red-800">Choices</span>
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro beatae error laborum ab amet sunt recusandae? Reiciendis
                  natus perspiciatis optio.
                </p>

                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-orange-700 rounded-lg lg:w-auto hover:bg-orange-500 focus:outline-none focus:bg-orange-500">
                  Read Now
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-4 lg:mt-0 lg:w-1/2">
              <img
                className="max-w-2xl max-h-72 lg:max-w-3xl opacity-80"
                src="./public/Hero.png"
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </header>

      <ResponsiveCardLayout />

      {/* Categories Wise Books Section */}
      <section className="py-4 bg-slate-100 my-3">
        <div className="container mx-auto">
          {/* Flex container to align title and button */}
          <div className="flex justify-between items-center mb-4">
            {/* Section Title */}
            <h2 className="text-2xl font-bold">New Books Launched</h2>

            {/* Arrow Button */}
            <Link
              to={"/allbook/1/New Books Launched"}
              className="text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
            {isloading ? (
              <p>Loading...</p>
            ) : reversedContent && reversedContent.length > 0 ? (
              reversedContent.map((item) => (
                <Link to={`/bookdetail/${item.bookId}`}>
                  <BookCard key={item.id} {...item} />
                </Link>
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-4 bg-slate-100 my-3">
        <div className="container mx-auto">
          {/* Flex container to align title and button */}
          <div className="flex justify-between items-center mb-4">
            {/* Section Title */}
            <h2 className="text-2xl font-bold">Free Books</h2>

            {/* Arrow Button */}
            <Link
              to={"/allbook/1/Free Books"}
              className="text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-1">
            {isloading ? (
              <p>Loading...</p>
            ) : freeBook && freeBook.length > 0 ? (
              freeBook.map((item) => (
                <Link to={`/bookdetail/${item.bookId}`}>
                  <BookCard key={item.id} {...item} />
                </Link>
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </section>

      {/* primium Books Section */}
      <section className="py-4 bg-slate-100 my-3">
        <div className="container mx-auto">
          {/* Flex container to align title and button */}
          <div className="flex justify-between items-center mb-4">
            {/* Section Title */}
            <h2 className="text-2xl font-bold">Premium Books</h2>

            {/* Arrow Button */}
            <Link
              to={"/allbook/1/Premium Books"}
              className="text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
            {isloading ? (
              <p>Loading...</p>
            ) : premiumBook && premiumBook.length > 0 ? (
              premiumBook.map((item) => (
                <Link to={`/bookdetail/${item.bookId}`}>
                  <BookCard key={item.id} {...item} />
                </Link>
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-slate-100  flex flex-col  py-2 mx-0 my-3  lg:h-[25rem] lg:py-4 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
            <div className="flex justify-center order-2 mt-6 pl-20 lg:mt-0 lg:space-y-3 lg:flex-col"></div>

            <div className="max-w-lg lg:mx-12 lg:order-2">
              <h1 className="text-3xl text-gray-950 font-semibold tracking-wide dark:text-grayy-950 lg:text-4xl">
                The best Apple Watch apps
              </h1>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
                quia asperiores alias vero magnam recusandae adipisci ad vitae
                laudantium quod rem voluptatem eos accusantium cumque.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-orange-600 rounded-lg hover:bg-orange-500 lg:mx-0 lg:w-auto focus:outline-none"
                >
                  Download from App Store
                </a>
              </div>
            </div>
          </div>

          <div className="flex  lg:w-[350px] sm:w-[200] md:w-[200]">
            <img
              className="object-cover w-full h-full rounded-md"
              src="./public/poster.png"
              alt="apple watch photo"
            />
          </div>
        </div>
      </section>

      {/* Recommended Books Section */}
      <RecommendedBook />
    </>
  );
}
