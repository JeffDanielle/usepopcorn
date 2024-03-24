import { useState } from "react";
const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box overflow-hidden">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && (
                children
            )}
        </div>
    );
}

export default Box;