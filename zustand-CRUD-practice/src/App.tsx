import { useTodoStore } from "./hooks/useTodoStore";

const TodoList = () => {
  const todoItems = useTodoStore((state) => state.todoItems);

  return (
    <div>
      {todoItems.map(todoItem) => {
        <div>
          {todoItems.title}
        </div>
      }}
    </div>
  )
}

function App() {

  return (
    <main>
      <section>Hello, Vite</section>
    </main>
  );
}

export default App;
