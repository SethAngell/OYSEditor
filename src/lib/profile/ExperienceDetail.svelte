<script lang="ts">
	import SvgIcon from '$lib/util/SvgIcon.svelte';
	import type { experience } from '$lib/interface';
	import ExperienceForm from '$lib/profile/ExperienceForm.svelte';

	export let Experience: experience;

	const state = {
		editing: false,
	};

	function edit() {
		state.editing = !state.editing;
	}

	function handleSaveExperience(saveEvent: CustomEvent) {
		state.editing = false;
	}
</script>

{#if state.editing}
	<ExperienceForm {Experience} on:SAVE-EXPERIENCE={handleSaveExperience}></ExperienceForm>
{:else}
	<button
		class="flex flex-col p-2 cursor-pointer rounded-md hocus:bg-slate-200 hocus:ring-2 hocus:ring-purple-500"
		on:click={edit}>
		<div class="flex flex-row justify-between w-full">
			<h2 class="text-xl font-bold">{Experience.title}</h2>
			<SvgIcon icon="edit" button={true} color="slate" hover={true} additionalClasses="h-4"
			></SvgIcon>
		</div>
		<div class="flex flex-row w-full justify-between">
			<h3>{Experience.company}</h3>
			{#if Experience.present}
				<span>{Experience.start_year} - Present</span>
			{:else}
				<span>{Experience.start_year} - {Experience.end_year}</span>
			{/if}
		</div>
		<p class="mt-2 text-left">{Experience.description}</p>
	</button>
{/if}
