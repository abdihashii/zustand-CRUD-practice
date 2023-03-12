import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string;
  title: string;
  isEditable?: boolean;
};

type TodoStateType = {
  todoItems: Todo[];
  addTodo: (todoTitle: string) => void;
  editTodo: (todoItem: Todo) => void;
  saveTodo: (todoTitle: string, todoItem: Todo) => void;
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

const setEditTodo = (set: any) => (todoItem: Todo) => {
  const newTodoItem = {
    ...todoItem,
    isEditable: true,
  };

  set((state: TodoStateType) => ({
    todoItems: state.todoItems.map((_todoItem) => {
      if (_todoItem.id === todoItem.id) {
        debugger
        return {
          ...newTodoItem,
        };
      } else {
        return _todoItem;
      }
    }),
  }));
};

const setSaveTodo = (set: any) => (todoTitle: string, todoItem: Todo) => {
  const updatedTodoItem = {
    ...todoItem,
    title: todoTitle,
    isEditable: false,
  };

  set((state: TodoStateType) => ({
    todoItems: state.todoItems.map((_todoItem) => {
      if (_todoItem.id === todoItem.id) {
        return {
          ...updatedTodoItem,
        };
      } else {
        return _todoItem;
      }
    }),
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
  editTodo: setEditTodo(set),
  saveTodo: setSaveTodo(set),
  removeTodo: setRemoveTodo(set),
}));
