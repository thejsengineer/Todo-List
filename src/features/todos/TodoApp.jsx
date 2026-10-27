import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTodos } from "./hooks/useTodos.js";
import { TodoItems } from "./components/TodoItem.jsx";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="11" y="9" width="26" height="32" rx="5" />
      <path d="M18 9.5h12M18 20h12M18 27h12M18 34h7" />
    </svg>
  );
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("daylight-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function TodoApp() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [title, setTitle] = useState("");
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("daylight-theme", theme);
  }, [theme]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  }

  return (
    <motion.main
      className="app-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="topbar">
        <a className="brand" href="#" aria-label="Daylight home">
          <span className="brand-mark"><span /></span>
          <span>daylight</span>
        </a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              className="theme-icon"
              initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </motion.span>
          </AnimatePresence>
          <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
      </header>

      <section className="todo-panel" aria-labelledby="page-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR SPACE, YOUR PACE</div>
        <h1 id="page-title">Make room for<br /><span>what matters.</span></h1>
        <p className="intro">A little list to help you get there, one thing at a time.</p>

        <form className="todo-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <input
            id="new-todo"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What would you like to get done?"
            maxLength={160}
          />
          <button type="submit" disabled={!title.trim()}>
            <PlusIcon />
            <span>Add task</span>
          </button>
        </form>

        <div className="list-heading">
          <h2>Today</h2>
          <span className="task-count">
            {remainingCount} {remainingCount === 1 ? "thing" : "things"} to do
          </span>
        </div>

        {todos.length > 0 ? (
          <TodoItems todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
        ) : (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.25 }}
          >
            <div className="empty-icon"><EmptyIcon /></div>
            <p className="empty-title">Your list is a blank page.</p>
            <p className="empty-copy">Add a task above and make today yours.</p>
          </motion.div>
        )}

        {todos.length > 0 && remainingCount === 0 && (
          <motion.p
            className="all-done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Everything is done. Take a little bow.
          </motion.p>
        )}
      </section>

      <footer className="footer">
        <span>One thing at a time.</span>
        <span className="footer-sparkle" aria-hidden="true">✳</span>
      </footer>
    </motion.main>
  );
}
