import React from "react";

const doggoMachine = {
  sleeping: {
    wake: "waiting",
  },
  waiting: {
    walk: "walking",
  },
  walking: {
    sleep: "sleeping",
  },
};

const actions = (state) => {
  switch (state) {
    case "waiting":
      window.alert("bark");
      break;
    case "walking":
      break;
    case "sleeping":
      break;

    default:
      break;
  }
};

const reducer = (state, event) => {
  const nextState = doggoMachine[state][event];
  actions(nextState);
  return nextState !== undefined ? nextState : state;
};

const Dog = () => {
  const [state, send] = React.useReducer(reducer, "sleeping");

  return (
    <div className="w-80 m-auto mt-10">
      <h2>doggo is: {state}</h2>
      <div className="flex flex-col ">
        <button
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("wake")}
        >
          wake
        </button>
        <button
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("walk")}
        >
          walk
        </button>
        <button
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("sleep")}
        >
          sleep
        </button>
      </div>
    </div>
  );
};

export default Dog;
