<script lang="ts">
	import { getContext } from 'svelte';
	import type { user, design_examples } from '$lib/interface';
	import type { Writable } from 'svelte/store';
	import { getRequest } from '$lib/util/Requests';
	import { getDesigns } from './profileUtils';

	const token: Writable<string> = getContext('currentAuthToken');

	let currentToken;
	let designs: design_examples[] = [];

	var testUrl: string;

	token.subscribe((newVal) => {
		getDesigns(newVal).then((retrievedDesigns: design_examples[]) => {
			designs = retrievedDesigns;
		});
	});

	console.log(`Currently in dev mode: ${import.meta.env.DEV}`);
</script>

<img src={testUrl} alt="Hi!" />
