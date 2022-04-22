import { useEffect, useState } from "react";
import db from "lib/firebase";
import { removeWhiteSpace } from "lib/validate";


export default function SignUp({ user }) {
  const [isTaken, setTaken] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      console.log("Authenticated ", user);

      const defaultUsername = removeWhiteSpace(user.displayName);
      setUsername(defaultUsername);
    }
  }, [user]);

  useEffect(() => {
    const u = removeWhiteSpace(username);

    async function checkUsername() {
      if (u.length >= 3 && u.length <= 20) {
        const ref = db.doc(`usernames/@${u}`);
        const { exists } = await ref.get();
        setTaken(exists);
      }
    }

    if (u) {
      checkUsername();
    }
  }, [username]);

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="signup-header-title">Sign up</div>
      </header>
      <form className="signup-form">
        <div className="signup-form-inner">
          <div className="signup-form-title">Create username</div>
          <div className={`signup-input ${isTaken ? "signup-error" : ""}`}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <div className="signup-error-icon"></div>
          </div>
          <div className="signup-error-text">
            {isTaken
              ? "Username is already taken."
              : "You can always change this later."}
          </div>
        </div>
        <button type="submit" className="signup-submit" disabled={isTaken}>
          Sign up
        </button>
      </form>
    </div>
  );
}
