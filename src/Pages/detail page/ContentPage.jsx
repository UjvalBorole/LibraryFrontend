import React from 'react'
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;
export default function ContentPage(props) {
    console.log(`${IMAGE_BASE_URL}/content/image1/${props.image1}`);
  return (
    <div>
      <div className="container max-w-xl dark:bg-slate-200 py-3 mx-auto space-y-5 lg:px-2 lg:max-w-7xl">
                    {props.contentTitle !== null ?<div>
                        <h2 className="text-3xl font-bold text-center sm:text-5xl">{props.contentTitle}</h2>

                    </div>:""}
                    <div className="grid lg:gap-4 lg:grid-cols-2 lg:items-center my-5">
                        <div>
                            <div className="mt-4 space-y-12">
                                <div className="flex">

                                    <div className="ml-4">
                                        {/* <h4 className="text-lg font-medium leadi">Page No.{props.pageNo}</h4> */}
                                        <p className="mt-2">
                                            {props.bookContent}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div aria-hidden="true" className="mt-10 lg:mt-0 py-3">

                            {props.image1 !== null?<img
                                width="400"
                                height="400"
                                

                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image1}`}
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}

                            {props.image2 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image2}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            {props.image3 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image3}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            {props.image4 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image4}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            {props.image5 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image5}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            {props.image6 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image6}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            {props.image7 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image7}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            {props.image8 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image8}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}

                                {props.image9 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image9}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Fea
                                tures Image"
                            />:""}
                            {props.image10 !== null?<img
                                width="400"
                                height="400"
                                src={`/${IMAGE_BASE_URL}/content/image1/${props.image10}`}

                                // src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                className="my-5 mx-auto rounded-lg shadow-lg dark-bg-gray-500"
                                style={{ color: "transparent" }}
                                alt="New Features Image"
                            />:""}
                            
                        </div>
                        <h4 className="flex justify-end p-3 text-lg font-medium leadi">Page No.{props.pageNo}</h4>
                        <h4 className="flex items-start justify-start p-3 text-sm font-medium ">Book Title:{props.book.bookTitle}</h4>
                        {/* <h4 className="flex justify-end p-3 text-lg font-medium leadi">Page No.{props.pageNo}</h4> */}

                    </div>
                </div>
    </div>
  )
}
