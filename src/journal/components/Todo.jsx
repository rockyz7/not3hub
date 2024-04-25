import { CheckBox } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";
import TodoItem from "./TodoItem";
import { TextField } from "@mui/material";

const Todo = ({ formState, setSaveChanges }) => {
  const [input, setInput] = useState([1]);
  const [todoList, setTodoList] = useState(null);

  const { activeNote, messageSaved, isSaving, notes } = useSelector(
    (state) => state.journal
  );
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      setTodoList([
        ...todoList,
        { id: new Date().getTime(), text: value, done: false },
      ]);
    }

    setValue("");
  };

  useEffect(() => {
    setTodoList(activeNote.body);
  }, [activeNote]);

  useEffect(() => {
    if (todoList !== null) {
      dispatch(setActiveNote({ ...formState, body: todoList }));
    }
  }, [todoList]);

  const onChange = (e) => {
    setValue(e.target.value);
    setSaveChanges(true);
  };

  const eliminarTarea = (id) => {
    if (todoList.length === 1) {
      setTodoList([]);
    } else {
      const newTodo = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodo);
    }
  };

  const markTodo = (id) => {
    const newBody = todoList.map((note) => {
      return note.id === id ? { ...note, done: !note.done } : note;
    });

    setTodoList(newBody);
  };

  const completadas = activeNote.body.filter((note) => note.done === true);
  const notas = activeNote.body.length;

  return (
    <div className="text-gray-300 relative w-[90%] h-fit max-h-[85%] self-center flex flex-col gap-1 p-1 mt-2 justify-center ">
      <p className=" self-end bg-gray-900 bg-opacity-30 text-primary w-fit p-1 border shadow shadow-primary border-primary rounded-lg   ">
        <span
          className={`${
            completadas.length === notas ? "text-primary" : "text-gray-400"
          }`}
        >
          {completadas.length}
        </span>
        /{notas}
      </p>

      <hr class="w-full h-[1px] mt-1 bg-gray-700 border-0 rounded " />
      <div className="flex mb-[36px] pb-3 h-fit max-h-4/5 overflow-auto flex-col p-1 gap-1 items-center w-full mt-2">
        {activeNote.body.map((todo) => (
          <TodoItem
            {...todo}
            markTodo={markTodo}
            eliminarTarea={eliminarTarea}
            todoList={todoList}
          />
        ))}
      </div>
      <form
        action="submit"
        onSubmit={onSubmit}
        className="absolute bottom-0 w-full  flex flex-col mt-2"
      >
        {
          <input
            type="text"
            placeholder="Nueva tarea"
            className="w-[95%] self-center sticky bottom-10 outline-none rounded-lg p-1 px-2 placeholder:text-gray-500 bg-gray-900 bg-opacity-30 text-primary  border border-gray-800 shadow shadow-gray-700 focus:border-primary"
            onChange={onChange}
            value={value}
          />
        }
      </form>
    </div>
  );
};

export default Todo;
