import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  // edit state
  const [todoEditId, setTodoEditId] = React.useState(null);
  const [todoEditText, setTodoEditText] = React.useState("");

  // useEffect hooks to save todo list into local storage
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    if([todos].length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
        // modify tab title to include # of items in To-Do list
        document.title = `Todo App (${todos.length})`;
    }
  }, [todos]);
  
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
  function deleteTodo(id) {
    console.log('in deleteTodo, id:', id);

    setTodos(todos.filter((todo) => todo.id !== id))
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    console.log('in toggleComplete, id:', id);

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // toggle "completed" attribute
        todo.completed = !todo.completed;
      }
      return todo;
    })

    setTodos(updatedTodos)
  }

  
  // Add the submitEdits code here
  function submitEdits(id){
    console.log('in submitEdits, id:', id);

    const newText = todoEditText.trim(); // remove extra whitespace

    // todo must be a non-empty string
    if (newText.length <= 0) {
      alert('Enter a valid value')
    } else {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.text = todoEditText;
        }
        return todo;
      })

      setTodos(updatedTodos)

      // clear edit state
      setTodoEditId(null);
      setTodoEditText("");
    }

  }

  
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
      <div id="todo-list">
        {todos.map((todo) => 
          <div className="todo">
            <div className="todo-text">
              <input type="checkbox" id="completed" onChange={() => { toggleComplete(todo.id) }}></input>
              {todo.id === todoEditId ? 
                <div>
                  <input
                    type="text"
                    value={todoEditText}
                    onChange={(e) => setTodoEditText(e.target.value )}
                  />
                </div>
                :
                <div>{todo.text}</div>
              }
            </div>
            <div className="todo-actions">
              <button onClick={() => { deleteTodo(todo.id) }}>
                Delete
              </button>
              { // display "Edit" button, or "Save Edits" button when in edit mode
              todo.id === todoEditId ? 
                <button onClick={() => { submitEdits(todo.id) }}>
                  Save Edits
                </button>
                :
                <button 
                  onClick={() => { 
                    setTodoEditId(todo.id)
                    setTodoEditText(todo.text)
                  }}>
                  Edit
                </button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
