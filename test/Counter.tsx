"use client";
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const decrease = () => {
    setCount((prev) => prev - 1);
  };

  const restart = () => {
    setCount(0);
  };
  return (
    <div className="border m-auto flex flex-col items-center p-10 gap-4">
      <p>
        Count: <span data-testid="count-value">{count}</span>
      </p>
      <div className="text-white">
        <button className="border bg-gray-500 min-w-[100px]" onClick={increase}>
          increase
        </button>
        <button className="border bg-gray-500 min-w-[100px]" onClick={decrease}>
          Decrease
        </button>
        <button className="border bg-gray-500 min-w-[100px]" onClick={restart}>
          reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
