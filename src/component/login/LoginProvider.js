import { createContext, useState } from 'react';

export const LoginContext=createContext(null);

export const LoginProvider =({ children })=>{ 
    const [isLoggedIn,setIsLoggedIn]=useState(!(localStorage.getItem('accessToken')===null));
    return (
        <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
};
