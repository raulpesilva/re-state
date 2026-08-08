import { createReState, createReStateDispatch, createReStateSelect } from '@raulpesilva/re-state';

const TODO = 'todo';
const todoInitialValue = [];

createReState(TODO, todoInitialValue);
export const useTodoSelect = createReStateSelect(TODO);
const dispatchTodo = createReStateDispatch(TODO);

export const resetTodo = () => dispatchTodo(todoInitialValue);
export const addTodo = ({ task, id = Date.now().toString() }) =>
  dispatchTodo((todos) => [...todos, { task, id, finished: false }]);
export const removeTodo = (id) => dispatchTodo((todos) => todos.filter((todo) => todo.id !== id));
export const toggleTodo = (id) =>
  dispatchTodo((todos) => todos.map((todo) => (todo.id === id ? { ...todo, finished: !todo.finished } : todo)));

export const todoCountSelector = (state) => state[TODO].length;
export const todoFinishedCountSelector = (state) => state[TODO].filter((todo) => todo.finished).length;
