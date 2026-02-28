import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import useTodos from './hooks/useTodos';

export default function App() {
  const { items, loading, addTodo, toggleTodo, deleteTodo, clearDone, stats } = useTodos();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Momo Todo ✅</Text>
        <Text style={styles.subtitle}>남은 할 일 {stats.left}개 · 완료 {stats.done}개</Text>

        <TodoInput onAdd={addTodo} />

        <View style={styles.actionRow}>
          <Text style={styles.totalText}>전체 {stats.total}개</Text>
          <Pressable onPress={clearDone} style={styles.clearButton}>
            <Text style={styles.clearText}>완료 항목 정리</Text>
          </Pressable>
        </View>

        {loading ? (
          <Text style={styles.emptyText}>불러오는 중...</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TodoItem item={item} onToggle={toggleTodo} onDelete={deleteTodo} />}
            ListEmptyComponent={<Text style={styles.emptyText}>할 일을 추가해봐 ✨</Text>}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    color: '#4b5563',
  },
  actionRow: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: '#6b7280',
    fontSize: 13,
  },
  clearButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
  },
});
