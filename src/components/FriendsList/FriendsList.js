import React from "react";
import "./FriendsList.css";
import "../NavBar/NavBar";
import FriendsListItem from "../FriendsListItem/FriendsListItem";

export default function FriendsList() {
    return (
        <div>
            <div
                class="row justify-content-center g-0 mt-0"
                style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    fontFamily: "Work Sans",
                }}
            >
                Friends Nook
            </div>
            <div class="row justify-content-center g-0 mt-5">
                <div class="row justify-content-center g-0 mt-0">
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                </div>
            </div>
        </div>
    );
}
