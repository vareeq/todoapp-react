import { useState } from 'react'

type TodoItem = {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const onFormSubmit = (e: any) => {
    e.preventDefault()
    const newTodo = {
      id: todos.length + 1,
      text: e.target[0].value,
      completed: false,
    }
    setTodos([...todos, newTodo])
    e.target[0].value = ''
  }

  const onCheckClick = (id: any) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } 
        : todo
    ));
  }

  const onDeleteClick = (id: any) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>Todo List</h1>
      <div>
      <form onSubmit={onFormSubmit}>
          <input type="text" size={30} placeholder="Add New Todo" /><button type="submit">Add</button>
      </form>
      </div>
      <div>
        {todos.map(todo => {
          return <TodoItemComponent key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} onCheckClick={onCheckClick} onDeleteClick={onDeleteClick} />
        })}
      </div>
    </>
  )
}

function TodoItemComponent(props: any) {
  return (
    <li>
      {props.completed ? <s>{props.text}</s> : props.text} 
    | <a onClick={() => { props.onCheckClick(props.id)}}> ✔ </a> 
    | <a onClick={() => { props.onDeleteClick(props.id)}}> ❌ </a>
    </li>
  )
}

export default App
