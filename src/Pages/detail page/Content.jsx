import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ContentPage from './ContentPage';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../redux_store/paginationslice';
import { Link, useParams } from "react-router-dom";

export default function Content() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter);
    const [isloading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [input, setInput] = useState('');
    const [dataArray, setDataArray] = useState([0]);
    const token = localStorage.getItem('authToken');

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const handlePrev = (event) => {
        dispatch(decrement(1));
    };

    const handleNext = (event) => {
        dispatch(increment(1));
    };

    // console.log(total)
    console.log(dataArray);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/content/book/${id}/pageNo/${counter}`, config); // Example URL
                const response2 = await axios.get(`http://localhost:9090/api/content/book/${id}`, config);
                setDataArray(response.data);
                setTotal(response2.data.length)

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [counter]);

    // // console.log(total,"total");
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:9090/api/content/book/1/keyword/soldier`, config); // Example URL
    //             setDataArray(response.data);

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);


    const [searchQuery, setSearchQuery] = useState('');
    const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
    const isAplhabet = (string) => /^[a-zA-Z]+$/.test(string);

    // const handleSearch = (event) => {
    //     event.preventDefault();  
    //     if(isNumeric(searchQuery)){
    //        let searchnumber = parseInt(searchQuery);
    //        if(searchnumber > counter){
    //         dispatch(increment(searchnumber-counter));
    //        }else if(searchnumber < counter){
    //         dispatch(decrement(counter - searchnumber));
    //        }
    //     }else if(isAplhabet(searchQuery)){
    //         setInput(searchQuery);
    //     }
        
    // };

    // const handleSearch = async (event) => {
    //     event.preventDefault();  // Prevent page refresh
    
    //     try {
    //         if (isNumeric(searchQuery)) {
    //             // Search by page number
    //             let searchnumber = parseInt(searchQuery);
    //             if (searchnumber > counter) {
    //                 dispatch(increment(searchnumber - counter));
    //             } else if (searchnumber < counter) {
    //                 dispatch(decrement(counter - searchnumber));
    //             }
     
    //         } else if (isAplhabet(searchQuery)) {
    //             // Search by keyword (title)
    //             let string =searchQuery.trim();
    //             const response = await axios.get(`http://localhost:9090/api/content/book/1/keyword/${string}`, config);
    //             console.log(string,"searchQuery")
    //             // setDataArray(response.data);
    //         }
    
    //     } catch (error) {
    //         console.error('Error fetching search data:', error);
    //         setDataArray([]);  // Handle no results or error by clearing the array
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    

    return (
        <div>

            <section className=" dark:bg-slate-100 py-2 mb-3">
            {/* <div className="flex flex-col gap-4 justify-center items-center p-4 my-3 mt-0">
            <div className="relative p-3 border border-gray-200 rounded-lg w-full max-w-lg">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        className="rounded-md p-3 w-full" 
                        placeholder="Search Title | PageNo"
                        value={searchQuery}  // Bind the search query to state
                        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state on input change
                    />

                    <button type="submit" className="absolute right-6 top-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div> */}

                {isloading ? (
                    <p>Loading...</p>
                ) : dataArray ? (
                    <ContentPage key={dataArray.contentId} {...dataArray} />

                ) : (
                    <p>No books available</p>
                )}



                <div class="flex items-end justify-end m-3">
                    {/* <!-- Previous Button --> */}
                    {counter !== 1 ? <button onClick={handlePrev} class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Previous
                    </button> : ""}
                    {counter !== total ? <button onClick={handleNext} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button> : ""}
                </div>
            </section>

        </div>
    )
}
