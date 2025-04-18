import React from "react";
import { Container } from "react-bootstrap";
import ColorMode from "./colorMode";
import { ErrorBoundary } from "react-error-boundary";

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <Container>
                <footer className="py-3 my-4">
                    <p className="text-center text-body-secondary border-top pt-3 mt-4">
                        &copy; 2025 Snow Production Studios
                    </p>
                </footer>
            </Container>

            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <ColorMode />
            </ErrorBoundary>
        </>
    );
}
