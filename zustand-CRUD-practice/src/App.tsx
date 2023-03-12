import { useState } from "react";
import { useTodoStore } from "./hooks/useTodoStore";

const AddTodoSection = () => {
  const addTodo = useTodoStore((state) => state.addTodo)
  const [todoItem, setTodoItem] = useState('');

  return (
    <div>
      <input onChange={(e) => setTodoItem(e.target.value)} value={todoItem} type="text" />

      <button onClick={() => addTodo(todoItem)}>Add todo</button>
    </div>
  )
}

function App() {
  const todoItems = useTodoStore((state) => state.todoItems);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <main>
      <section>Hello, Vite</section>

      <section>
        <AddTodoSection />
      </section>

      <section>
        {todoItems.map((todoItem) => {
          return <p>{todoItem.title} <span onClick={() => removeTodo(todoItem)}>Remove TODO</span></p>
        })}
      </section>
    </main>
  );
}

export default App;
