import React from "react";
import "./NavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav
            class="navbar navbar-expand-lg navbar-light pt-1 pb-1"
            style={{ backgroundColor: "#E7A148" }}
        >
            <div class="container-fluid">
                <Navbar.Brand
                    as={NavLink}
                    exact
                    to="/"
                    className="work-sans-brand navbar-brand ms-5"
                    style={{ fontSize: "30px" }}
                >
                    Reading Pal
                </Navbar.Brand>
                <button
                    class="navbar-toggler me-4"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                    style={{ justifyContent: "end" }}
                >
                    <ul class="navbar-nav me-0 mb-2 mb-lg-0">
                        <div class="nav pe-3 ps-4">
                            <Nav.Link
                                as={NavLink}
                                exact
                                to="/"
                                className="work-sans-nav pe-5"
                                style={(isActive) => ({
                                    color: isActive ? "white" : "black",
                                })}
                            >
                                Dashboard
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/stats"
                                className="work-sans-nav pe-5"
                                style={(isActive) => ({
                                    color: isActive ? "white" : "black",
                                })}
                            >
                                Stats
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/lists"
                                className="work-sans-nav pe-5"
                                style={(isActive) => ({
                                    color: isActive ? "white" : "black",
                                })}
                            >
                                Lists
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/profile"
                                className="work-sans-nav pe-5"
                                style={(isActive) => ({
                                    color: isActive ? "white" : "black",
                                })}
                            >
                                Profile
                            </Nav.Link>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
