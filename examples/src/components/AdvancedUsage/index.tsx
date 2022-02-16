import { useReStateSelector } from '@raulpesilva/re-state'
import { memo, useCallback, useRef } from 'react'
import {
  addTodo,
  removeTodo,
  resetTodo,
  Todo,
  todoCountSelector,
  todoFinishedCountSelector,
  toggleTodo,
  useTodoSelect,
} from '../../states'
import styles from './index.module.css'

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
        <button className={styles.button_red} onClick={resetTodo}>
          Reset
        </button>
      </div>
      <Total />
      <TotalFinished />
      <TodoList />
    </div>
  )
}

const TotalFinished = () => {
  const totalFinished = useReStateSelector(todoFinishedCountSelector)
  return (
    <div className={styles.wrapperCount}>
      <span>
        Total Finished: <strong>{totalFinished}</strong>
      </span>
    </div>
  )
}

const Total = () => {
  const countTodo = useReStateSelector(todoCountSelector)
  return (
    <div className={styles.wrapperCount}>
      <span>
        Total: <strong>{countTodo}</strong>
      </span>
    </div>
  )
}

const TodoList = () => {
  const todos = useTodoSelect()
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  )
}

const TodoItem = memo((props: Todo) => {
  const handleToggleFinished = useCallback(() => {
    toggleTodo(props.id)
  }, [props.id])
  return (
    <div className={styles.todoItem}>
      <button className={styles.button_red} onClick={() => removeTodo(props.id)}>
        Remove
      </button>
      <p className={styles.todoText}>{props.task}</p>
      <input type="checkbox" className={styles.checkbox} checked={props.finished} onChange={handleToggleFinished} />
    </div>
  )
})
