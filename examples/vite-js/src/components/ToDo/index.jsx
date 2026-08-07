import { useReStateSelector } from '@raulpesilva/re-state';
import { memo, useCallback, useRef } from 'react';
import {
  addTodo,
  removeTodo,
  resetTodo,
  todoCountSelector,
  todoFinishedCountSelector,
  toggleTodo,
  useTodoSelect,
} from '../../states';
import styles from './index.module.css';

export const ToDo = () => {
  const taskRef = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const input = taskRef.current;
    const task = input?.value.trim();
    if (!task) return;

    addTodo({ task });
    input.value = '';
  }, []);

  return (
    <div className={styles.todo}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input ref={taskRef} className={styles.input} type="text" placeholder="Add a task" aria-label="Task name" />
        <button type="submit" className={styles.button}>
          Add
        </button>
        <button type="button" className={styles.buttonDanger} onClick={resetTodo}>
          Reset
        </button>
      </form>
      <TodoSummary />
      <TodoList />
    </div>
  );
};

const TodoSummary = () => {
  const total = useReStateSelector(todoCountSelector);
  const finished = useReStateSelector(todoFinishedCountSelector);

  return (
    <div className={styles.summary}>
      <span>
        Total <strong>{total}</strong>
      </span>
      <span>
        Finished <strong>{finished}</strong>
      </span>
    </div>
  );
};

const TodoList = () => {
  const todos = useTodoSelect();

  if (!todos.length) {
    return <p className={styles.empty}>Your list is empty. Add a task to see re-state in action.</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

const TodoItem = memo(({ id, task, finished }) => {
  const handleRemove = useCallback(() => removeTodo(id), [id]);
  const handleToggle = useCallback(() => toggleTodo(id), [id]);

  return (
    <li className={styles.item}>
      <button type="button" className={styles.remove} onClick={handleRemove}>
        Remove
      </button>
      <p className={`${styles.task} ${finished ? styles.completed : ''}`}>{task}</p>
      <label className={styles.checkbox}>
        <input type="checkbox" checked={finished} onChange={handleToggle} aria-label={`Mark ${task} as complete`} />
        <span aria-hidden="true" />
      </label>
    </li>
  );
});
