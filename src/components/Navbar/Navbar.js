import React from "react";
import "./NavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

function NavBar() {
    return (
        <div class="container-fluid g-0" className="navbarDiv">
            <div class="row g-0 justify-content-center">
                <Navbar
                    class="navbar navbar-light  p-2 ps-5"
                    style={{ backgroundColor: "#E7A148" }}
                    variant="light"
                >
                    <Container fluid>
                        <div>
                            <Navbar.Brand
                                as={NavLink}
                                exact
                                to="/"
                                className="work-sans-brand ms-5"
                                style={{ fontSize: "32px" }}
                            >
                                Reading Pal
                            </Navbar.Brand>
                        </div>
                        <div class="nav pe-3">
                            {/* Add */}
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
                            {/* Wishlist */}
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
                            {/* Stats */}
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

                        <div
                            class="modal fade"
                            id="addModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5
                                            class="modal-title"
                                            id="exampleModalLabel"
                                        >
                                            Add Book
                                        </h5>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div class="modal-body align-items-center">
                                        <div class="row g-3 align-items-center">
                                            <div class="col-auto mx-auto">
                                                <label
                                                    for="inputPassword6"
                                                    class="col-form-label"
                                                >
                                                    Current Page:
                                                </label>
                                            </div>
                                            <div class="col-auto">
                                                <input
                                                    type="text"
                                                    id="inputPassword6"
                                                    class="form-control"
                                                    aria-describedby="passwordHelpInline"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
}

export default NavBar;
