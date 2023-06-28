<script lang="ts">
	import DesignSelectionModal from '$lib/profile/DesignSelectionModal.svelte';
	import ProfileForm from '$lib/profile/ProfileForm.svelte';

	function receiveSelectedDesign(event: CustomEvent) {
		// console.log('NewDesign Selected: ', event.detail.design.payload);<DesignSelectionModal on:designSelected={receiveSelectedDesign} />
	}
</script>

<div class="flex flex-col w-5/6 rounded-md border-slate-800 bg-zinc-50 border-2 my-12">
	<ProfileForm />
</div>
