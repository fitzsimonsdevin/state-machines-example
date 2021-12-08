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

const actions = (state, actionSet) => {
  switch (state) {
    case "waiting":
      actionSet("woof");
      break;
    case "walking":
      actionSet("pant");
      break;
    case "sleeping":
      actionSet("snooze");
      break;

    default:
      break;
  }
};

const matches = (state, matchingSet) => {
  switch (state) {
    case "waiting":
      matchingSet("walking");
      break;
    case "walking":
      matchingSet("sleeping");
      break;
    case "sleeping":
      matchingSet("waiting");
      break;

    default:
      break;
  }
};

const Dog = () => {
  const [doggoSays, setDoggoSays] = React.useState("snooze");
  const [possibleStates, setPossibleStates] = React.useState("waiting");

  const reducer = (state, event) => {
    const nextState = doggoMachine[state][event];
    matches(nextState, setPossibleStates);
    actions(nextState, setDoggoSays);
    return nextState !== undefined ? nextState : state;
  };

  const [state, send] = React.useReducer(reducer, "sleeping");

  return (
    <div className="w-80 m-auto mt-10">
      <h2>doggo is: {state}</h2>
      <h2>{doggoSays && `doggo says: ${doggoSays}`}</h2>
      <div className="flex flex-col ">
        <button
          disabled={possibleStates !== "waiting"}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("wake")}
        >
          wake
        </button>
        <button
          disabled={possibleStates !== "walking"}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("walk")}
        >
          walk
        </button>
        <button
          disabled={possibleStates !== "sleeping"}
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
