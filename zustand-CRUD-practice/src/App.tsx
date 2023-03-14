import { FormEvent, useRef, useState } from 'react';
import { useTodoStore } from './hooks/useTodoStore';
import type { Todo } from './types/todoTypes';

const AddTodoSection = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const inputRef = useRef<any>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addTodo(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2">
      <input
        className="border-2 border-gray-300 p-2 rounded-md"
        type="text"
        ref={inputRef}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded-md border-2 border-blue-500"
        type="submit"
      >
        Add todo
      </button>
    </form>
  );
};

function App() {
  const state = useTodoStore((state) => state);
  const editInputRef = useRef<any>();

  const handleSave = (todoItem: Todo) => {
    state.saveTodo(editInputRef.current.value, todoItem);
  };

  // const [todoTitle, setTodoTitle] = useState('');

  return (
    <main className="mt-32 flex flex-col w-6/12 mx-auto gap-4">
      <h1 className="text-4xl font-bold mb-4">zustand CRUD practice</h1>

      <section>
        <AddTodoSection />
      </section>

      <div className="flex flex-row gap-10">
        <section>
          <h1 className="text-3xl font-semibold">To Do</h1>
          <hr className="border-2 border-black mt-2 mb-6" />
          {state.todoItems.map((todoItem, index) => {
            return (
              <div
                key={todoItem.id}
                className="flex flex-row items-center gap-4 mb-4 last:mb-0"
              >
                {!todoItem.isEditable ? (
                  <p>{todoItem.title}</p>
                ) : (
                  <input
                    className="border-2 border-gray-300 p-2 rounded-md"
                    // onChange={(e) => setTodoTitle(e.target.value)}
                    defaultValue={todoItem.title}
                    type="text"
                    ref={editInputRef}
                  />
                )}

                {!todoItem.isEditable ? (
                  <span
                    className="bg-yellow-500 text-white p-2 rounded-md cursor-pointer"
                    onClick={() => state.editTodo(todoItem)}
                  >
                    edit
                  </span>
                ) : (
                  <span
                    className="bg-green-500 text-white p-2 rounded-md cursor-pointer"
                    onClick={() => handleSave(todoItem)}
                  >
                    save
                  </span>
                )}

                <span
                  className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                  onClick={() => state.removeTodo(todoItem)}
                >
                  remove
                </span>

                <input
                  type="checkbox"
                  onClick={() => state.finishTodo(todoItem, index)}
                />
              </div>
            );
          })}
        </section>

        <section>
          <h1 className="text-3xl font-semibold">Finished</h1>
          <hr className="border-2 border-black mt-2 mb-6" />
          {state.finishedItems.map((todoItem, index) => {
            return (
              <div key={todoItem.id}>
                <p className="line-through">{todoItem.title}</p>
                <input
                  type="checkbox"
                  onClick={() => state.unfinishTodo(todoItem, index)}
                />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
