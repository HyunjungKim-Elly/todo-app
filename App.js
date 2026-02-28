import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import useTodos from './hooks/useTodos';

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? dark : light;

  const { items, filter, setFilter, loading, addTodo, toggleTodo, deleteTodo, clearDone, stats } = useTodos();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }] }>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Momo Todo ✅</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>남은 할 일 {stats.left}개 · 완료 {stats.done}개</Text>

        <TodoInput onAdd={addTodo} />

        <View style={styles.filterRow}>
          {[
            ['all', '전체'],
            ['active', '진행중'],
            ['done', '완료'],
          ].map(([key, label]) => (
            <Pressable
              key={key}
              onPress={() => setFilter(key)}
              style={[
                styles.filterChip,
                { backgroundColor: filter === key ? theme.accent : theme.chip },
              ]}
            >
              <Text style={{ color: filter === key ? '#fff' : theme.text, fontWeight: '700', fontSize: 12 }}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.actionRow}>
          <Text style={[styles.totalText, { color: theme.subText }]}>전체 {stats.total}개</Text>
          <Pressable onPress={clearDone} style={[styles.clearButton, { backgroundColor: theme.chip }]}>
            <Text style={[styles.clearText, { color: theme.text }]}>완료 항목 정리</Text>
          </Pressable>
        </View>

        {loading ? (
          <Text style={[styles.emptyText, { color: theme.subText }]}>불러오는 중...</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TodoItem item={item} onToggle={toggleTodo} onDelete={deleteTodo} />}
            ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.subText }]}>할 일을 추가해봐 ✨</Text>}
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
  filterRow: {
    marginBottom: 10,
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
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

const light = {
  bg: '#f3f4f6',
  text: '#111827',
  subText: '#4b5563',
  chip: '#e5e7eb',
  accent: '#2563eb',
};

const dark = {
  bg: '#0b1020',
  text: '#f9fafb',
  subText: '#9ca3af',
  chip: '#1f2937',
  accent: '#3b82f6',
};
