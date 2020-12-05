const Container = ({
	children,
	className,
}: {
	children: any;
	className?: string;
}) => {
	return (
		<div className={`container px-4 mx-auto ${className || ""}`}>
			{children}
		</div>
	);
};

export default Container;
