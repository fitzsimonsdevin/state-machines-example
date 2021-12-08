import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";
import "../App.css";

import ExampleOne from "../ExampleOne";
import ExampleTwo from "../ExampleTwo";
import ExampleThree, { puppersStates } from "../ExampleThree";

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
      dog: {
        name: "",
        id: "8675309",
        img: `https://image.shutterstock.com/image-photo/overhead-view-australian-shepherd-portrait-260nw-1042813255.jpg`,
      },
      error: undefined,
      exitMessage: undefined,
      puppers: [],
    },
    states: {
      inactive: {
        on: {
          ONE_DOG: "showing_one",
          EDIT_DOG: "editing",
          MANY_DOGS: "viewing_many",
        },
        exit: ["clearErrorMessage", "clearExitMessage"],
      },
      showing_one: {
        exit: ["setExitMessage"],
        on: {
          CLOSE: "inactive",
        },
      },
      editing: {
        on: {
          INPUT: {
            // these can be an array of actions that happen on input
            actions: ["logMessage", "updateContextWithValue"],
          },
          BLUR: [
            {
              cond: numberCheck,
              target: "editing",
              actions: assign({
                dog: (context, event) => {
                  return {
                    ...context["dog"],
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
      viewing_many: {
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
          return "What a good dog";
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
        dog: (context, event) => {
          return {
            ...context["dog"],
            name: event.value,
          };
        },
      }),
    },
  }
);

const Main = () => {
  const [state, send] = useMachine(showHideMachine, {
    devTools: true,
  });

  console.log("state: ", state);
  return (
    <>
      <h1 className="text-2xl my-4">
        State Machines, one solution for what ails us
      </h1>
      <div className="mx-4 bg-gray-300 px-32">
        <p className="my-2">
          What is the current state: {JSON.stringify(state.value)}
        </p>
        <p>What is most recent event: {JSON.stringify(state.event)}</p>
      </div>
      {state.context.exitMessage && (
        <h1 className="text-xl my-2 text-purple-700">
          <span className="text-gray-500 text-sm px-4">
            this text is now visibile because of an exit message. They act
            similar to how they sound, they happen on the "exit" from a state
          </span>{" "}
          <br />
          {state.context.exitMessage}
        </h1>
      )}
      {state.context.error && (
        <h1 className="text-xl my-2 text-red-700">
          <span className="text-gray-500 text-sm px-4">
            this text is now visibile because of "guard". They act similar to
            how they sound. We fired on Blur, and failed, so we get this
            warning.
          </span>{" "}
          <br />
          {state.context.error}
        </h1>
      )}
      <div className="">
        <ul>
          <li>
            <button
              className={`m-2 px-4 rounded-sm text-white py-2 bg-purple-400 ${
                state.value !== "inactive" ? "opacity-50" : undefined
              }`}
              disabled={state.value !== "inactive"}
              onClick={() => send("ONE_DOG")}
            >
              look at this dog
            </button>
          </li>
          <li>
            <button
              className={`m-2 px-4 rounded-sm text-white py-2 bg-purple-400 ${
                !state.matches("inactive") ? "opacity-50" : undefined
              }`}
              disabled={state.value !== "inactive"}
              onClick={() => send("EDIT_DOG")}
            >
              edit a dog
            </button>
          </li>
          <li>
            <button
              className={`m-2 px-4 rounded-sm text-white py-2 bg-purple-400 ${
                state.value !== "inactive" ? "opacity-50" : undefined
              }`}
              disabled={state.value !== "inactive"}
              onClick={() => send("MANY_DOGS")}
            >
              view many dogs
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
      <main className="flex justify-center items-center min-w-full bg-gray-50">
        {state.value === "showing_one" && (
          <ExampleOne
            send={send}
            img={state.context.dog.img}
            name={state.context.dog.name}
          />
        )}
        {state.matches("editing") && (
          <ExampleTwo
            send={send}
            context={state.context}
            previousEvent={state.event}
          />
        )}
        {state.value.viewing_many && (
          <ExampleThree
            send={send}
            currentState={state.value}
            meta={state.meta}
          />
        )}
      </main>
    </>
  );
};

export default Main;
