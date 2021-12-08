import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ReadingItem from "./components/ReadingItem/ReadingItem";
import Navbar from "./components/Navbar/Navbar";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { Dash } from "react-bootstrap-icons";
import { Container, Button } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
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
