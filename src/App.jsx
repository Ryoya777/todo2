import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { useFilters } from './hooks/useFilters';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  // カスタムフックでTODO管理
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    categories,
    tags
  } = useTodos();

  // フィルター管理
  const {
    filters,
    filteredTodos,
    updateFilter
  } = useFilters(todos);

  // 編集状態の管理
  const [editingTodo, setEditingTodo] = useState(null);

  /**
   * フォーム送信ハンドラ（追加または編集）
   */
  const handleSubmit = (todoData) => {
    if (editingTodo) {
      // 編集モード
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    } else {
      // 追加モード
      addTodo(todoData);
    }
  };

  /**
   * 編集モードを開始
   */
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    // フォームまでスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 編集モードをキャンセル
   */
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="container">
      <header>
        <h1>TODOアプリ - React</h1>
      </header>

      <main>
        {/* タスク追加・編集フォーム */}
        <TodoForm
          onSubmit={handleSubmit}
          editingTodo={editingTodo}
          onCancelEdit={handleCancelEdit}
          categories={categories}
        />

        {/* フィルター */}
        <TodoFilters
          filters={filters}
          categories={categories}
          tags={tags}
          onFilterChange={updateFilter}
        />

        {/* TODO一覧 */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}

export default App;
