<script lang="ts">
	import { icons, viewboxes } from '$lib/util/icons';

	export let icon: string;
	export let additionalClasses: string = '';
	export let color: string;
	export let button: boolean = false;
	export let hover: boolean = false;

	let viewboxValue: viewboxes = (<any>viewboxes)[icon];
	let iconValue: icons = (<any>icons)[icon];
</script>

<svg
	class="fill-{color}-700 {hover ? `hover:fill-${color}-900` : ''} {additionalClasses}"
	xmlns="http://www.w3.org/2000/svg"
	viewBox={viewboxValue}
	role={button ? 'button' : ''}
	on:keypress
	on:click>{@html iconValue}</svg>
