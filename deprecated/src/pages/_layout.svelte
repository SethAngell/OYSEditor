<script>
    import SiteHeader from "../components/SiteHeader.svelte";
</script>
<SiteHeader />
<main class="w-screen h-screen flex flex-col justify-center align-center">
    <slot class="flex flex-col justify-center align-center h-screen" />
</main>
