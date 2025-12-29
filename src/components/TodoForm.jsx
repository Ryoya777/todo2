import { useState, useEffect } from 'react';
import styles from '../styles/components/TodoForm.module.css';

function TodoForm({ onSubmit, editingTodo, onCancelEdit, categories }) {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium',
    category: '',
    tags: '',
    dueDate: ''
  });

  // 編集モード時、フォームにデータを読み込む
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        text: editingTodo.text,
        priority: editingTodo.priority,
        category: editingTodo.category,
        tags: editingTodo.tags.join(', '),
        dueDate: editingTodo.dueDate
          ? new Date(editingTodo.dueDate).toISOString().split('T')[0]
          : ''
      });
    } else {
      // 編集モードでない場合はリセット
      setFormData({
        text: '',
        priority: 'medium',
        category: '',
        tags: '',
        dueDate: ''
      });
    }
  }, [editingTodo]);

  /**
   * フォーム送信ハンドラ
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.text.trim() === '') {
      alert('TODO内容を入力してください');
      return;
    }

    // タグを配列に変換
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    // 期限をタイムスタンプに変換
    const dueDateTimestamp = formData.dueDate
      ? new Date(formData.dueDate).getTime()
      : null;

    // データを送信
    onSubmit({
      text: formData.text,
      priority: formData.priority,
      category: formData.category,
      tags: tagsArray,
      dueDate: dueDateTimestamp
    });

    // フォームをリセット（編集モードでない場合のみ）
    if (!editingTodo) {
      setFormData({
        text: '',
        priority: 'medium',
        category: '',
        tags: '',
        dueDate: ''
      });
    }
  };

  /**
   * 入力変更ハンドラ
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * キャンセルボタンハンドラ
   */
  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <section className="input-section">
      <h2>{editingTodo ? 'TODOを編集' : '新しいTODOを追加'}</h2>
      <form id="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="todo-text">TODO内容 *</label>
          <input
            type="text"
            id="todo-text"
            name="text"
            required
            placeholder="やるべきことを入力..."
            value={formData.text}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="todo-priority">優先度</label>
            <select
              id="todo-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="todo-category">カテゴリ</label>
            <input
              type="text"
              id="todo-category"
              name="category"
              list="category-list"
              placeholder="カテゴリ名"
              value={formData.category}
              onChange={handleChange}
            />
            <datalist id="category-list">
              {categories.map(cat => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="todo-tags">タグ（カンマ区切り）</label>
            <input
              type="text"
              id="todo-tags"
              name="tags"
              placeholder="例: 仕事, 急ぎ, レビュー"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="todo-duedate">期限</label>
            <input
              type="date"
              id="todo-duedate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTodo ? '更新' : '追加'}
          </button>
          {editingTodo && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              キャンセル
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
