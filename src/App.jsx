import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import { ModalEdit } from "./ModalEdit";
import Notification from "./Notification";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  const [showModal, setShowModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [showNotification, setshowNotification] = useState(false);
  const [message, setMessage] = useState("Notification");
  const [color, setColor] = useState("transparent");
  const [showFilterData, setShowFilterData] = useState(false);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title) => {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
    handleNotification(`${title} added!`, "green");
  }, []);

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
  const deleteTodos = ({ id, completed, title }) => {
    //! write a logic if it is checked then only it will get deleted
    if (!completed) return; // if  true then return
    setTodos((currentTodos) => {
      return currentTodos.filter(
        (todo) => todo.id !== id // return todo whose id is not matching with current id
      );
    });
    handleNotification(`${title} deleted!`, "red");
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
    handleNotification(`${title} edited!`, "yellow");
  };

  const handleSearchTitle = () => {
    if (!search.trim()) {
      setShowFilterData(false);
      return;
    }
    setShowFilterData(true);
    const data = todos.filter((todo) => {
      return todo.title.toUpperCase().includes(search.toUpperCase().trim());
    });
    setFilterData(data);
  };

  function handleNotification(message, color) {
    setMessage(message);
    setColor(color);
    setshowNotification(true);
    setTimeout(() => {
      setshowNotification(false);
    }, 4000);
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <div className="todo-main">
        <h1 className="header">Todo List</h1>
        <span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn" onClick={handleSearchTitle}>
            Search
          </button>
        </span>
      </div>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodos}
        handleEditTodo={handleEditTodo}
        showFilterData={showFilterData}
        filterData={filterData}
      />
      {showModal && (
        <ModalEdit
          hidePopup={hidePopup}
          handleEdit={handleEdit}
          defaultTitle={currentEdit.title}
        />
      )}
      {showNotification && (
        <Notification
          message={message}
          color={color}
          showNotification={() => setshowNotification(false)}
        />
      )}
    </>
  );
}
