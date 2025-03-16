import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const MAX_CHARS = 200;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload, count: action.payload.length };
    case "TO_UPPERCASE":
      return { ...state, text: state.text.toUpperCase() };
    case "TO_LOWERCASE":
      return { ...state, text: state.text.toLowerCase() };
    default:
      return state;
  }
};

function useCharacterCount() {
  const [state, dispatch] = useReducer(reducer, { text: "", count: 0 });

  const handleChange = useCallback((e) => {
    if (e.target.value.length <= MAX_CHARS) {
      dispatch({ type: "SET_TEXT", payload: e.target.value });
    }
  }, []);

  return { state, dispatch, handleChange };
}

export default function CharacterCounter() {
  const { state, dispatch, handleChange } = useCharacterCount();
  const [warning, setWarning] = useState("");

  const progressPercentage = useMemo(() => (state.count / MAX_CHARS) * 100, [state.count]);

  const progressColor = useMemo(() => {
    if (progressPercentage >= 100) return "bg-red-500";
    if (progressPercentage >= 90) return "bg-orange-400";
    return "bg-cyan-500";
  }, [progressPercentage]);

  useEffect(() => {
    if (progressPercentage >= 90 && progressPercentage < 100) {
      setWarning("⚠️ You're close to the limit!");
    } else if (progressPercentage >= 100) {
      setWarning("❌ Maximum limit reached!");
    } else {
      setWarning("");
    }
  }, [progressPercentage]);

  return (
    <div className="max-w-md mx-auto text-center text-white p-5">
      <h2 className="text-3xl font-bold mt-10">Character Counter</h2>

      <textarea
        className="w-full h-36 p-3 mt-10 text-lg rounded-lg border-none outline-none bg-gray-800 text-white resize-none transition focus:ring-2 focus:ring-cyan-500"
        maxLength={MAX_CHARS}
        placeholder="Type something..."
        value={state.text}
        onChange={handleChange}
      />

      <div className={`mt-2 text-lg font-semibold ${progressPercentage >= 100 ? "text-red-500" : progressPercentage >= 90 ? "text-orange-400" : ""}`}>
        {state.count} / {MAX_CHARS}
      </div>

      {warning && <p className="mt-1 text-orange-400">{warning}</p>}

      <div className="w-full h-3 bg-gray-700 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-full transition-all ${progressColor}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
          onClick={() => dispatch({ type: "TO_UPPERCASE" })}
        >
          <FontAwesomeIcon className="icon" icon={faArrowUp} />
          TO UPPERCASE
        </button>

        <button
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
          onClick={() => dispatch({ type: "TO_LOWERCASE" })}
        >
          <FontAwesomeIcon className="icon" icon={faArrowDown} />
          to lowercase
        </button>
      </div>
    </div>
  );
}