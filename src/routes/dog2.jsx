import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";

const dog2Machine = createMachine({
  id: "dog2machine",
  context: {
    dogSays: "",
  },
  initial: "sleeping",
  states: {
    sleeping: {
      onEntry: assign({
        dogSays: () => "snore",
      }),
      on: {
        wait: {
          target: "waiting",
        },
      },
    },
    waiting: {
      onEntry: assign({
        dogSays: () => "woof",
      }),
      on: {
        walk: {
          target: "walking",
        },
        sleep: {
          target: "sleeping",
        },
      },
    },
    walking: {
      onEntry: assign({
        dogSays: () => "pant",
      }),
      on: {
        wait: {
          target: "waiting",
        },
      },
    },
  },
});

const Dog2 = () => {
  const [state, send] = useMachine(dog2Machine);

  return (
    <div className="w-80 m-auto mt-10">
      <h2>doggo is: {state.value}</h2>
      <h2>{state.context.dogSays && `doggo says: ${state.context.dogSays}`}</h2>
      <div className="flex flex-col ">
        <h2>Available Commands</h2>
        <button
          disabled={!state.can("wait")}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("wait")}
        >
          {state.matches("snore") ? "wake up doggo!" : "Are you ready doggo?"}
        </button>
        <button
          disabled={!state.can("walk")}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("walk")}
        >
          Lets walk Doggo!
        </button>
        <button
          disabled={!state.can("sleep")}
          className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
          onClick={() => send("sleep")}
        >
          Go to bed
        </button>
      </div>
    </div>
  );
};

export default Dog2;
