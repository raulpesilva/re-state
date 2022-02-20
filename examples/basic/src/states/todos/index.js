import { createReState, createReStateSelect, createReStateDispatch, createGetReState } from '@raulpesilva/re-state';

export const TODO = 'todo';

export const todoInitialValue = [];

// Hooks
export const useTodo = createReState(TODO, todoInitialValue);
export const useTodoSelect = createReStateSelect(TODO);

// Actions
export const dispatchTodo = createReStateDispatch(TODO);
export const getTodo = createGetReState(TODO);

export const resetTodo = () => dispatchTodo(todoInitialValue);
export const getTodoById = (id) => getTodo().find((todo) => todo.id === id);
export const addTodo = ({ task, id }) =>
  dispatchTodo((prev) => [...prev, { task, id: id ?? Date.now().toString(), finished: false }]);
export const removeTodo = (id) => dispatchTodo((prev) => prev.filter((todo) => todo.id !== id));
export const toggleTodo = (id) =>
  dispatchTodo((state) => state.map((todo) => (todo.id === id ? { ...todo, finished: !todo.finished } : todo)));

// Selectors
export const todoCountSelector = (state) => state[TODO].length;
export const todoFinishedCountSelector = (state) => state[TODO].filter((todo) => todo.finished).length;
