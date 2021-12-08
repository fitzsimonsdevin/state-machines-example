import { createContext } from "react";
import { createMachine, assign } from "xstate";
import { useInterpret } from "@xstate/react";

const getPuppers = async (_, event) => {
  const puppers = [1, 2, 3].map(async () => {
    const data = await fetch(`https://dog.ceo/api/breeds/image/random`);
    console.log("data: ", data);
    return data;
  });
  return puppers;
};

const stateMap = {
  idle: "idle",
  loading: "loading",
  loaded: "loaded",
  error: "error",
};

export const puppersMachine = createMachine(
  {
    id: "puppersMachine",
    initial: stateMap.idle,
    context: {
      puppers: [],
    },
    states: {
      [stateMap.idle]: {
        on: { fetchPuppers: stateMap.loading },
      },
      [stateMap.loading]: {
        invoke: {
          src: getPuppers,
          onDone: {
            target: "loaded",
            actions: assign({
              puppers: (_, event) => {
                return event.data;
              },
            }),
          },
          onError: {
            target: "error",
          },
        },
      },
      [stateMap.loaded]: {
        always: [stateMap.idle],
      },
      [stateMap.error]: {
        always: [stateMap.idle],
      },
    },
  },
  {
    actions: {
      addCustomerToPuppers: assign({
        puppers: (context) => [...context.puppers, context.customer],
      }),
    },
  }
);

export const PuppersContext = createContext({});

export const PuppersProvider = ({ children }) => {
  const puppersService = useInterpret(puppersMachine, { devTools: true });

  return (
    <PuppersContext.Provider value={{ puppersService }}>
      {children}
    </PuppersContext.Provider>
  );
};
