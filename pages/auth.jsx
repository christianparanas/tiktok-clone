import { useState } from "react";

import LogIn from "components/LogIn";
import SignUp from "components/SignUp";

export default function Auth() {
  const [isNewUser, setNewUser] = useState(false);
  const [user, setUser] = useState(null);

  return isNewUser ? <SignUp user={user} /> : <LogIn setUser={setUser} setNewUser={setNewUser} />;
}
