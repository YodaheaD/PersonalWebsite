import { render } from "preact";
import "./style.css";
import { useState } from "preact/hooks";

export function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return (
    <div class=" p-24 py-32 flex flex-col gap-4 items-center justify-center">
      <section>
        <div class="flex  flex-col gap-4 items-center justify-center">
          <div class={`flex flex-row gap-8 justify-evenly w-full `}>
            <img src="/preact.png" alt="Preact logo" height="160" width="160" />
            <h1 class="text-5xl font-semibold flex flex-col font-sans my-auto">
              <span>Preact</span>
              <span>Starter</span>
            </h1>
          </div>
          {/** Increment Button */}
          <button
            class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={increment}
          >
            Increment Count: {count}
          </button>{" "}
        </div>
      </section>
    </div>
  );
}

render(<App />, document.getElementById("app"));
