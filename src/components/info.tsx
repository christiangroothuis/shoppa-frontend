import { ReactComponent as Download } from "../assets/icons/external-link.svg";
import React from "react";

const Info = () => {
	return (
		<div>
			<h1 className="text-5xl font-bold mb-5">Info</h1>
			Deze website is gemaakt door Christian Groothuis, Aram Jegoian, Kuba
			Pelka, Pepijn Weijerman en Troy van Wezel voor het vak informatica.
			<br></br>
			DRIP is een webshop dat producten verkoopt uit verschillende
			categorieën bestaande uit onder andere: schoenen, kleding,
			accessoires, elektronica, tassen en horloges.<br></br>
			Ons doel is om onze klanten blij te maken met een groot assortiment
			van producten, die makkelijk te verkrijgen zijn via onze website.
			<br></br>
			De naam "Drip" is een referentie naar het woord "dripping" uit het
			Engels dat in de Verenigde Staten is gepopulariseerd, door middel
			van dit woord wordt er aangeduid dat iemands outfit zeer in de mode
			is.<br></br>
			Wij hebben voor deze naam gekozen, omdat wij in eerste instantie een
			streetwear webshop wilden maken, echter hebben wij later gekozen om
			een groter assortiment te implementeren.<br></br>
			<br></br>
			<h1 className="text-5xl font-bold mb-5">Bestanden</h1>
			<div className="flex flex-col flex-wrap">
				<a
					target="_blank"
					rel="noreferrer"
					href="http://informatica.gymnasiumbreda.nl/informatica/leerlingenwebsites/IN2021/ProjectWebsites/Drip/backend/public/documenten/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Projectplan
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					SRD
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Designdocument
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Databasedocument
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Planning & Taakverdeling
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Logboeken
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Testrapporten
					<Download className="ml-2" />
				</a>
			</div>
			<br></br>
			<br></br>
			<br></br>
			<h1 id="disclaimer" className="text-5xl font-bold mb-5">
				Disclaimer
			</h1>
			DRIP is een fictieve webshop.<br></br>
			De producten die te koop staan op de website worden niet geleverd.
			<br></br>
			Wij claimen geen enkel recht op de afbeeldingen die gehrefond worden
			op de website.<br></br>
			Alle rechten voorbehouden aan de respectievelijke eigenaren van
			auteursrechten.<br></br>
		</div>
	);
};

export default Info;
