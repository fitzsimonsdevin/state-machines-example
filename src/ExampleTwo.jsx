const ExampleTwo = ({ send, context, previousEvent }) => {
  return (
    <div className="flex flex-col flex-1">
      <h2>OMG two!</h2>
      <div className="flex-1">
        <h3 className="text-gray-700 text-xl">What about inputs?</h3>
        <p className="mb-10">
          We can start with a context in the machine like 'cool dog name'. Also
          don't forget to show the send action in the close button
        </p>
        <div className="grid grid-cols-2 min-h-3/6 h-3/6 m-4">
          <div>
            context
            <div>
              <span className="font-bold">Dog Name:</span> {context.dog.name}
            </div>
            <div>
              <span className="font-bold">Dog ID:</span> {context.dog.id}
            </div>
          </div>
          <div>
            <span className="pr-6">most recent event:</span>
            <code>{JSON.stringify(previousEvent)}</code>
          </div>
        </div>
        <label>
          <span className="pr-6">Update the name:</span>
          <input
            className="w-1/3 p-1"
            type="text"
            placeholder="He's a good dog brandt"
            onChange={(event) => {
              send("INPUT", {
                value: event.target.value,
              });
            }}
          />
        </label>
        <br />
        <br />
        <label>
          <span className="pr-6">This validates on blur:</span>
          <input
            className="w-1/3 p-1"
            type="text"
            placeholder="numbers only!"
            onBlur={(event) => {
              send("BLUR", {
                value: event.target.value,
              });
            }}
          />
        </label>
      </div>
      <button
        className="bg-purple-500 text-gray-50 p-4 m-8"
        onClick={() => send({ type: "CLOSE" })}
      >
        Go back
      </button>
    </div>
  );
};

export default ExampleTwo;
