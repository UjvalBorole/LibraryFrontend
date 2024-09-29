import Reactm,{useState,useEffect,useContext} from 'react'
import { BookCard } from './Bookcard2';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function RecommendedBook() {
 
  const [isloading, setIsLoading] = useState(true);

  const [dataArray, setDataArray] = useState([0]);
  const token = localStorage.getItem('authToken');
  const userId = parseInt(localStorage.getItem('userId'), 10);
 
  // console.log(token)
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

console.log("userID",userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/views/user/${userId}`, config); // Example URL
        setDataArray(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(dataArray)

const reversedContent = dataArray ? [...dataArray].reverse() : [];
console.log("RecommendedBook",reversedContent)
  return (
    <div>
    <section className="py-6 bg-gray-50 my-3">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Recommended Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mx-auto">
          {isloading ? (
              <p>Loading...</p>
            ) :  reversedContent && reversedContent.length > 0 ? (
              reversedContent.map((item) =>(
                
                  <Link to={`/bookdetail/${item.book.bookId}`}>
                  <BookCard key={item.book.bookId} {...item.book} />
                  </Link>
                 
                  
                 )
              )
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </section> 
    </div>
  )
}
