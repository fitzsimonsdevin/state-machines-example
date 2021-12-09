import { useContext } from "react";
import { PuppersContext } from "../context/puppersContext";
import { useActor } from "@xstate/react";

const Testing = () => {
  const { puppersService } = useContext(PuppersContext);
  console.log("puppersService: ", puppersService);
  // const [puppersGlobalState] = useActor(puppersService);
  // console.log("puppersGlobalState: ", puppersGlobalState);
  return <h1>Testing</h1>;
};

export default Testing;
