import { useEffect, useMemo, useState } from 'react';
import { loadTodos, saveTodos } from '../utils/todoStorage';

const newTodo = (text) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  text,
  done: false,
  createdAt: Date.now(),
});

export default function useTodos() {
  const [items, setItems] = useState([]);
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
    setItems((prev) => [newTodo(text), ...prev]);
  };

  const toggleTodo = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const deleteTodo = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearDone = () => {
    setItems((prev) => prev.filter((item) => !item.done));
  };

  const stats = useMemo(() => {
    const total = items.length;
    const done = items.filter((item) => item.done).length;
    const left = total - done;
    return { total, done, left };
  }, [items]);

  return {
    items,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearDone,
    stats,
  };
}
