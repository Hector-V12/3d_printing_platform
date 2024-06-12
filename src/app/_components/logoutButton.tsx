import React from 'react';

interface ButtonProps {
    text: string;
    OnClick?: () => void;
}

const LogoutButton: React.FC<ButtonProps> = ({ text, OnClick }) => {
    return (
        <button onClick={OnClick} className=" btn glass dark:text-slate-800 bg-red-500 hover:bg-red-700 text-gray-200  focus:outline-none transition-colors duration-300 ease-in-out ">
            {text}
        </button>
    );
};

export default LogoutButton;
