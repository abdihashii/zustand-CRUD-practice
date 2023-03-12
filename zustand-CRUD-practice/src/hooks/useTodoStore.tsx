import { create } from 'zustand';

type Todo = {
  id: string;
  title: string;
};

type TodoStateType = {
  todoItems: Todo[];
  addTodo: (todoItem: Todo) => void;
  removeTodo: (todoItem: Todo) => void;
};

const setAddTodo = (set) => (todoItem) => {
  set((state) => ({
    todoItems: [...state.todoItems, todoItem],
  }));
};

const setRemoveTodo = (set) => (todoItem) => {
  set((state) => ({
    todoItems: state.todoItems.filter(
      (_todoItem) => _todoItem.id !== todoItem.id,
    ),
  }));
};

export const useTodoStore = create<TodoStateType>((set) => ({
  todoItems: [
    {
      id: '1',
      title: 'firstTodo',
    },
  ],
  addTodo: setAddTodo(set),
  removeTodo: setRemoveTodo(set),
}));
