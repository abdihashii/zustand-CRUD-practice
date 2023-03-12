import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  title: string;
};

type TodoStateType = {
  todoItems: Todo[];
  addTodo: (todoTitle: string) => void;
  removeTodo: (todoItem: Todo) => void;
};

const setAddTodo = (set: any) => (todoTitle: string) => {
  const newTodoItem = {
    id: uuidv4(),
    title: todoTitle,
  };

  set((state: TodoStateType) => ({
    todoItems: [...state.todoItems, newTodoItem],
  }));
};

const setRemoveTodo = (set: any) => (todoItem: Todo) => {
  set((state: TodoStateType) => ({
    todoItems: state.todoItems.filter(
      (_todoItem) => _todoItem.id !== todoItem.id,
    ),
  }));
};

const initialTodoItems: Todo[] = [
  {
    id: '1',
    title: 'first Todo',
  },
];

export const useTodoStore = create<TodoStateType>((set) => ({
  todoItems: initialTodoItems,
  addTodo: setAddTodo(set),
  removeTodo: setRemoveTodo(set),
}));
