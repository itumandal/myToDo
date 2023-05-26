import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import TodoList from "./TodoList";
import { ModalEdit } from "./ModalEdit";
export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  const [showModal, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }
  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };
  const deleteTodos = ({ id, completed }) => {
    //! write a logic if it is checked then only it will get deleted
    console.log(completed);
    if (!completed) return; // if  true then return
    setTodos((currentTodos) => {
      return currentTodos.filter(
        (todo) => todo.id !== id // return todo whose id is not matching with current id
      );
    });
  };

  const showPopup = () => {
    setShowModal(true);
  };
  const hidePopup = () => {
    setShowModal(false);
  };

  const handleEditTodo = (id) => {
    showPopup();
    setCurrentEdit(
      todos.find((todo) => {
        return todo.id === id;
      })
    );
  };

  const handleEdit = (title) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === currentEdit.id) {
          return {
            ...todo,
            title,
          };
        } else {
          return todo;
        }
      });
    });
  };
  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodos}
        handleEditTodo={handleEditTodo}
      />
      {showModal && <ModalEdit hidePopup={hidePopup} handleEdit={handleEdit} />}
    </>
  );
}
