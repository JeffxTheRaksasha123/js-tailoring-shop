import { useState } from "react";
import { TapeIcon, NeedleThreadIcon, ScissorsIcon, ButtonIcon } from "./Icons";

function LoginPage({
  loginType,
  setLoginType,
  username,
  setUsername,
  password,
  setPassword,
  loginError,
  setLoginError,
  handleLogin,
  handleCustomerLogin,
  handleRegister,
  handleGoogleLogin,
}) {
  const [mode, setMode] = useState("login"); // "login" o "register"
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleUnifiedSubmit = (e) => {
    if (loginType === "admin") {
      handleLogin(e);
    } else {
      handleCustomerLogin(e);
    }
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegister({ name: regName, username: regUsername, password: regPassword });
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="stitch-line" aria-hidden="true" />
        <TapeIcon className="motif motif-tape" aria-hidden="true" />
        <NeedleThreadIcon className="motif motif-needle" aria-hidden="true" />
        <ScissorsIcon className="motif motif-scissors" aria-hidden="true" />
        <ButtonIcon className="motif motif-button-a" aria-hidden="true" />
        <ButtonIcon className="motif motif-button-b" aria-hidden="true" />

        <div className="login-visual-content">
          <p className="shop-kicker">Odiong Roxas Or.Mindoro</p>
          <h1 className="shop-name">
            J&rsquo;s Tailoring <em>Shop</em>
          </h1>
          <p className="shop-tagline">
            Reserve na, dumango ka!
          </p>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-card">
          {mode === "login" ? (
            <>
              <h2 className="login-title">Mag-login</h2>
              <p className="login-subtitle">
                I-login ang account mo para makapag-reserve o mag-manage.
              </p>

              <form onSubmit={handleUnifiedSubmit} noValidate>
                <label className="field-label" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="field-input"
                  placeholder="Ilagay ang username mo"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="field-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="field-input"
                  placeholder="Ilagay ang password mo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="field-label" htmlFor="signInAs">
                  Sign in as
                </label>
                <select
                  id="signInAs"
                  className="field-select"
                  value={loginType}
                  onChange={(e) => {
                    setLoginType(e.target.value);
                    setLoginError("");
                  }}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>

                {loginError && <p className="field-error">{loginError}</p>}

                <button type="submit" className="btn-primary w-full">
                  Mag-login
                </button>
              </form>

              <div className="divider-or">
                <span>o</span>
              </div>

              <button
                type="button"
                className="btn-google w-full"
                onClick={handleGoogleLogin}
              >
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <p className="switch-mode-text">
                Wala ka pang account?{" "}
                <button
                  type="button"
                  className="switch-mode-link"
                  onClick={() => {
                    setMode("register");
                    setLoginError("");
                  }}
                >
                  Gumawa ng account
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="login-title">Gumawa ng Account</h2>
              <p className="login-subtitle">
                I-fill up ang detalye mo para makapag-reserve.
              </p>

              <form onSubmit={onRegisterSubmit} noValidate>
                <label className="field-label" htmlFor="reg-name">
                  Buong Pangalan
                </label>
                <input
                  id="reg-name"
                  type="text"
                  className="field-input"
                  placeholder="Juan Dela Cruz"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />

                <label className="field-label" htmlFor="reg-username">
                  Username
                </label>
                <input
                  id="reg-username"
                  type="text"
                  className="field-input"
                  placeholder="Pumili ng username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />

                <label className="field-label" htmlFor="reg-password">
                  Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  className="field-input"
                  placeholder="Pumili ng password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />

                {loginError && <p className="field-error">{loginError}</p>}

                <button type="submit" className="btn-primary w-full">
                  Gumawa ng Account
                </button>
              </form>

              <p className="switch-mode-text">
                May account ka na?{" "}
                <button
                  type="button"
                  className="switch-mode-link"
                  onClick={() => {
                    setMode("login");
                    setLoginError("");
                  }}
                >
                  Mag-login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;