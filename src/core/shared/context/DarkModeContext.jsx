import { createContext, useReducer } from "react";

// Context object
export const DarkModeContext = createContext();

// Reducer
const DarkModeReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE":
            return { darkMode: !state.darkMode };
        case "SET":
            return { darkMode: action.payload };
        default:
            return state;
    }
};

// ✅ Get initial state from localStorage
const getInitialDarkMode = () => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : false;
};

// Provider
export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, { darkMode: getInitialDarkMode() });

    // ✅ Save changes to localStorage
    const toggleDarkMode = () => {
        dispatch({ type: "TOGGLE" });
        localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
    };

    return (
        <DarkModeContext.Provider value={{ darkMode: state.darkMode, toggleDarkMode, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    );
};
