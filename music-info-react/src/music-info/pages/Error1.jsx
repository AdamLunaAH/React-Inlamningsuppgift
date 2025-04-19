import React from "react";

// Simple error page that displays an error message
export default function Error(prop) {
    const { msg } = prop.details;
    return (
        <div className="container px-4 py-4 text-start">
            <h2 className="pb-2 border-bottom">Error page</h2>
            <p>{msg}</p>
        </div>
    );
}
