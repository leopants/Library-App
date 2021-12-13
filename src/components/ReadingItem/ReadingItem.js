import React from "react";
import "./ReadingItem.css";
import "../NavBar/NavBar";
import logo from "../../logo.png";
import Navbar from "../NavBar/NavBar";
import Dashboard from "../Dashboard/Dashboard";
const axios = require("axios");

const handleCompleted = (event) => {};

function ReadingItem(props) {
    return (
        <div class="row g-0">
            <div class="card">
                <div class="card-body row g-0">
                    <div class="col me-4">
                        <img src={logo} class="img-fluid" alt="..." />
                    </div>
                    <div class="col ms-4 me-3">
                        <div>
                            <h5 class="card-title mb-0 mt-4">Book Title</h5>
                            <h6 class="card-title mb-4">Book Author</h6>
                            <div class="progress">
                                <div
                                    class="progress-bar"
                                    role="progressbar"
                                    style={{ width: "90%" }} //make this a props value that is passed in on start
                                ></div>
                            </div>
                            <div class="mt-4">
                                <a
                                    href="#"
                                    class="btn btn-primary me-2 mt-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#updateModal"
                                >
                                    Update
                                </a>
                                <a
                                    onClick={handleCompleted}
                                    class="btn btn-primary me-2 mt-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#completeModal"
                                >
                                    Completed
                                </a>
                                <a
                                    href="#"
                                    class="btn btn-secondary me-0 mt-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dnfModal"
                                >
                                    DNF
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="updateModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Update Page Count
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
                                <button type="button" class="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="completeModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Completed?
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
                                        <div class="form-check">
                                            <label
                                                class="form-check-label align-middle"
                                                for="act"
                                                style={{ fontSize: "1.25rem" }}
                                            >
                                                Are you sure you have completed
                                                the book?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="button" class="btn btn-primary">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="dnfModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    DNF?
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
                                        <div class="form-check">
                                            <label
                                                class="form-check-label align-middle"
                                                for="dnf"
                                                style={{ fontSize: "1.25rem" }}
                                            >
                                                Are you sure you did not finish
                                                the book?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="button" class="btn btn-primary">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadingItem;
