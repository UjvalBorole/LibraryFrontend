import React from 'react';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

// Book Card Component
export function BookCard(props) {
  const date = new Date(Number(props.bookAddedDate)); // Convert to a Date object
  let date1 = date.toString().substring(0, 24);
// console.log(props.userDto.userimage)
  return (
    <div className="max-w-[130px] h-[200px] mx-3 bg-white rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105">
      <div className="relative h-full">
        {/* Image */}
        <img
          src={`/${IMAGE_BASE_URL}/bookpic/${props.bookImageName}`}
          alt={props.bookTitle}
          className="w-full h-[65%] object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Premium Tag */}
        {Number(props.price) !== 0 && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-bold px-1 py-0.5 rounded">
            Premium
          </span>
        )}

        {/* Three Dot Button */}
        <button className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="5" cy="10" r="1.5" />
            <circle cx="15" cy="10" r="1.5" />
          </svg>
        </button>

        {/* Description Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-2 bg-white bg-opacity-70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-center">
            <h3 className="text-xs font-semibold">{props.bookTitle}</h3>
            <p className="mt-1 text-gray-600 text-[10px] truncate">
              {props.bookdescription}
            </p>
          </div>
        </div>

        {/* Person's Info */}
        <div className="absolute bottom-1 left-1 flex items-center">
          {props.userDto !== null ?<img
            src={`/${IMAGE_BASE_URL}/users/${props.userDto.userimage}`}
            alt="Author"
            className="w-6 h-6 rounded-full border-2 border-gray-300"
          />:""}
          <div className="ml-1">
            {props.userDto!==null ?(<span className="text-[10px] font-medium text-gray-950">{props.userDto.fullName}</span>):(<span className="text-[10px] text-xs font-medium text-gray-950">Title: {props.bookTitle}</span>)}
            <br />
            <span className="text-[9px] text-gray-400">{date1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
