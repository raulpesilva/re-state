import styles from './index.module.css'
import { addTodo, TodoItemProps, TodoList, toggleTodo } from '../../states'
import { useReStateSelector } from '@raulpesilva/re-state'
import { useRef } from 'react'

export const AdvancedUsage = () => {
  const taskRef = useRef<HTMLInputElement>(null)
  const todos = useReStateSelector<TodoList>(({ todos }) => todos ?? [])
  const totalFinished = useReStateSelector<TodoList>(({ todos }) =>
    todos ? todos.filter(todo => todo.finished).length : 0
  )

  const handleAddTodo = () => {
    if (taskRef.current?.value?.trim()) {
      addTodo({ task: taskRef.current.value })
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapperInput}>
        <input ref={taskRef} type="text" className={styles.input} placeholder="Task name" />
        <button className={styles.button} onClick={handleAddTodo}>
          add
        </button>
      </div>
      <div className={styles.wrapperCount}>
        <span>
          Total: <strong>{todos.length}</strong>
        </span>
        <span>
          Total Finished: <strong>{totalFinished}</strong>
        </span>
      </div>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  )
}

const TodoItem = (props: TodoItemProps) => {
  const handleToggleFinished = () => {
    toggleTodo(props.id)
  }
  return (
    <div className={styles.todoItem}>
      <p>{props.task}</p>
      <input type="checkbox" className={styles.checkbox} checked={props.finished} onChange={handleToggleFinished} />
    </div>
  )
}
