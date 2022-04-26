import Loader from "components/Loader";
import db, { auth } from "lib/firebase";
import { useRouter } from 'next/router'
import { createContext, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if(!loading && user == null) router.push('/auth')
    
    router.push('/')
  }, [loading]);

  if(loading) return <Loader />

  return (
    <UserContext.Provider value={[user, loading, error]}>
      {children}
    </UserContext.Provider>
  );
}

export default function useAuthUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useAuthUser must be used with UserContext.Provider");
  }

  return context;
}
