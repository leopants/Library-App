import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Stats from "./components/Stats/Stats";
import Lists from "./components/Lists/Lists";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import ReadingItem from "./components/ReadingItem/ReadingItem";
import Navbar from "./components/NavBar/NavBar";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { Dash } from "react-bootstrap-icons";
import { Container, Button } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
    return (
        <Container
            fluid
            className=" g-0 align-items-center justify-content-center"
            style={{ minHeight: "100vh", backgroundColor: "#F3E9D4" }}
        >
            <div>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/"
                                component={Dashboard}
                            />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/stats" component={Stats} />
                            <Route exact path="/lists" component={Lists} />
                            <Route exact path="/profile" component={Profile} />
                            <Route
                                exact
                                path="/forgot-password"
                                component={ForgotPassword}
                            />
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}
