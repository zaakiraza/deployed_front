import React from 'react';
import { Outlet } from 'react-router-dom'; 


const WebLayout = () => {
  return (
  
      <div className="web-layout" style={{ height: '100%', overflowY: 'auto' }}>

      {/* <header>
       <h1>Web Application</h1>
      </header> */}
      <main>
        <main style={{ height: '100%', overflowY: 'auto' }}></main>
        <Outlet /> {/* This is where the child routes will be rendered */}
      </main>
      {/* <footer>
        <p>Web Footer</p>
      </footer> */}
    </div>
  );
};

export default WebLayout;
