import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import styles from '../styles/components/TodoList.module.css';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <section className="todo-list-section">
      <h2>TODO一覧</h2>
      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <div id="todo-list" className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoList;
