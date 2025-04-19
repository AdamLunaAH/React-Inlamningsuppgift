import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import MusicGroups from "../pages/MusicGroups";
import GroupInfo from "../pages/GroupInfo";
import Error from "../pages/Error";

// Main router for the app
export default function AppRouter() {
    return (
        <Routes>
            {/* Route for homepage */}
            <Route path="/" element={<Home />} />
            {/* Route for listing music groups */}
            <Route path="/musicgroups" element={<MusicGroups />} />
            {/* Route for specific group info by ID */}
            <Route path="/groupinfo/:id" element={<GroupInfo />} />
            {/* Catch-all route for unknown URLs */}
            <Route
                path="*"
                element={<Error details={{ msg: "Page not found" }} />}
            />
        </Routes>
    );
}
