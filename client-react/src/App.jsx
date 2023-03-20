import { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import { FullSpinner } from "styles/app";
import { setAuthorizationHeader } from "api";
import UserContext from "contexts/UserContext";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const initUser = {
  token: null,
  role: "user",
};

class App extends Component {
  state = {
    user: initUser,
    message: "",
  };

  componentDidMount() {
    if (localStorage.filmsToken) {
      this.setState({
        user: {
          token: localStorage.filmsToken,
          role: jwtDecode(localStorage.filmsToken).user.role,
        },
      });
      setAuthorizationHeader(localStorage.filmsToken);
    }
  }

  setMessage = (message) => this.setState({ message });

  login = (token) => {
    this.setState({ user: { token, role: jwtDecode(token).user.role } });
    localStorage.filmsToken = token;
    setAuthorizationHeader(token);
  };

  logout = () => {
    this.setState({ user: { token: null, role: "" } });
    delete localStorage.filmsToken;
    setAuthorizationHeader();
  };

  render() {
    const { user, message } = this.state;
    return (
      <Suspense fallback={<FullSpinner />}>
        <div className="ui container">
          <TopNavigation
            isAdmin={!!user.token && user.role === "admin"}
            logout={this.logout}
            isAuth={!!user.token}
          />

          {message && (
            <div className="ui info message">
              <i onClick={() => this.setMessage("")} className="close icon" />
              {message}
            </div>
          )}

          <Route exact path="/">
            <HomePage />
          </Route>

          <UserContext.Provider value={{ user }}>
            <Route path="/films" render={(props) => <FilmsPage {...props} />} />
          </UserContext.Provider>

          <Route path="/signup">
            <SignupPage setMessage={this.setMessage} />
          </Route>
          <Route path="/login">
            <LoginPage login={this.login} />
          </Route>
        </div>
      </Suspense>
    );
  }
}

export default App;
