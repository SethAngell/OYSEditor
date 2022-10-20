<!-- <script lang="ts">
  import SiteHeader from "./components/SiteHeader.svelte";
  import Editor from "./components/Editor.svelte";
  import Page from "./components/onboarding/Page.svelte";

  let onboarding = true;
</script>

<div class="flex flex-col justify-center align-center">
  {#if onboarding}
    <Page />
  {:else}
    <SiteHeader />
    <Editor />
  {/if} -->
<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<Router {routes} />
