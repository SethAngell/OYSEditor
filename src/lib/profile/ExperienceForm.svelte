<script lang="ts">
	import { Label, Textarea, Input, Button } from 'flowbite-svelte';
	import type { experience } from '$lib/interface';
	import { createEventDispatcher } from 'svelte';
	import { EVENTS } from '$lib/CONSTANTS';

	export let Experience: experience;

	const dispatch = createEventDispatcher();

	async function onSubmit(e: SubmitEvent) {
		dispatch(EVENTS.SAVE_EXPERIENCE, { action: 'save' });
	}
	function cancel() {
		dispatch(EVENTS.SAVE_EXPERIENCE, { action: 'cancel' });
	}
</script>

<form
	class="flex flex-col p-2 w-full gap-y-1 rounded-md border-2 border-purple-500"
	on:submit|preventDefault={onSubmit}>
	<div class="flex flex-col">
		<Label class="mb-2 text-md uppercase" for="company">Company</Label>
		<Input class="mb-1 w-full" type="text" name="company" value={Experience.company} />
	</div>
	<div class="flex flex-col">
		<Label class="mb-2 text-md uppercase" for="title">Title</Label>
		<Input class="mb-1 w-full" type="text" name="title" value={Experience.title} />
	</div>
	<div class="flex flex-row gap-x-1 w-full">
		<div class="flex flex-col flex-grow">
			<Label class="mb-2 text-md uppercase" for="start_year">Start Year</Label>
			<Input class="mb-1 w-full" type="number" name="start_year" value={Experience.start_year} />
		</div>
		<div class="flex flex-col flex-grow">
			<Label class="mb-2 text-md uppercase" for="end_year">End Year</Label>
			<Input class="mb-1 w-full" type="number" name="end_year" value={Experience.end_year} />
		</div>
	</div>
	<div class="flex flex-col flex-grow">
		<Label class="mb-2 text-md uppercase" for="description">Description</Label>
		<Textarea class="mb-1 w-full" name="description" rows="4" value={Experience.description} />
	</div>
	<div class="flex flex-row gap-x-1">
		<Button outline color="purple" type="submit">Save</Button>
		<Button outline color="red" on:click={cancel}>Cancel</Button>
	</div>
</form>
