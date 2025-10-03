import React, { useReducer } from "react";
import { DarkModeContext } from "./darkModeContext";
import DarkModeReducer from "./darkModeReduce";

export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, { darkMode: false });

    return (
        <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    );
};
