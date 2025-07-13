import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const FocusTapGame = () => {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const id = Math.random();
      const isGood = Math.random() > 0.4; // 60% chance of green
      const newTarget = {
        id,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
        isGood,
      };
      setTargets((prev) => [...prev.slice(-4), newTarget]); // keep last 4
      setTimeout(() => {
        setTargets((prev) => prev.filter((t) => t.id !== id));
      }, 1200);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const handleTap = (target) => {
    if (!active) return;
    if (target.isGood) {
      setScore((s) => s + 1);
    } else {
      setScore((s) => (s > 0 ? s - 1 : 0));
    }
    setTargets((prev) => prev.filter((t) => t.id !== target.id));
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-mono">
      <h2 className="text-2xl mb-4 text-gray-800">🎯 Focus Tap Game</h2>
      <p className="mb-4 text-gray-700">Tap only the <span className="text-green-600 font-bold">green</span> circles!</p>
      <div className="relative w-[90vw] h-[60vh] bg-white rounded-lg border shadow overflow-hidden">
        {targets.map((target) => (
          <div
            key={target.id}
            onClick={() => handleTap(target)}
            className={`w-12 h-12 rounded-full absolute cursor-pointer transition-all duration-200 border-4
              ${target.isGood ? "bg-green-400 border-green-700" : "bg-red-400 border-red-700"}`}
            style={{ top: `${target.y}%`, left: `${target.x}%` }}
          ></div>
        ))}
      </div>
      <div className="mt-6 text-lg text-gray-700">Score: <span className="font-bold">{score}</span></div>
      <button
        onClick={() => {
          setScore(0);
          setTargets([]);
          setActive((a) => !a);
        }}
        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition"
      >
        {active ? "Pause" : "Start"}
      </button>
    </div>
    <Footer />
    </>
  );
};

export default FocusTapGame;