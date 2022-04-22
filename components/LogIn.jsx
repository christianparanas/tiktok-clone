import db, { auth, googleAuthProvider } from "lib/firebase";

export default function LogIn({ setUser, setNewUser }) {
  async function signIn() {
    const data = await auth.signInWithPopup(googleAuthProvider);

    if (data) {
      checkUser(data.user.uid);
      setUser(data.user)
    }
  }

  const checkUser = async (uid) => {
    const usernameRef = db.collection("usernames").where("uid", "==", uid);
    const querySnapshopt = await usernameRef.get();
    setNewUser(querySnapshopt.empty)
  };

  return (
    <div className="login-container">
      <header className="login-header"></header>
      <div className="login-wrapper">
        <div className="login-options-container">
          <div className="login-title-container">
            <div className="login-title">Sign up for Tiktok</div>
          </div>

          <div className="login-options">
            <LoginOption src="/assets/email.png" text="Use phone or email" />
            <LoginOption
              src="/assets/facebook.png"
              text="Continue with Facebook"
            />
            <LoginOption
              src="/assets/google.png"
              text="Continue with Google"
              onClick={signIn}
            />
            <LoginOption
              src="/assets/twitter.png"
              text="Continue with Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginOption({ text, src, onClick }) {
  return (
    <div className="login-option-wrapper" onClick={onClick}>
      <div className="login-option-icon-wrapper">
        <img src={src} alt={text} className="login-option-icon" />
      </div>
      <div className="login-option-text">{text}</div>
    </div>
  );
}
