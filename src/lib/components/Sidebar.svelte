<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	const base_option_style = 'hocus:bg-slate-300 w-full p-2 rounded-lg';

	let selected_element: string = 'sidebar-profile';

	onMount(async () => {
		dispatchNewSidebarSelection(selected_element);
	});

	function selectSidebarElement(event: MouseEvent | KeyboardEvent) {
		const selectedButon = <HTMLButtonElement>event.target;
		selected_element = selectedButon.id;
		dispatchNewSidebarSelection(selectedButon.id);
	}

	function dispatchNewSidebarSelection(buttonId: string) {
		const currentElement = buttonId.split('-').pop();
		dispatch('new-sidebar-selection', {
			selection: currentElement,
		});
	}
</script>

<div class="p-2 rounded-tl-lg rounded-bl-lg flex flex-col gap-y-2 bg-slate-200">
	<button
		id="sidebar-profile"
		on:click={selectSidebarElement}
		tabindex="0"
		class={selected_element == 'sidebar-profile'
			? `${base_option_style} bg-slate-400`
			: `${base_option_style}`}>Profile</button>
	<button
		id="sidebar-experience"
		on:click={selectSidebarElement}
		tabindex="0"
		class={selected_element == 'sidebar-experience'
			? `${base_option_style} bg-slate-400`
			: `${base_option_style}`}>Experience</button>
	<button
		id="sidebar-blog"
		on:click={selectSidebarElement}
		tabindex="0"
		class={selected_element == 'sidebar-blog'
			? `${base_option_style} bg-slate-400`
			: `${base_option_style}`}>Blog</button>
	<button
		id="sidebar-content"
		on:click={selectSidebarElement}
		tabindex="0"
		class={selected_element == 'sidebar-content'
			? `${base_option_style} bg-slate-400`
			: `${base_option_style}`}>Content</button>
</div>
