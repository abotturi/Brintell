import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Outlet } from "react-router-dom";

function Template(props: any) {
  return (
    <>
        <Header />
        <div style={{minHeight: '100vh'}}>
          {
            props.children ?
              props.children
              : 
              <Outlet />
          }
        </div>
        <Footer />
    </>
  );
}

export default Template;
