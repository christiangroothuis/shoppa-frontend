const Spinner = ({ className }: { className?: string }) => (
	<svg viewBox="25 25 50 50" className={`spinner ${className}`}>
		<circle cx="50" cy="50" r="20"></circle>
	</svg>
);

export default Spinner;
