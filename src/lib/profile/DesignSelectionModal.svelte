<script lang="ts">
	import { getContext } from 'svelte';
	import type { user, design_examples } from '$lib/interface';
	import type { Writable } from 'svelte/store';
	import { getRequest } from '$lib/util/Requests';

	const token: Writable<string> = getContext('currentAuthToken');

	let currentToken;
	let designs: design_examples[] = [];

	var testUrl: string;

	token.subscribe((newVal) => {
		getDesigns(newVal);
	});

	async function getDesigns(token: string) {
		getRequest('/api/v1/profiles/designs/', token).then((newDesigns) => {
			console.log('Hello!');
			console.log(newDesigns);
			(<object[]>newDesigns).forEach((design: Object) => {
				var obj: design_examples = <design_examples>design;
				designs.push({
					example_url: obj.example_url,
					id: obj.id,
					name: obj.name,
					template_url: obj.template_url
				});
				testUrl = `http://localhost:8009${obj.example_url}`;
			});
		});
	}

	console.log(`Currently in dev mode: ${import.meta.env.DEV}`);
</script>

<img src={testUrl} alt="Hi!" />
