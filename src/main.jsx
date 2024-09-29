import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Context } from "./context/Context.jsx";
import { Login } from "./Pages/Auth/Login.jsx";
import { Ragister } from "./Pages/Auth/Ragister.jsx";
import Home from './Pages/Home/Home.jsx';
import Content from './Pages/detail page/Content.jsx';
import { Provider } from 'react-redux';
import store from '../src/redux_store/store.js'
import AllBooks from './Pages/AllBooks/AllBooks.jsx';
import BookDetail from './Pages/detail page/BookDetail.jsx';
import Purchase from './Pages/Razorpay/Purchase.jsx';
import Printable from './Pages/printable/Printable.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  }
  , {
    path: "/ragister",
    element: <Ragister />
  },
  
{
    path: "",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/content/:id",
        element: <Content />
      },
      {
        path: "/allbook/:id/:name",
        element: <AllBooks />
      },
      {
        path: "/bookdetail/:id",
        element: <BookDetail />
      },
      {
        path: "/purchase/:id",
        element: <Purchase />
      },{
        path: "/print/:id",
        element: <Printable />
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Context>
      <RouterProvider router={router} basename="/login"/>
    </Context>
    </Provider>
  </StrictMode>
)
