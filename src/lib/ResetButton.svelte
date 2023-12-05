<script lang="ts">
    export let handleClearData: () => void
</script>

<button type="button" class="btn variant-filled-error flex-initial" on:click={handleClearData}>
    <span class="flex-initial">Clear data</span>
</button>
