export function createTodo(text) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text,
    done: false,
    createdAt: Date.now(),
  };
}

export function toggleTodoById(items, id) {
  return items.map((item) => (item.id === id ? { ...item, done: !item.done } : item));
}

export function deleteTodoById(items, id) {
  return items.filter((item) => item.id !== id);
}

export function clearDoneTodos(items) {
  return items.filter((item) => !item.done);
}

export function filterTodos(items, filter) {
  if (filter === 'active') return items.filter((item) => !item.done);
  if (filter === 'done') return items.filter((item) => item.done);
  return items;
}
