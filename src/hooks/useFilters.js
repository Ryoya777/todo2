import { useState, useCallback, useMemo } from 'react';

/**
 * フィルター管理のカスタムフック
 * フィルター状態の管理とフィルタリングロジックを提供
 */
export function useFilters(todos) {
  const [filters, setFilters] = useState({
    status: 'all',    // 'all' | 'active' | 'completed'
    category: 'all',  // 'all' | カテゴリ名
    tag: 'all',       // 'all' | タグ名
    dueDate: 'all'    // 'all' | 'overdue' | 'today' | 'week'
  });

  /**
   * フィルターを更新
   */
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  }, []);

  /**
   * フィルターをリセット
   */
  const resetFilters = useCallback(() => {
    setFilters({
      status: 'all',
      category: 'all',
      tag: 'all',
      dueDate: 'all'
    });
  }, []);

  /**
   * フィルタリングされたTODOリストを取得
   */
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // 状態フィルター
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;

      // カテゴリフィルター
      if (filters.category !== 'all' && todo.category !== filters.category) return false;

      // タグフィルター
      if (filters.tag !== 'all' && !todo.tags.includes(filters.tag)) return false;

      // 期限フィルター
      if (filters.dueDate !== 'all') {
        if (!todo.dueDate) return false;

        const now = Date.now();
        const dueDate = todo.dueDate;

        if (filters.dueDate === 'overdue') {
          // 期限切れ（完了済みを除く）
          return dueDate < now && !todo.completed;
        }

        if (filters.dueDate === 'today') {
          // 今日が期限
          const todayStart = new Date().setHours(0, 0, 0, 0);
          const todayEnd = todayStart + 86400000; // 24時間後
          return dueDate >= todayStart && dueDate < todayEnd;
        }

        if (filters.dueDate === 'week') {
          // 1週間以内が期限
          const weekLater = now + 7 * 86400000;
          return dueDate >= now && dueDate <= weekLater;
        }
      }

      return true;
    });
  }, [todos, filters]);

  /**
   * アクティブなフィルター数を取得
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.tag !== 'all') count++;
    if (filters.dueDate !== 'all') count++;
    return count;
  }, [filters]);

  return {
    filters,
    filteredTodos,
    updateFilter,
    resetFilters,
    activeFilterCount
  };
}
