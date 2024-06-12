import React from 'react';
import whiteCart from '../../../public/cartWhiteIcon.svg';
import Image from 'next/image';

interface ButtonProps {
    text: string;
    OnClick?: () => void;
}

const BasketButton: React.FC<ButtonProps> = ({ text, OnClick }) => {
    return (

        <button type="submit"
            onClick={OnClick}
            className=" btn glass dark:bg-slate-100 dark:hover:bg-slate-400 dark:text-slate-800 bg-stone-700 hover:bg-stone-950 text-gray-200  focus:outline-none transition-colors duration-300 ease-in-out my-3">
            <Image alt="whiteCartIcon" src={whiteCart} />
            {text}
        </button>
    );
};

export default BasketButton;
