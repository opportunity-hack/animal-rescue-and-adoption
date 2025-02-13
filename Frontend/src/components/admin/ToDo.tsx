import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Check, X } from "lucide-react";

import { IToDoItem, TodoStatus } from "../../interfaces/ToDo";
import axios from "axios";

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<IToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [saveMessage, setSaveMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get<IToDoItem[]>(`${import.meta.env.VITE_G_API_URL}/get-todo`, {
        withCredentials: true,
      })
      .then((response) => {
        setTodos(response.data);
      });
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newItem: IToDoItem = {
        id: Date.now().toString(),
        text: newTodo,
        completed: TodoStatus.NOT_DONE,
      };
      setTodos([...todos, newItem]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const nextStatus =
            {
              [TodoStatus.NOT_DONE]: TodoStatus.COMPLETED,
              [TodoStatus.COMPLETED]: TodoStatus.DELETED,
              [TodoStatus.DELETED]: TodoStatus.NOT_DONE,
            }[todo.completed] || TodoStatus.NOT_DONE;
          return { ...todo, completed: nextStatus };
        }
        return todo;
      })
    );
  };

  const saveTodos = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_G_API_URL}/todo`,
        { todos },
        { withCredentials: true }
      )
      .then(() => {
        setSaveMessage("Saved");
        setTimeout(() => {
          setSaveMessage("");
        }, 1500); // Message will disappear after 3 seconds
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-darkergreen text-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
      <div className="space-y-4">
        {todos
          .filter((todo) => todo.completed !== TodoStatus.DELETED)
          .map((todo) => (
            <motion.div
              key={todo.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-4 rounded-md flex items-center justify-between"
            >
              <span
                className={
                  todo.completed === TodoStatus.COMPLETED ? "line-through" : ""
                }
              >
                {todo.text}
              </span>
              <button onClick={() => toggleTodo(todo.id)} className="text-sage">
                {todo.completed === TodoStatus.COMPLETED ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </button>
            </motion.div>
          ))}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="bg-white/10 p-2 rounded-md flex-grow"
            placeholder="Add new todo"
          />
          <button
            onClick={addTodo}
            className="bg-sage text-darkestgreen p-2 rounded-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={saveTodos}
          className="bg-sage text-darkestgreen px-4 py-2 rounded-md w-full"
        >
          Save
        </button>
        {saveMessage && (
          <div className="text-center text-sage font-['outfit'] transition-opacity duration-1000 ease-in-out">
            {saveMessage}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ToDo;
