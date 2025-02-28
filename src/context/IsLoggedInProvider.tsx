import React from "react";
import isLoggedInContext from "./Contexts.ts"


const IsLoggedInProvider = ({children}:{children:any}) =>{
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    return(
        <isLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </isLoggedInContext.Provider>
    )
}


export default IsLoggedInProvider;































