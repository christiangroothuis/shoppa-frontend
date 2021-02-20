import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Check } from "../assets/icons/check.svg";

const Return = () => {
    return (
        <div>
            <h1 className="text-5xl font-bold mb-5 text-center">Bedankt voor uw bestelling!</h1>
            <div className="text-center">Zodra wij uw (fictieve) betaling ontvangen hebben, gaan wij zo spoedig mogelijk uw bestelling klaarmaken.<br></br>
            U krijgt een bevestigingsmail van uw bestelling gestuurd naar uw e-mailadres.</div>
            <div className="w-full mx-auto flex justify-center">
                <div className="w-28 h-28 p-1 inline-flex rounded-full bg-green-600 items-center justify-center mt-10">
                    <Check className="text-white stroke-4 h-3/4"/>
                </div></div>
        </div>
    );
};

export default Return;
