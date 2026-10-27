import { AnimatePresence, motion } from "motion/react";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 10 3.2 3.2L15.5 6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 9.5h-7L6 6m2.5 2.5v4.5m3-4.5v4.5" />
    </svg>
  );
}

export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -18, scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`todo-item${todo.completed ? " is-completed" : ""}`}
    >
      <button
        className="todo-check"
        type="button"
        aria-label={todo.completed ? `Mark ${todo.title} active` : `Complete ${todo.title}`}
        aria-pressed={todo.completed}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <CheckIcon />}
      </button>
      <span className="todo-title">{todo.title}</span>
      <button
        className="icon-button delete-button"
        type="button"
        aria-label={`Delete ${todo.title}`}
        onClick={() => onRemove(todo.id)}
      >
        <TrashIcon />
      </button>
    </motion.li>
  );
}

export function TodoItems({ todos, onToggle, onRemove }) {
  return (
    <ul className="todo-list">
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
