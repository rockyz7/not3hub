import React from "react";

const TodoItem = ({ id, text, done, markTodo, eliminarTarea }) => {
  return (
    <div className="flex gap-2 w-[95%]">
      <div className=" w-[97%] bg-gray-900 bg-opacity-20 border border-gray-700 rounded-xl flex  justify-between items-center pl-3">
        <p
          className={`text-gray-300  ${
            done ? "line-through decoration-gray-500 text-gray-500" : ""
          }`}
        >
          {text}
        </p>
        <label
          class="relative flex cursor-pointer items-center rounded-full p-3"
          for="todo"
          data-ripple-dark="true"
        >
          <input
            id="todo"
            type="checkbox"
            name={text}
            onChange={() => markTodo(id)}
            checked={done}
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-gray-800 checked:before:bg-primary hover:before:opacity-10"
          />
          <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-primary opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
      </div>

      <button onClick={() => eliminarTarea(id)}>
        <svg
          class="w-[11px] h-[11px] text-gray-500 hover:text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
