import React from 'react';

import { createBrowserRouter } from "react-router-dom";

import {Home} from './pages/home';
import {Detail} from './pages/detail';
import {Notfound} from './pages/notfound';
import { Layout } from "./components/layout";
import { Exchange } from './pages/exchanges';


const router = createBrowserRouter([

  {
    element: <Layout/>,
    children: [
        {
            path: "/",
            element: <Home/>
        },

        {
            path:"/detail/:cripto",
            element:<Detail/>
        },
        {
            path:"/exchanges",
            element:<Exchange/>
        },
        {
            path:'*',
            element:<Notfound/>
        }


    ]
  }
])

export {router};

