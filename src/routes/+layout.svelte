<script>
	import Footer from '$lib/brand/Footer.svelte';
	import '../app.css';
	export const prerender = true;
</script>

<main class="w-screen h-screen flex flex-col items-center justify-center background">
	<slot class="flex flex-col justify-center items-center h-screen" />
	<Footer />
</main>
