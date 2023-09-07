import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  
  // Add the handlesubmit code here
  function handleSubmit(e) {
    console.log('in handleSubmit()');

    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(), // remove extra whitespace
      completed: false,
    }

    // todo must be a non-empty string
    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo])
    } else {
      alert('Enter a valid task')
    }

    // clear text input in form
    setTodo("");
  }
  
  
  // Add the deleteToDo code here

  
  // Add the toggleComplete code here

  
  // Add the submitEdits code here

  
return(
    <div className ="App">
      <h1>Brian's To-do List!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type ="text" 
          align ="right"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task"
          value={todo}
        />
        <button type ="submit">Add Todo</button>
      </form>
      {todos.map((todo) => <div>{todo.text}</div>)}
    </div>
  );
};
export default App;
