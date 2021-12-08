import React from "react";
import "./Navbar.css";
import logo from "../../logo.png";
const axios = require("axios");

function Navbar() {
    return (
        <div class="container-fluid" className="navbarDiv">
            <div class="row g-0">
                <nav class="navbar navbar-light bg-white p-2 ps-4">
                    <div>
                        <a class="navbar-brand" href="#">
                            <img
                                src={logo}
                                alt=""
                                width="30"
                                class="d-inline-block align-text-top me-2"
                            />
                            Book Club
                        </a>
                    </div>
                    <div class="nav pe-4">
                        {/* Add */}
                        <li
                            class="d-flex nav-item pe-4"
                            data-bs-toggle="modal"
                            data-bs-target="#addModal"
                        >
                            <a class="nav-link" href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-plus-lg"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                                </svg>
                            </a>
                        </li>
                        {/* Wishlist */}
                        <li class="d-flex nav-item pe-4">
                            <a class="nav-link" href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-star-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </a>
                        </li>
                        {/* Stats */}
                        <li class="d-flex nav-item">
                            <a class="nav-link" href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-bar-chart-line-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
                                </svg>
                            </a>
                        </li>
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
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
