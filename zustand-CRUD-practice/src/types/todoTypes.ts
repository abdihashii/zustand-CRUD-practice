export type Todo = {
  id: string;
  title: string;
  isEditable?: boolean;
};

export type TodoStateType = {
  todoItems: Todo[];
  finishedItems: Todo[];
  addTodo: (todoTitle: string) => void;
  editTodo: (todoItem: Todo) => void;
  saveTodo: (todoTitle: string, todoItem: Todo) => void;
  removeTodo: (todoItem: Todo) => void;
  finishTodo: (todoItem: Todo, index: number) => void;
};
