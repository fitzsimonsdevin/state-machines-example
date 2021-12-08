import { assign } from "xstate";

async function fetchPupper() {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
  return response.json();
}

export const puppersStates = {
  initial: "idle",
  states: {
    idle: {
      on: {
        NEXT: { target: "loading" },
      },
      meta: {
        message: "click for puppers",
      },
    },
    loading: {
      invoke: {
        id: "fetch-puppers",
        src: fetchPupper,
        onDone: {
          target: "loaded",
          // here we can just assign up to the previous state
          actions: assign({
            puppers: (context, event) => {
              const existingPups = context.puppers;
              return [...existingPups, event.data.message];
            },
          }),
        },
        onError: "idle",
      },
      on: {
        NEXT: { target: "loaded" },
      },
      meta: {
        message: "loading",
      },
    },
    loaded: {
      on: {
        NEXT: { target: "idle" },
      },
      meta: {
        message: "click to reset for a new pupper",
      },
    },
  },
};

const ExampleThree = ({ send, currentState, meta }) => {
  return (
    <div className="flex flex-col flex-1">
      <h2>Lets check out some dogs!</h2>
      <p className="my-8 px-44">
        the intent here is that we're going to look at a machine that contains
        another machine. Think... forms in forms in forms. We're also
        considering meta
      </p>
      <div className="border-2 border-black w-1/3 h-3/6 m-auto">
        <div>current {currentState.viewing_many}</div>
        <button
          className="bg-purple-500 text-gray-50 p-2 m-4"
          onClick={() => send("NEXT")}
        >
          {
            meta[`showHideMachine.viewing_many.${currentState.viewing_many}`]
              .message
          }
        </button>
        <br />
      </div>
      <button
        className="bg-purple-500 text-gray-50 p-4 m-8"
        onClick={() => send("CLOSE")}
      >
        Go back
      </button>
    </div>
  );
};

export default ExampleThree;
