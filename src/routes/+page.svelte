<script lang="ts">
    import FileDropzone from "$lib/FileDropzone.svelte"
    import VenueForm from "$lib/VenueForm.svelte"
    import { dataStore } from "../store"
</script>

{#if $dataStore.length > 0}
    <VenueForm />
{:else}
    <FileDropzone />
{/if}
