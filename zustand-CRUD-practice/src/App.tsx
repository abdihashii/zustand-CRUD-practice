import { useState } from "react";
import { useTodoStore } from "./hooks/useTodoStore";

const AddTodoSection = () => {
  const addTodo = useTodoStore((state) => state.addTodo)
  const [todoItem, setTodoItem] = useState('');

  return (
    <div className="flex flex-row gap-2">
      <input 
        className="border-2 border-gray-300 p-2 rounded-md"
        onChange={(e) => setTodoItem(e.target.value)} 
        value={todoItem} 
        type="text" 
      />

      <button 
        className="bg-blue-500 text-white p-2 rounded-md border-2 border-blue-500"
        onClick={() => addTodo(todoItem)}
      >
        Add todo
      </button>
    </div>
  )
}

function App() {
  const todoItems = useTodoStore((state) => state.todoItems);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const saveTodo = useTodoStore((state) => state.saveTodo);

  const [todoTitle, setTodoTitle] = useState('');

  return (
    <main className="mt-32 flex flex-col w-6/12 mx-auto gap-4">
      <h1 className="text-4xl font-bold mb-4">zustand CRUD practice</h1>

      <section>
        <AddTodoSection />
      </section>

      <section>
        {todoItems.map((todoItem) => {
          return (
            <div key={todoItem.id} className="flex flex-row items-center gap-4 mb-4 last:mb-0">
              {!todoItem.isEditable ? <p>{todoItem.title}</p> : (
                <input
                  className="border-2 border-gray-300 p-2 rounded-md"
                  onChange={(e) => setTodoTitle(e.target.value)}
                  defaultValue={todoItem.title}
                  type="text"
                />
              )}
              
              {!todoItem.isEditable ? (
                <span 
                className="bg-yellow-500 text-white p-2 rounded-md cursor-pointer"
                onClick={() => editTodo(todoItem)}>
                  edit
                </span>
              ) : (
                <span 
                className="bg-green-500 text-white p-2 rounded-md cursor-pointer"
                onClick={() => saveTodo(todoTitle, todoItem)}>
                  save
                </span>
              )}

              <span 
                className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                onClick={() => removeTodo(todoItem)}>
                  remove
              </span>
            </div>
          )
        })}
      </section>
    </main>
  );
}

export default App;
