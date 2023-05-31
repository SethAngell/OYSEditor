import type { option, optionsList, design } from '$lib/interface';

// I could do this with one loop and make it look really smart, or I could do it with two loops
// and actually grok what it does at a glance. I'm doing it with two loops.
export function generateOptionsList(options: design[]): optionsList {
	const newOptionsList = {
		options: [] as option[]
	} as optionsList;
	options.forEach((payload: design) => {
		newOptionsList.options.push({
			head: false,
			tail: false,
			payload: payload
		});
	});
	newOptionsList.options.forEach((option: option, index: number) => {
		switch (index) {
			case 0:
				option.head = true;
				option.next = newOptionsList.options[index + 1];
				break;
			case options.length - 1:
				option.tail = true;
				option.previous = newOptionsList.options[index - 1];
				break;
			default:
				option.next = newOptionsList.options[index + 1];
				option.previous = newOptionsList.options[index - 1];
				break;
		}
	});
	return newOptionsList;
}
