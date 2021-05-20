import { createReState, createReStateDispatch, createReStateSelect } from '@raulpesilva/re-state'

export type TodoItemProps = { task: string; id: string; finished: boolean }
export type TodoList = TodoItemProps[]

const TodoKey = 'todos'

export const useTodoState = createReState<TodoList>(TodoKey, [] as TodoList)
export const dispatchTodoState = createReStateDispatch<TodoList>(TodoKey)

export const addTodo = ({ task }: Omit<TodoItemProps, 'id' | 'finished'>) => {
  const newTodo = { id: `todo-${Math.floor(Math.random() * 1000000)}`, finished: false, task }
  dispatchTodoState(prevTodos => [newTodo, ...prevTodos])
  return newTodo
}

export const toggleTodo = (id: TodoItemProps['id']) => {
  dispatchTodoState(todos => todos.map(todo => (todo.id === id ? { ...todo, finished: !todo.finished } : todo)))
}

export const selectTodos = createReStateSelect<TodoList>(TodoKey)
export const getTodoById = (id: TodoItemProps['id']) => selectTodos().find(todo => todo.id === id)
