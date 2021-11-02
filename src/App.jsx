import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";
import "./App.css";

import ExampleOne from "./ExampleOne";
import ExampleTwo from "./ExampleTwo";
import ExampleThree, { puppersStates } from "./ExampleThree";

const numberCheck = (context, event) => {
  if (parseInt(event.value)) {
    return true;
  }

  return false;
};

const showHideMachine = createMachine(
  {
    id: "showHideMachine",
    initial: "inactive",
    context: {
      seed: {
        name: "cool seed name",
        id: "some-id",
      },
      error: undefined,
      exitMessage: undefined,
      puppers: [],
    },
    states: {
      inactive: {
        on: {
          ONE: "one",
          TWO: "two",
          THREE: "three",
        },
        exit: ["clearErrorMessage", "clearExitMessage"],
      },
      one: {
        exit: ["setExitMessage"],
        on: {
          CLOSE: "inactive",
        },
      },
      two: {
        on: {
          INPUT: {
            // these can be an array of actions that happen on input
            actions: ["logMessage", "updateContextWithValue"],
          },
          BLUR: [
            {
              cond: numberCheck,
              target: "two",
              actions: assign({
                seed: (context, event) => {
                  return {
                    ...context["seed"],
                    id: event.value,
                  };
                },
              }),
            },
            {
              target: "inactive",
              actions: assign({
                error: () => "you have to use numbers duh!",
              }),
            },
          ],
          CLOSE: "inactive",
        },
      },
      three: {
        on: {
          CLOSE: "inactive",
        },
        ...puppersStates,
      },
    },
  },
  {
    actions: {
      setExitMessage: assign({
        exitMessage: () => {
          return "OMG YOU SET THE EXIT MESSAGE";
        },
      }),
      clearExitMessage: assign({
        exitMessage: () => undefined,
      }),
      clearErrorMessage: assign({
        error: () => undefined,
      }),
      logMessage: () => console.log("MY COOL MESSAGE"),
      updateContextWithValue: assign({
        seed: (context, event) => {
          return {
            ...context["seed"],
            name: event.value,
          };
        },
      }),
    },
  }
);

function App() {
  const [state, send] = useMachine(showHideMachine, {
    devTools: true,
  });

  return (
    <div className="App h-screen">
      <h1 className="text-2xl my-4">
        State Machines, one solution for what ails us
      </h1>
      {state.context.exitMessage && (
        <h1 className="text-xl my-2 text-purple-700">
          this happened when we exited ONE <br />
          {state.context.exitMessage}
        </h1>
      )}
      {state.context.error && (
        <h1 className="text-xl my-2 text-red-700">
          this happened when we failed validation <br />
          {state.context.error}
        </h1>
      )}
      <div className="">
        <ul>
          <li>
            <button
              className={state.value !== "inactive" ? "opacity-50" : undefined}
              disabled={state.value !== "inactive"}
              onClick={() => send("ONE")}
            >
              example one
            </button>
          </li>
          <li>
            <button
              className={state.value !== "inactive" ? "opacity-50" : undefined}
              disabled={state.value !== "inactive"}
              onClick={() => send("TWO")}
            >
              example two
            </button>
          </li>
          <li>
            <button
              className={state.value !== "inactive" ? "opacity-50" : undefined}
              disabled={state.value !== "inactive"}
              onClick={() => send("THREE")}
            >
              example three
            </button>
          </li>
        </ul>
      </div>
      {state.context.puppers.length > 0 && (
        <div>
          <h2>Puppers</h2>
          <ul className="flex">
            {state.context.puppers.map((pupper) => {
              console.log("pupper: ", pupper);
              return (
                <li
                  style={{ maxHeight: "175px", maxWidth: "175px" }}
                  key={pupper}
                >
                  <img src={pupper} alt="pic of pupper" />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <main className="flex justify-center items-center h-3/6 min-w-full bg-gray-50">
        {state.value === "one" && <ExampleOne send={send} />}
        {state.value === "two" && (
          <ExampleTwo
            send={send}
            context={state.context}
            previousEvent={state.event}
          />
        )}
        {state.value.three && (
          <ExampleThree
            send={send}
            currentState={state.value}
            meta={state.meta}
          />
        )}
      </main>
    </div>
  );
}

export default App;
