import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCardAllBooks from "./BookCardAllBooks";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllBooks() {
  const arr = useSelector((state)=>state.arr);
  const [isloading, setIsLoading] = useState(true);

  const [dataArray, setDataArray] = useState([0]);

  const token = localStorage.getItem("authToken");
  const { id, name } = useParams();

  //   console.log(token)
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  if (id !== '0' && name === "New Books Launched") {
    useEffect(() => {
      // Fetching data using axios
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9090/api/book/books",
            config
          );
          const content = response.data.content || [];

          const reversedContent = content ? [...content].reverse() : [];

          setDataArray(reversedContent);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      // Call the fetch function
      fetchData();
    }, []);
    // const reversedContent = dataArray ? [...dataArray].reverse() : [];
  } else if (id !== '0' && name === "Free Books") {
    useEffect(() => {
      // Fetching data using axios
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9090/api/book/books",
            config
          ); // Example URL
          const content = response.data.content || [];
          const freeBooksArray = content
            .filter((book) => book.price === 0)
            .slice(0, 6);
          setDataArray(freeBooksArray);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      // Call the fetch function
      fetchData();
    }, []);
  } else if (id !== '0' && name === "Premium Books") {
    useEffect(() => {
      // Fetching data using axios
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9090/api/book/books",
            config
          );
          const content = response.data.content || [];
          const premiumBooksArray = content
            .filter((book) => book.price !== 0)
            .slice(0, 6);
          setDataArray(premiumBooksArray);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      // Call the fetch function
      fetchData();
    }, []);
  } else if(id === '0' && name !== '') {
    useEffect(() => {
      const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/book/search/${name}`, config); // Example URL
        console.log("data",response.data);
        setDataArray(response.data);
        const content = response.data.content || [];
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }};

      fetchData();
    }, []);
    }
  
  else if(id !== '0') {
    // Fetch data when the component mounts
    useEffect(() => {
      // Fetching data using axios
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:9090/api/book/category/${id}`,
            config
          ); // Example URL
          setDataArray(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      // Call the fetch function
      fetchData();
    }, []);
  }

 

  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      <div class="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 class="text-4xl font-extrabold text-gray-800 mb-12"> {name}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {isloading ? (
            <p>Loading...</p>
          ) : dataArray && dataArray.length > 0 ? (
            dataArray.map((item) => (
              <BookCardAllBooks key={item.bookId} {...item} />
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </div>
  );
}
