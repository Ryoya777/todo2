import styles from '../styles/components/TodoFilters.module.css';

function TodoFilters({ filters, categories, tags, onFilterChange }) {
  return (
    <section className="filter-section">
      <h2>フィルター</h2>
      <div className="filter-controls">
        {/* 状態フィルター */}
        <div className="filter-group">
          <label htmlFor="filter-status">状態</label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">全て</option>
            <option value="active">未完了</option>
            <option value="completed">完了済み</option>
          </select>
        </div>

        {/* カテゴリフィルター */}
        <div className="filter-group">
          <label htmlFor="filter-category">カテゴリ</label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="all">全て</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* タグフィルター */}
        <div className="filter-group">
          <label htmlFor="filter-tag">タグ</label>
          <select
            id="filter-tag"
            value={filters.tag}
            onChange={(e) => onFilterChange('tag', e.target.value)}
          >
            <option value="all">全て</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </div>

        {/* 期限フィルター（新機能） */}
        <div className="filter-group">
          <label htmlFor="filter-duedate">期限</label>
          <select
            id="filter-duedate"
            value={filters.dueDate}
            onChange={(e) => onFilterChange('dueDate', e.target.value)}
          >
            <option value="all">全て</option>
            <option value="overdue">期限切れ</option>
            <option value="today">今日</option>
            <option value="week">1週間以内</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default TodoFilters;
