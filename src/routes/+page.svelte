<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<div class="rounded-md border-slate-800 bg-zinc-50 border-2 px-8 pt-8 pb-6 w-3/6">
	<div class="flex flex-col gap-y-2 justify-center items-center">
		<h1>The internet used to be a fun place to hang out. Want to make it like that again?</h1>
		<div class="flex flex-row justify-center gap-x-2">
			<Button outline color="purple" href="/authentication/login">Login</Button>
			<Button outline color="purple" href="/authentication/apply">Apply</Button>
		</div>
	</div>
</div>
