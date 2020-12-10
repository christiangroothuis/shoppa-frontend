const range = (input: number, start: number = 0, end: number = 50) => {
	const greenoutput = 118;
	const redoutput = 0;

	let output;

	if (input > end) {
		output = greenoutput;
	} else if (input < start) {
		output = redoutput;
	} else {
		output = (greenoutput / (end - start)) * (input - start);
	}

	return output;
};

export default range;
