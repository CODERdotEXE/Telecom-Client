import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../pages/appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    
    useEffect(() => {
      checkUserStatus();
      setTimeout(() => {
        setLoading(false); // Set loading to false when done loading
      }, 2000);
      // Add event listener for beforeunload
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        // Remove event listener when component unmounts
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);
  
    // Function to handle the beforeunload event
    const handleBeforeUnload = () => {
      // Logout the user when the page is about to unload
      logoutUser();
    };
  


// Inside AuthProvider component
const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
  
      let accountDetails = await account.get();
  
      // If user's name is not set, update it in Appwrite
      if (!accountDetails.name && userInfo.name) {
        await account.updateName(userInfo.name);
        accountDetails.name = userInfo.name;
      }
  
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

    const logoutUser = () => {
        account.deleteSession('current')
        setUser(null)
    }

// Inside AuthProvider component
const registerUser = async (userInfo) => {
    setLoading(true);
  
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
  
      // Update user's name in Appwrite
      await account.updateName(userInfo.name);
  
      // Create a session
      await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
  
    setLoading(false);
  };
    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get()
            setUser(accountDetails)
        }catch(error){
            
        }


        setLoading(false)
    }
    
    const contextData ={
        user,
        loginUser,
        logoutUser,
        registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
             {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext;