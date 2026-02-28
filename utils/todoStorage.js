import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_STORAGE_KEY = '@todo-app/items';

export async function loadTodos() {
  const raw = await AsyncStorage.getItem(TODO_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTodos(items) {
  await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(items));
}
