import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">{props.title}</Link> {/* Use Link instead of <a> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li> {/* Use Link instead of <a> */}
          <li className="nav-item"><Link className="nav-link" to="/addtodo">AddTodo</Link></li> {/* Use Link instead of <a> */}
          <li className="nav-item"><Link className="nav-link" to="/todolist">TodoList</Link></li> {/* Use Link instead of <a> */}
          <li className="nav-item active"><Link className="nav-link" to="/about">About</Link></li> {/* Use Link instead of <a> */}
        </ul>
        <form className="form-inline ml-auto"> {/* Added ml-auto to move the form to the right */}
          <input className="form-control mr-sm-2 my-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Header;