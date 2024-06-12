import React from 'react';

interface ButtonProps {
    text: string;
    OnClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ButtonProps> = ({ text, OnClick, type }) => {
    return (
        <button type={type} onClick={OnClick} className=" btn glass dark:bg-green-400 dark:hover:bg-green-800 dark:text-slate-800 bg-sky-500 hover:bg-sky-700 text-gray-200  focus:outline-none transition-colors duration-300 ease-in-out ">
            {text}
        </button>
    );
};

export default CustomButton;
