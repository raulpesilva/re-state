import { Selector, useReStateSelector } from '@raulpesilva/re-state'
import { useCallback, useRef } from 'react'
import type { TodoList } from '../../states'
import { addTodo, TodoItemProps, TodoKey, toggleTodo } from '../../states'
import styles from './index.module.css'

type Store = { [TodoKey]: TodoList }

const todosSelector: Selector<Store, TodoList> = ({ todos }) => todos
const countFinishedTodoSelector: Selector<Store, number> = ({ todos }) =>
  todos ? todos.filter(todo => todo.finished).length : 0
const countTodosSelector: Selector<Store, number> = ({ todos }) => todos.length ?? 0

export const AdvancedUsage = () => {
  const taskRef = useRef<HTMLInputElement>(null)

  const handleAddTodo = useCallback(() => {
    if (taskRef.current?.value?.trim()) {
      addTodo({ task: taskRef.current.value })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapperInput}>
        <input ref={taskRef} type="text" className={styles.input} placeholder="Task name" />
        <button className={styles.button} onClick={handleAddTodo}>
          add
        </button>
      </div>
      <Total />
      <TotalFinished />
      <Todo />
    </div>
  )
}

const TotalFinished = () => {
  const totalFinished = useReStateSelector(countFinishedTodoSelector)
  return (
    <div className={styles.wrapperCount}>
      <span>
        Total Finished: <strong>{totalFinished}</strong>
      </span>
    </div>
  )
}

const Total = () => {
  const countTodo = useReStateSelector(countTodosSelector)
  return (
    <div className={styles.wrapperCount}>
      <span>
        Total: <strong>{countTodo}</strong>
      </span>
    </div>
  )
}

const Todo = () => {
  const todos = useReStateSelector(todosSelector)
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  )
}

const TodoItem = (props: TodoItemProps) => {
  const handleToggleFinished = useCallback(() => {
    toggleTodo(props.id)
  }, [props.id])
  return (
    <div className={styles.todoItem}>
      <p>{props.task}</p>
      <input type="checkbox" className={styles.checkbox} checked={props.finished} onChange={handleToggleFinished} />
    </div>
  )
}
