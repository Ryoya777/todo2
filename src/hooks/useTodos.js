import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

/**
 * TODO管理のカスタムフック
 * タスクのCRUD操作とlocalStorageとの同期を提供
 */
export function useTodos() {
  // 初期化時にlocalStorageから読み込み
  const [todos, setTodos] = useState(() => loadFromStorage());

  // todosが変更されるたびにlocalStorageに保存
  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  /**
   * 新しいTODOを追加
   */
  const addTodo = useCallback((todoData) => {
    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: todoData.text.trim(),
      completed: false,
      priority: todoData.priority,
      category: todoData.category.trim(),
      tags: todoData.tags.filter(tag => tag.trim() !== '').map(tag => tag.trim()),
      dueDate: todoData.dueDate || null,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setTodos(prev => [...prev, newTodo]);
    return newTodo;
  }, []);

  /**
   * TODOを更新（編集機能）
   */
  const updateTodo = useCallback((id, updates) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? {
            ...todo,
            ...updates,
            // タグが文字列配列であることを保証
            tags: Array.isArray(updates.tags)
              ? updates.tags.filter(tag => tag.trim() !== '').map(tag => tag.trim())
              : todo.tags,
            updatedAt: Date.now()
          }
        : todo
    ));
  }, []);

  /**
   * TODOを削除
   */
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  /**
   * TODO完了状態を切り替え
   */
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
        : todo
    ));
  }, []);

  /**
   * 全カテゴリを取得（重複なし、ソート済み）
   */
  const categories = useMemo(() => {
    const categorySet = new Set();
    todos.forEach(todo => {
      if (todo.category) {
        categorySet.add(todo.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [todos]);

  /**
   * 全タグを取得（重複なし、ソート済み）
   */
  const tags = useMemo(() => {
    const tagSet = new Set();
    todos.forEach(todo => {
      todo.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [todos]);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    categories,
    tags
  };
}
