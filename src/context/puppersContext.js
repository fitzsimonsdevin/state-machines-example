import { createContext } from "react";
import { createMachine, assign } from "xstate";
import { useInterpret, useActor } from "@xstate/react";

const getPuppers = async (_, event) => {
  const puppers = [1, 2, 3].map(async () => {
    const data = await (
      await fetch(`https://dog.ceo/api/breeds/image/random`)
    ).json();
    return data;
  });

  const results = await Promise.all(puppers);
  return results;
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
    initial: stateMap.loading,
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
                const puppers = event.data.map((dog) => dog.message);
                return puppers;
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

  console.log("puppersService: ", puppersService);

  return (
    <PuppersContext.Provider value={{ puppersService }}>
      {children}
    </PuppersContext.Provider>
  );
};
