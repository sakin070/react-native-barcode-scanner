import React from "react";

export const AuthContext = React.createContext(
    {
        signIn: async (data) => {   },
        logout: () => {   },
        signUp: async (data) => {  },
    }
);
