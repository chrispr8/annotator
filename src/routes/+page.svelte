<script lang="ts">
	import Dropzone from "$lib/Dropzone.svelte"
	import VenueForm from "$lib/VenueForm.svelte"
	import { dataStore } from "../store"
</script>

{#if ($dataStore.length > 0)}
	<VenueForm/>
{:else}
	<Dropzone/>
{/if}