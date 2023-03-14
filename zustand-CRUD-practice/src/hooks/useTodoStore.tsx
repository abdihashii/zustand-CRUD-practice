import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoStateType } from '../types/todoTypes';

const initialTodoItems: Todo[] = [
  {
    id: '1',
    title: 'first Todo',
  },
];

export const useTodoStore = create<TodoStateType>((set) => ({
  todoItems: initialTodoItems,
  finishedItems: [],
  addTodo: (todoTitle) =>
    set((state) => ({
      ...state,
      todoItems: [
        ...state.todoItems,
        {
          id: uuidv4(),
          title: todoTitle,
        },
      ],
    })),
  // editTodo: setEditTodo(set),
  editTodo: (todoItem) => {
    set((state) => {
      const newTodoItem = {
        ...todoItem,
        isEditable: true,
      };

      const newTodoItems = state.todoItems.map((_todoItem) => {
        if (_todoItem.id === todoItem.id) {
          return {
            ...newTodoItem,
          };
        } else {
          return _todoItem;
        }
      });

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
  // saveTodo: setSaveTodo(set),
  saveTodo: (todoItemTitle, todoItem) => {
    set((state) => {
      const newTodoItem = {
        ...todoItem,
        title: todoItemTitle,
        isEditable: false,
      };

      const newTodoItems = state.todoItems.map((_todoItem) => {
        if (_todoItem.id === todoItem.id) {
          return {
            ...newTodoItem,
          };
        } else {
          return _todoItem;
        }
      });

      return {
        ...state,
        todoItems: newTodoItems,
      };
    });
  },
  removeTodo: (todoItem) =>
    set((state) => ({
      ...state,
      todoItems: state.todoItems.filter(
        (_todoItem) => _todoItem.id !== todoItem.id,
      ),
    })),
  finishTodo: (todoItem, index) =>
    set((state) => {
      const newTodoItems = [...state.todoItems];

      newTodoItems.splice(index, 1);

      const newFinishedItems = [...state.finishedItems, todoItem];

      return {
        ...state,
        todoItems: newTodoItems,
        finishedItems: newFinishedItems,
      };
    }),
}));

// const setEditTodo = (set: any) => (todoItem: Todo) => {
//   const newTodoItem = {
//     ...todoItem,
//     isEditable: true,
//   };

//   set((state: TodoStateType) => ({
//     todoItems: state.todoItems.map((_todoItem) => {
//       if (_todoItem.id === todoItem.id) {
//         return {
//           ...newTodoItem,
//         };
//       } else {
//         return _todoItem;
//       }
//     }),
//   }));
// };

// const setSaveTodo = (set: any) => (todoTitle: string, todoItem: Todo) => {
//   const updatedTodoItem = {
//     ...todoItem,
//     title: todoTitle,
//     isEditable: false,
//   };

//   set((state: TodoStateType) => ({
//     todoItems: state.todoItems.map((_todoItem) => {
//       if (_todoItem.id === todoItem.id) {
//         return {
//           ...updatedTodoItem,
//         };
//       } else {
//         return _todoItem;
//       }
//     }),
//   }));
// };

// const removeTodo = (todoItems: Todo[], todoItem: Todo) =>
//   todoItems.filter((_todoItem) => _todoItem.id !== todoItem.id);
