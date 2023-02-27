import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, bool = false) {
    setMode(newMode);
    if (!bool) {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length <= 1) return;
    setMode(history[history.length - 2]);
    history.pop();
  }

  return { mode, transition, back };
}
