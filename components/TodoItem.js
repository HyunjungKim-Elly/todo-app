import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TodoItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.textWrap} onPress={() => onToggle(item.id)}>
        <Text style={[styles.text, item.done && styles.done]}>{item.text}</Text>
      </Pressable>

      <Pressable onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>삭제</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  textWrap: { flex: 1 },
  text: {
    fontSize: 16,
    color: '#111827',
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  deleteBtn: {
    marginLeft: 10,
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: '#b91c1c',
    fontWeight: '700',
    fontSize: 12,
  },
});
