import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

const modalMachine = createMachine({
  initial: "pending",
  states: {
    pending: {
      on: {
        NEXT: "sleeping",
      },
    },
    sleeping: {
      on: {
        NEXT: "waiting",
      },
    },
    waiting: {
      on: {
        NEXT: "walking",
      },
    },
    walking: {
      on: {
        NEXT: "diagram",
      },
    },
    diagram: {
      on: {
        NEXT: "waiting",
      },
    },
  },
});

const Modal = ({ setShowDogModal }) => {
  const [state, send] = useMachine(modalMachine);
  return (
    <div className="m-auto mt-10 h-5/6">
      {state.matches("pending") && (
        <div>
          <h1 className="text-5xl">State Machines</h1>
          <p className="text-purple-700 text-2xl">or</p>
          <p className="text-5xl mb-14">An excuse to show pictures of my dog</p>
        </div>
      )}
      {state.matches("sleeping") && (
        <img
          src="../../assets/sleeping-dog.jpg"
          alt="dog states"
          className="h-full w-auto m-auto"
        />
      )}
      {state.matches("waiting") && (
        <img
          src="../../assets/waiting.jpeg"
          alt="dog states"
          className="h-full w-auto m-auto"
        />
      )}
      {state.matches("walking") && (
        <img
          src="../../assets/walking.jpg"
          alt="dog states"
          className="h-full w-auto m-auto"
        />
      )}
      {state.matches("diagram") && (
        <img
          src="../../assets/dog-states.png"
          alt="dog states"
          className="h-full w-auto m-auto"
        />
      )}
      <button
        className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
        onClick={() => send("NEXT")}
      >
        Next
      </button>
      <button
        className="m-2 px-4 rounded-sm text-white py-2 bg-purple-400"
        onClick={() => setShowDogModal((current) => !current)}
      >
        hide modal
      </button>
    </div>
  );
};

export default Modal;
