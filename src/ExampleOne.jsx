const ExampleOne = ({ send }) => {
  return (
    <div className="flex flex-col flex-1">
      <h2>OMG one!</h2>
      <p className="my-8 px-44">
        This here has an exit event, this is how you handle doing a specific
        thing in between a state transition, on teh way out. show it in the
        visualizer
      </p>
      <button
        className="bg-purple-500 text-gray-50 p-4 m-8"
        onClick={() => send("CLOSE")}
      >
        Go back
      </button>
    </div>
  );
};

export default ExampleOne;
