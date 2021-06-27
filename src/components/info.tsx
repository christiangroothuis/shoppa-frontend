import { ReactComponent as Download } from "../assets/icons/external-link.svg";

const Info = () => {
	return (
		<div>
			<h1 className="text-5xl font-bold mb-5">Info</h1>
			Deze website is gemaakt door Christian Groothuis voor het vak
			informatica.
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
			Er is deze naam gekozen, omdat dit in eerste instantie een
			streetwear webshop was, echter is later gekozen om een groter
			assortiment te implementeren.<br></br>
			<br></br>
			<h1 className="text-5xl font-bold mb-5">Bestanden</h1>
			<div className="flex flex-col flex-wrap">
				<a
					target="_blank"
					rel="noreferrer"
					href="/backend/documenten/SRD.docx"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					SRD
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/backend/documenten/Designdocument.pdf"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Designdocument
					<Download className="ml-2" />
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="/backend/documenten/database_ontwerp.jpg"
					className="clickable flex justify-center mr-5 px-10 py-4 mt-3 w-88 font-medium text-white  bg-black rounded-xl text-xl"
				>
					Databasedocument
					<Download className="ml-2" />
				</a>
			</div>
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
