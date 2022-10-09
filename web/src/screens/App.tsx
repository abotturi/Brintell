import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
} from "react-router-dom";

// SCREENS IMPORTS
  import Template from './template/index'
  import Error from './error/index'

  import Home from './home/index'
  import Registration from './registration/index'
  import List from './list/index'
  import Map from './map/index'  
// ---------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: <Template><Error/></Template >,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/map",
        element: <Map />,
      },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
