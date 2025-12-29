import styles from '../styles/components/EmptyState.module.css';

function EmptyState() {
  return (
    <div id="empty-state" className="empty-state">
      <p>TODOがありません。上のフォームから追加してください。</p>
    </div>
  );
}

export default EmptyState;
