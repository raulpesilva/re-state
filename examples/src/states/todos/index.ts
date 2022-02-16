import {
  createReState,
  createReStateSelect,
  createReStateDispatch,
  createGetReState,
  Selector,
} from '@raulpesilva/re-state'

export const TODO = 'todo'

export type Todo = { task: string; id: string; finished: boolean }
export type TodoList = Todo[]
export type TodoSelector = Selector<{ [TODO]: TodoList }, number>

export const todoInitialValue = [] as TodoList

// Hooks
export const useTodo = createReState<TodoList>(TODO, todoInitialValue)
export const useTodoSelect = createReStateSelect<TodoList>(TODO)

// Actions
export const dispatchTodo = createReStateDispatch<TodoList>(TODO)
export const getTodo = createGetReState<TodoList>(TODO)

export const resetTodo = () => dispatchTodo(todoInitialValue)
export const getTodoById = (id: string) => getTodo().find(todo => todo.id === id)
export const addTodo = ({ task, id }: { task: Todo['task']; id?: Todo['id'] }) =>
  dispatchTodo(prev => [...prev, { task, id: id ?? Date.now().toString(), finished: false }])
export const removeTodo = (id: string) => dispatchTodo(prev => prev.filter(todo => todo.id !== id))
export const toggleTodo = (id: Todo['id']) =>
  dispatchTodo(state => state.map(todo => (todo.id === id ? { ...todo, finished: !todo.finished } : todo)))

// Selectors
export const todoCountSelector: TodoSelector = state => state[TODO].length
export const todoFinishedCountSelector: TodoSelector = state => state[TODO].filter(todo => todo.finished).length
