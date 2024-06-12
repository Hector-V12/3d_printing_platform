import Image from "next/image";
import React from "react";
import LogoGarage from "../../../public/GarageLogoLoading.svg"

const IsLoading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-t from-linear2 to-linear1 dark:bg-gray-900">
            <Image src={LogoGarage} alt="loading" className="animate-pulse" width={80} />
        </div>
    );
};

export default IsLoading;
