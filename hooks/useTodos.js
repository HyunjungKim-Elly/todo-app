import { useEffect, useMemo, useState } from 'react';
import { loadTodos, saveTodos } from '../utils/todoStorage';
import { clearDoneTodos, createTodo, deleteTodoById, filterTodos, toggleTodoById } from '../utils/todoModel';

export default function useTodos() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      const stored = await loadTodos();
      if (alive) {
        setItems(stored);
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      saveTodos(items);
    }
  }, [items, loading]);

  const addTodo = (text) => {
    setItems((prev) => [createTodo(text), ...prev]);
  };

  const toggleTodo = (id) => {
    setItems((prev) => toggleTodoById(prev, id));
  };

  const deleteTodo = (id) => {
    setItems((prev) => deleteTodoById(prev, id));
  };

  const clearDone = () => {
    setItems((prev) => clearDoneTodos(prev));
  };

  const visibleItems = useMemo(() => filterTodos(items, filter), [items, filter]);

  const stats = useMemo(() => {
    const total = items.length;
    const done = items.filter((item) => item.done).length;
    const left = total - done;
    return { total, done, left };
  }, [items]);

  return {
    items: visibleItems,
    filter,
    setFilter,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    stats,
  };
}
