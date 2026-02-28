import { describe, expect, it } from 'vitest';
import { clearDoneTodos, deleteTodoById, filterTodos, toggleTodoById } from '../utils/todoModel';

const seed = [
  { id: '1', text: 'A', done: false },
  { id: '2', text: 'B', done: true },
  { id: '3', text: 'C', done: false },
];

describe('todoModel', () => {
  it('toggleTodoById toggles a specific item', () => {
    const next = toggleTodoById(seed, '1');
    expect(next[0].done).toBe(true);
    expect(next[1].done).toBe(true);
  });

  it('deleteTodoById removes item by id', () => {
    const next = deleteTodoById(seed, '2');
    expect(next.length).toBe(2);
    expect(next.some((item) => item.id === '2')).toBe(false);
  });

  it('clearDoneTodos keeps only active items', () => {
    const next = clearDoneTodos(seed);
    expect(next.map((x) => x.id)).toEqual(['1', '3']);
  });

  it('filterTodos returns expected views', () => {
    expect(filterTodos(seed, 'all').length).toBe(3);
    expect(filterTodos(seed, 'active').length).toBe(2);
    expect(filterTodos(seed, 'done').length).toBe(1);
  });
});
