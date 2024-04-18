import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
// import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import  About  from "./MyComponents/About";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./MyComponents/Home";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTodo = (title, desc, startDate, endDate, startTime, endTime, selectedSong) => {
    console.log("I am adding this todo", title, desc, startDate, endDate, startTime, endTime, selectedSong);
    
    // Determine the sno for the new todo
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    
    // Create a new todo object with all the parameters
    const newTodo = {
      sno: sno,
      title: title,
      desc: desc,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      selectedSong: selectedSong  // Include selected song in the todo object
    };
    
    // Update the todos state with the new todo
    setTodos([...todos, newTodo]);
    console.log(newTodo);
};



  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <Header title="Todo`sApp" searchBar={false} />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/addtodo" element={<AddTodo addTodo={addTodo} />} />
        <Route
          path="/todolist"
          element={<Todos todos={todos} onDelete={onDelete} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
