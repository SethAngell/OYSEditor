<script lang="ts">
	import { icons, viewboxes } from '$lib/util/icons';

	/** What icon should we display */
	export let icon: string;
	/** Any additional tailwind or CSS classes we'd like to apply */
	export let additionalClasses: string = '';
	/** what tailwind color should we apply (weight of 700) */
	export let color: string;
	/** Should this icon have a role of button */
	export let button: boolean = false;
	/** should this icon have a hover effect (color weight of 900) */
	export let hover: boolean = false;

	let viewboxValue: viewboxes = (<any>viewboxes)[icon];
	let iconValue: icons = (<any>icons)[icon];
</script>

<!--
	@component
	Any easier way to display a curated list of font-awesome icons within our application
-->
<svg
	class="fill-{color}-500 {hover
		? `hover:fill-${color}-900 group-hover:fill-${color}-900`
		: ''} {additionalClasses}"
	xmlns="http://www.w3.org/2000/svg"
	viewBox={viewboxValue}
	role={button ? 'button' : ''}
	on:keypress
	on:click>{@html iconValue}</svg>
