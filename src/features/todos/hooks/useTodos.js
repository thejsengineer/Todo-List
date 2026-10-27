import { useEffect, useState } from "react";

const STORAGE_KEY = "daylight-todos";

function readTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (!savedTodos) return [];

    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    console.error("Could not load saved todos.", error);
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(readTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTodos((currentTodos) => [
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false,
        createdAt: Date.now(),
      },
      ...currentTodos,
    ]);
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function removeTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return { todos, addTodo, toggleTodo, removeTodo };
}
