import { createContext, useState } from 'react';
export default UserContext = createContext()

export function UserProvider({children}) {
    const[user, setUser] = useState(null);
    const[phoneNumber, setPhoneNumber] = useState(null);

    return (
    <UserContext.Provider value={{user, phoneNumber, setUser, setPhoneNumber}}>
        {children}
    </UserContext.Provider>
    )
}