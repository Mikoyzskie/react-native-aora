import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite"
import { useState, useContext, useEffect, createContext, Children, SetStateAction } from "react"

const GlobalContext = createContext<null | any>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = (({ children }: { children: React.ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<Models.Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((res: Models.Document | undefined) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res)
        } else {
          setIsLoading(false);
          setUser(null)
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })

  }, [])

  return (
    <GlobalContext.Provider
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          isLoading
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  )
})

export default GlobalProvider;