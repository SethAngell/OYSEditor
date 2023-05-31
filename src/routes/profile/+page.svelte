<script lang="ts">
	import DesignSelectionModal from '$lib/profile/DesignSelectionModal.svelte';

	function receiveSelectedDesign(event: CustomEvent) {
		console.log('NewDesign Selected: ', event.detail.design.payload);
	}
</script>

<DesignSelectionModal on:designSelected={receiveSelectedDesign} />
