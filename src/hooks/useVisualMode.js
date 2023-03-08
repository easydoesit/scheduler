import { useState, useCallback } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = useCallback((newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      setHistory([initial]);
    }

    setHistory(history => [...history, newMode]);

  })

  const back = useCallback(() => {
    if (history.length > 1) {

      setMode(history[history.length - 2]);

      setHistory(() => {
        const copyHistory = [...history]
        copyHistory.pop();
        return copyHistory;
      })
    }
  })

  return { mode, transition, back };

}
