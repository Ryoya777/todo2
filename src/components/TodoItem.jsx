import styles from '../styles/components/TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  /**
   * 優先度ラベルを取得
   */
  const getPriorityLabel = (priority) => {
    const labels = {
      high: '高',
      medium: '中',
      low: '低'
    };
    return labels[priority] || priority;
  };

  /**
   * 日付をフォーマット
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  /**
   * 期限状態を判定
   */
  const getDueDateStatus = () => {
    if (!todo.dueDate || todo.completed) return null;

    const now = Date.now();
    const dueDate = todo.dueDate;
    const oneDayInMs = 86400000; // 24時間

    if (dueDate < now) {
      return 'overdue'; // 期限切れ
    } else if (dueDate < now + oneDayInMs) {
      return 'soon'; // 24時間以内
    }
    return 'normal'; // 通常
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <div className={`todo-item priority-${todo.priority}${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="todo-content">
        <div className="todo-text">{todo.text}</div>
        <div className="todo-meta">
          {/* 優先度バッジ */}
          <span className="badge badge-priority">
            優先度: {getPriorityLabel(todo.priority)}
          </span>

          {/* カテゴリバッジ */}
          {todo.category && (
            <span className="badge badge-category">
              {todo.category}
            </span>
          )}

          {/* タグバッジ */}
          {todo.tags.map(tag => (
            <span key={tag} className="badge badge-tag">
              #{tag}
            </span>
          ))}

          {/* 期限バッジ */}
          {todo.dueDate && (
            <span className={`badge badge-due ${dueDateStatus ? `badge-due-${dueDateStatus}` : ''}`}>
              期限: {formatDate(todo.dueDate)}
              {dueDateStatus === 'overdue' && ' (期限切れ)'}
              {dueDateStatus === 'soon' && ' (まもなく)'}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(todo)}
          title="編集"
        >
          編集
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(todo.id)}
          title="削除"
        >
          削除
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
