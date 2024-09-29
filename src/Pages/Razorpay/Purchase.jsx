import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import axios from "axios";
const RAZORPAY_ID_KEY = import.meta.env.RAZORPAY_ID_KEY;
const RAZORPAY_SECRET_KEY = import.meta.env.RAZORPAY_SECRET_KEY;

export default function Purchase() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState({});
  const [user, setUser] = useState({});
  const [author, setAuthor] = useState("");

  const [orders, setOrders] = useState([]);

  const [msg, setmsg] = useState("");


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
          setAuthor(response.data.userDto.fullName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, config]); 

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          `http://localhost:9090/api/user/${userId}`,
          config
        );

        // Only update if the data has changed
        if (JSON.stringify(response.data) !== JSON.stringify(dataArray)) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, config]); 

      var options = {
        key: "rzp_test_FH7wPGkryts3kQ",
        key_secret: "IqdXxCQO9Hj86CC3VJquwGKM",
        amount: parseInt((dataArray.price+25)*100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + user.email,
        name: "Library",
        description: "for testing purpose",
        handler: function async(response) {        
          const paymentId = response.razorpay_payment_id
            handleserver(paymentId);
        },
  
        theme: {
          color: "#3399cc"
        }
      };

      const handleserver = async(paymentId)=>{
        try{
        const res =  await axios.post(`http://localhost:9090/api/orders/user/${userId}/book/${dataArray.bookId}`, {},config);
        console.log(res)
        setmsg(dataArray.bookTitle+" Book Purchased successfully "+paymentId);
        navigate(`/bookdetail/${dataArray.bookId}`)
      }catch(error){
        console.log("Error occured : ",error)
      }
 
      }

      const handlePayment = ()=>{
      var pay = new window.Razorpay(options);
      pay.open();
      console.log(pay)
      }
  


  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
        <div className="right-0 top-0 ">Status:{msg}</div>
      <div class="max-w-6xl max-lg:max-w-xl mx-auto font-[sans-serif]">
      <div class="text-center">
        <h2 class="text-gray-800 text-4xl font-bold mb-4">Pricing</h2>
        <p class="text-sm text-gray-800">This Money is Not Refundable</p>
      </div>
      {dataArray && user && (
      <div class=" flex justify-center items-center mt-12 max-sm:max-w-sm max-sm:mx-auto">
        <div class="bg-[#fdcd4c] rounded-lg p-6">
          <h3 class="text-gray-800 text-lg font-bold">Purchase Book</h3>
          <div class="mt-6 flex items-center">
            <h2 class="text-4xl border-b-4 border-gray-800 pb-2">Rs.{dataArray.price + 25} </h2>
            <div class="ml-4">
              <h6 class="text-gray-800 text-sm font-bold">{dataArray.bookTitle}</h6>
              {author && <p class="text-gray-800 text-xs mt-1">{author}</p>}
            </div>
          </div>

          <div class="mt-6">
            <p class="text-gray-800 text-xs"><span className="text-sm mx-2">Rs.25 Charge of Platform</span>This Book is Lifetime Accessible </p>
            <button type="button" class="w-full bg-gray-800 hover:bg-gray-700 text-white mt-8 px-5 py-2.5 text-sm outline-none rounded-lg" onClick={handlePayment}>Purchase</button>
          </div>

          <div class="mt-6">
            <ul class="space-y-4">
              <li class="flex items-center text-sm text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-4 fill-[#333" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                {user.fullName}
              </li>
              <li class="flex items-center text-sm text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-4 fill-[#333" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                {user.email}
              </li>
              <li class="flex items-center text-sm text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-4 fill-[#333" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                {user.phonenumber}
              </li>
              
              
            </ul>
          </div>
        </div>

       
      </div>)}
    </div>
    </div>
  )
}
