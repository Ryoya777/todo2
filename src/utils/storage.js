// localStorageの操作を抽象化するユーティリティ

const STORAGE_KEY = 'todos';

/**
 * localStorageからTODOデータを読み込む
 * @returns {Array} TODOの配列（エラー時は空配列）
 */
export function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return [];
  }
}

/**
 * localStorageにTODOデータを保存する
 * @param {Array} todos - TODOの配列
 */
export function saveToStorage(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
  }
}

/**
 * localStorageからTODOデータを削除する
 */
export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear todos from localStorage:', error);
  }
}
