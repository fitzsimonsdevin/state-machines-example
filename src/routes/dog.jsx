import React from "react";

const doggoMachine = {
  sleeping: {
    wait: "waiting",
  },
  waiting: {
    walk: "walking",
    sleep: "sleeping",
  },
  walking: {
    wait: "waiting",
  },
};

const actions = (state, contextSet) => {
  switch (state) {
    case "waiting":
      contextSet("woof");
      break;
    case "walking":
      contextSet("pant");
      break;
    case "sleeping":
      contextSet("snore");
      break;

    default:
      break;
  }
};

const matches = (state, matchingSet) => {
  switch (state) {
    case "waiting":
      matchingSet(["wait"]);
      break;
    case "walking":
      matchingSet(["walk", "sleep"]);
      break;
    case "sleeping":
      matchingSet(["sleep", "walk"]);
      break;

    default:
      break;
  }
};

const Dog = () => {
  const [doggoSpeechContext, setDoggoSpeechContext] = React.useState("snore");
  const [impossibleCommands, setImpossibleCommands] = React.useState([
    "sleep",
    "walk",
  ]);

  const reducer = (state, event) => {
    const nextState = doggoMachine[state][event];
    matches(nextState, setImpossibleCommands);
    actions(nextState, setDoggoSpeechContext);
    return nextState !== undefined ? nextState : state;
  };

  const [state, send] = React.useReducer(reducer, "sleeping");

  return (
    <div className="w-80 m-auto mt-10">
      <h2>doggo is: {state}</h2>
      <h2>{doggoSpeechContext && `doggo says: ${doggoSpeechContext}`}</h2>
      <div className="flex flex-col ">
        <h2>Available Commands</h2>
        <button
          disabled={impossibleCommands.includes("wait")}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("wait")}
        >
          {doggoSpeechContext === "snore"
            ? "wake up doggo!"
            : "Are you ready doggo?"}
        </button>
        <button
          disabled={impossibleCommands.includes("walk")}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("walk")}
        >
          Lets walk Doggo!
        </button>
        <button
          disabled={impossibleCommands.includes("sleep")}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("sleep")}
        >
          Go to bed
        </button>
      </div>
    </div>
  );
};

export default Dog;
