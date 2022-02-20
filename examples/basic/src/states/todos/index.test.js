import { useReStateSelector } from '@raulpesilva/re-state';
import { act, renderHook } from '@testing-library/react-hooks';
import {
  addTodo,
  dispatchTodo,
  getTodoById,
  removeTodo,
  resetTodo,
  todoCountSelector,
  todoFinishedCountSelector,
  todoInitialValue,
  toggleTodo,
  useTodo,
  useTodoSelect,
} from '.';

const EXAMPLE_TODO = { task: 'Example task', id: '1', finished: false };
const TODO_LIST = [EXAMPLE_TODO];

afterEach(() => {
  resetTodo();
});

test('should initiate with initial state', () => {
  const { result } = renderHook(() => useTodo());
  const [state] = result.current;
  expect(state).toEqual(todoInitialValue);
});

test('should update hook useUserState', () => {
  const { result } = renderHook(() => useTodo());
  act(() => result.current[1](TODO_LIST));
  expect(result.current[0]).toEqual(TODO_LIST);
});

test('should update state with dispatch', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => dispatchTodo(TODO_LIST));
  expect(result.current).toEqual(TODO_LIST);
});

test('should reset hook useUserState with reset action', () => {
  const { result } = renderHook(() => useTodo());
  act(() => result.current[1](TODO_LIST));
  act(() => resetTodo());
  expect(result.current[0]).toEqual(todoInitialValue);
});

test('should add an ToDo', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task' }));
  expect(result.current).toHaveLength(1);
});

test('should add some ToDos', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task' }));
  act(() => addTodo({ task: 'Example task' }));
  act(() => addTodo({ task: 'Example task' }));
  expect(result.current).toHaveLength(3);
});

test('should remove an ToDo', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  act(() => addTodo({ task: 'Example task', id: '3' }));
  act(() => removeTodo('1'));
  expect(result.current).toHaveLength(2);
  expect(result.current).toContainEqual({ task: 'Example task', id: '2', finished: false });
});

test('should toggle an ToDo', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  act(() => addTodo({ task: 'Example task', id: '3' }));
  act(() => toggleTodo('1'));
  expect(result.current).toHaveLength(3);
  expect(result.current).toContainEqual({ task: 'Example task', id: '1', finished: true });
});

test('should toggle some ToDos', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  act(() => addTodo({ task: 'Example task', id: '3' }));
  act(() => toggleTodo('1'));
  act(() => toggleTodo('2'));
  act(() => toggleTodo('3'));
  expect(result.current).toHaveLength(3);
  expect(result.current).toContainEqual({ task: 'Example task', id: '1', finished: true });
  expect(result.current).toContainEqual({ task: 'Example task', id: '2', finished: true });
  expect(result.current).toContainEqual({ task: 'Example task', id: '3', finished: true });
});

test('should update selector with todoCountSelector', () => {
  const { result } = renderHook(() => useReStateSelector(todoCountSelector));
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  expect(result.current).toEqual(2);
  act(() => addTodo({ task: 'Example task', id: '3' }));
  expect(result.current).toEqual(3);
  act(() => removeTodo('1'));
  expect(result.current).toEqual(2);
});

test('should update selector with todoFinishedCountSelector', () => {
  const { result } = renderHook(() => useReStateSelector(todoFinishedCountSelector));
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  act(() => addTodo({ task: 'Example task', id: '3' }));
  expect(result.current).toEqual(0);
  act(() => toggleTodo('1'));
  expect(result.current).toEqual(1);
  act(() => removeTodo('1'));
  expect(result.current).toEqual(0);
});

test('should get an ToDo by id', () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  act(() => addTodo({ task: 'Example task', id: '3' }));
  expect(result.current).toHaveLength(3);
  expect(EXAMPLE_TODO).toEqual(getTodoById('1'));
  expect(result.current).toContainEqual(getTodoById('1'));
});

test("should return undefined when getting a to-do by id that doesn't exist", () => {
  const { result } = renderHook(() => useTodoSelect());
  act(() => addTodo({ task: 'Example task', id: '1' }));
  act(() => addTodo({ task: 'Example task', id: '2' }));
  act(() => addTodo({ task: 'Example task', id: '3' }));
  expect(result.current).toHaveLength(3);
  expect(undefined).toEqual(getTodoById('4'));
});
