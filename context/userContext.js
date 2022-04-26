import Loader from "components/Loader";
import db, { auth } from "lib/firebase";
import { useRouter } from "next/router";
import { createContext, useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const router = useRouter();

  const [user, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ref = db.doc(`users/${user?.uid}`);

    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData({ id: doc.id, ref: doc.ref, ...doc.data() });
        }
      })
      .catch((error) => console.error("Error Fetching Current User Data."))
      .finally(() => setLoading(false));
  }, [user]);

  // check if authenticated
  useEffect(() => {
    if (!isLoading && user == null) router.push("/auth");

  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <UserContext.Provider value={[userData, isLoading, error]}>
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
