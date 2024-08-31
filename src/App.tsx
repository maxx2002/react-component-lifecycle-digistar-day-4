import React from "react";
import "./App.css";

interface AppState {
  email: string;
  password: string;
  isLoggedIn: boolean;
  showModal: boolean;
  error: string;
  emailError: string;
  passwordError: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      showModal: false,
      error: "",
      emailError: "",
      passwordError: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as unknown as Pick<AppState, keyof AppState>);
  };

  validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const dummyEmail = "user@example.com";
    const dummyPassword = "Password123";

    let emailError = "";
    let passwordError = "";

    if (!this.validateEmail(email)) {
      emailError = "Invalid email format";
    }

    if (!this.validatePassword(password)) {
      passwordError =
        "Password must be at least 8 characters long, contain a capital letter and a number";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError, error: "" });
      return;
    }

    if (email === dummyEmail && password === dummyPassword) {
      this.setState({
        isLoggedIn: true,
        showModal: true,
        error: "",
        emailError: "",
        passwordError: "",
      });
    } else {
      this.setState({
        error: "Invalid email or password",
        emailError: "",
        passwordError: "",
      });
    }
  };

  handleLogout = () => {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false,
      showModal: false,
      error: "",
      emailError: "",
      passwordError: "",
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      email,
      password,
      isLoggedIn,
      showModal,
      error,
      emailError,
      passwordError,
    } = this.state;

    return (
      <div className="App">
        {!isLoggedIn ? (
          <div className="login-form">
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              placeholder="Email"
            />
            {emailError && <p className="individual-error">{emailError}</p>}

            <label htmlFor="password" style={{ marginTop: "16px" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              placeholder="Password"
            />
            {passwordError && (
              <p className="individual-error">{passwordError}</p>
            )}

            {error && <p className="error">{error}</p>}
            <button onClick={this.handleLogin}>Login</button>
          </div>
        ) : (
          <div className="logout-section">
            <button className="logout-button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Login Successful!</h2>
              <p>Welcome, {email}!</p>
              <button onClick={this.closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
