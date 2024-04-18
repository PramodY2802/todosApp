import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      bottom: '150px', // Adjust margin from bottom as needed
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Light black with 80% opacity
      textAlign: 'center',
      padding: '20px 0'
    }}>
      <h1 style={{color:"white"}}>Welcome to Todos App</h1>
      <Link to="/addtodo">
        <button 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff', // Blue
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Add Todo
        </button>
      </Link>
    </div>
  );
}

export default Home;
