export function setCookie(name: string, val: string, session: boolean) {
	const date = new Date();
	const value = val;

	if (session) {
		document.cookie = name + '=' + value + '; path=/';
	} else {
		date.setTime(date.getTime() + 60 * 60 * 10 * 1000);
		document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
	}
}

export function getCookie(name: string) {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');

	if (parts.length == 2) {
		const val = parts.pop()?.split(';').shift();
		return val ? val : '';
	}
}
