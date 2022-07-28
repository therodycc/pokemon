import { Component } from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return ("Something went wrong");
        }

        return this.props.children;
    }
}

export default ErrorBoundary;