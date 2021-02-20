import { ReactComponent as Download } from "../assets/icons/download.svg";
import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
    return (
        <div>
            <h1 className="text-5xl font-bold mb-5">Info</h1>
        Deze website is gemaakt door Christian Groothuis, Aram Jegoian, Kuba Pelka, Pepijn Weijerman en Troy van Wezel voor het vak informatica.<br></br>
        DRIP is een webshop dat producten verkoopt uit verschillende categorieën bestaande uit onder andere: schoenen, kleding, accessoires, elektronica, tassen en horloges.<br></br>
        Ons doel is om onze klanten blij te maken met een groot assortiment van producten, die makkelijk te verkrijgen zijn via onze website.<br></br>
        De naam "DRIP" is een referentie naar het woord "dripping" dat vaak in de Verenigde Staten wordt gebruikt door de jeugd om aan te duiden dat iemand zijn outfit zeer in de mode is.<br></br>
            <br></br>
            <br></br>
            <h1 id="disclaimer" className="text-5xl font-bold mb-5">Disclaimer</h1>
        DRIP is een fictieve webshop.<br></br>
        De producten die te koop staan op de website worden niet geleverd.<br></br>
        Wij claimen geen enkel recht op de afbeeldingen die getoond worden op de website.<br></br>
        Alle rechten voorbehouden aan de respectievelijke eigenaren van auteursrechten.<br></br>
            <br></br>
            <br></br>
            <h1 className="text-5xl font-bold mb-5">Bestanden</h1>
            <div className="flex flex-col flex-wrap">
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>Projectplan</Link>
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>SRD</Link>
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>Designdocument</Link>
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>Planning</Link>
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>Taakverdeling</Link>
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>Logboeken</Link>
                <Link
                    to="/"
                    className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-80 font-medium text-white  bg-black rounded-xl text-xl"
                ><Download className="mr-2"/>Testrapporten</Link>
            </div>
        </div>
    );
};

export default Info;
