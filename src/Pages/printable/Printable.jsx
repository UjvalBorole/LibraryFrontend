import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import axios from "axios";
const RAZORPAY_ID_KEY = import.meta.env.RAZORPAY_ID_KEY;
const RAZORPAY_SECRET_KEY = import.meta.env.RAZORPAY_SECRET_KEY;

export default function Printable() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState({});
  const [user, setUser] = useState({});
  const [author, setAuthor] = useState("");
  const [cod,setCod] = useState("cod");
  const [orders, setOrders] = useState([]);
  const [msg, setmsg] = useState("");
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");
  const [stateContry,setStateContry] = useState("");
  const [pincode,setPincode] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  


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
        amount: parseInt((dataArray.price+500)*100),
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

      const handlesave = async()=>{
        const data= {
            "address":address,
            "city":city,
            "stateContry":stateContry,
            "pincode":pincode,
            "phoneNumber":phoneNumber,
            "paid":false,
        }
        const res1 =  await axios.post(`http://localhost:9090/api/printable/user/${userId}/book/${dataArray.bookId}`, data,config);
            console.log(res1);
        navigate(`/bookdetail/${dataArray.bookId}`)
      }
        const handleserver = async(paymentId)=>{
            // event.preventDefault();
        const data= {
            "address":address,
            "city":city,
            "stateContry":stateContry,
            "pincode":pincode,
            "phoneNumber":phoneNumber,
            "paid":true,
        }
        try{
        const res =  await axios.post(`http://localhost:9090/api/orders/user/${userId}/book/${dataArray.bookId}`, {},config);
        console.log(res)
        setmsg(dataArray.bookTitle+" Book Purchased successfully "+paymentId);
        const res1 =  await axios.post(`http://localhost:9090/api/printable/user/${userId}/book/${dataArray.bookId}`, data,config);
            console.log(res1);
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
     { dataArray && <div class="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
      <div class="bg-purple-100 p-8 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
        <h2 class="text-3xl font-extrabold text-gray-800 text-center">Print</h2>

        <div class="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
          <div class="lg:col-span-2">
            <h3 class="text-lg font-bold text-gray-800">Choose your payment method</h3>
            <p className="text-[13px]">All Fields are Compulsary</p>
            <div class="grid gap-4 sm:grid-cols-2 mt-4">
              <div class="flex items-center">
                <input type="radio" class="w-5 h-5 cursor-pointer" id="cod" checked={cod === 'cod'} onChange={(e)=>setCod(e.target.id)}/>
                <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                    <span className="text-sm"><h1 className="text-xl">COD</h1>Cash On Delivery</span>
                </label>
              </div>

              <div class="flex items-center">
                <input type="radio" class="w-5 h-5 cursor-pointer" id="razor" checked={cod === 'razor'} onChange={(e)=>setCod(e.target.id)}/>
                <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                  <img src="https://readymadeui.com/images/paypal.webp" class="w-20" alt="paypalCard" />
                </label>
              </div>
            </div>

            <form class="mt-8">
              <div class="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Enter Your Address" value={address} onChange={(e)=>setAddress(e.target.value)}
                    class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="Enter your city" value={city} onChange={(e)=>setCity(e.target.value)}
                    class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="Enter your city pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)}
                    class="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="Enter your state State / Country" value={stateContry} onChange={(e)=>setStateContry(e.target.value)}
                    class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="Enter your PhoneNumber" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
                    class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                </div>
              </div>

              <div class="flex flex-wrap gap-4 mt-8">

                  {cod === 'razor'?<button type="button" onClick={handlePayment}
                    class="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Pay</button>:
                    <button type="button" onClick={handlesave}
                    class="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>}                
                    <button type="button" onClick={()=>(navigate(`/bookdetail/${dataArray.bookId}`))}
                  class="px-7 py-3.5 text-sm tracking-wide bg-white hover:bg-gray-50 text-gray-800 rounded-md">Cancel</button>
              </div>
            </form>
          </div>

          <div class="bg-white p-6 rounded-md max-lg:-order-1">
            <h3 class="text-lg font-bold text-gray-800">Summary</h3>
            <ul class="text-gray-800 mt-6 space-y-3">
              <li class="flex flex-wrap gap-4 text-sm">Sub total <span class="ml-auto font-bold">Rs.{dataArray.price}</span></li>
              <li class="flex flex-wrap gap-4 text-sm">Discount (20%) <span class="ml-auto font-bold">Rs.500</span></li>
              <hr />
              <li class="flex flex-wrap gap-4 text-base font-bold">Total <span class="ml-auto">Rs.{dataArray.price + 500}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>}
    </div>
  )
}
