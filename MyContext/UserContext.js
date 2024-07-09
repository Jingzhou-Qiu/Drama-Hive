import { createContext, useState } from 'react';
export default UserContext = createContext()

export function UserProvider({children}) {
    const[user, setUser] = useState(null);
    const[email, setEmail] = useState(null);
    const logout = ()=>{
        setEmail(null)
        setUser(null)
    }
    return (
    <UserContext.Provider value={{user, email, setUser, setEmail, logout}}>
        {children}
    </UserContext.Provider>
    )
}