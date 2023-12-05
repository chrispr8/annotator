<script lang="ts">
    import "../app.postcss"
    import {
        AppBar,
        AppShell,
        LightSwitch,
        ProgressBar,
        getModalStore,
        initializeStores,
        Modal
    } from "@skeletonlabs/skeleton"
    import type { ModalSettings } from "@skeletonlabs/skeleton"
    import { dataStore, editCount, itemCount } from "../store"
    import ExportDataButton from "$lib/ExportDataButton.svelte"
    import ResetButton from "$lib/ResetButton.svelte"

    initializeStores()

    const resetModal: ModalSettings = {
        type: "confirm",
        title: "Danger! You are deleting all data",
        body: "Are you sure you wish to delete all local data? \n \
		All progress might be lost",
        response: (r: boolean) => {
            if (r) {
                $dataStore = []
            }
        }
    }

    const modalStore = getModalStore()

    const handleClearData = () => {
        modalStore.trigger(resetModal)
    }
</script>

<Modal background="bg-error-500" />
<AppShell>
    <AppBar class="flex" slot="header">
        <svelte:fragment slot="lead">HeidelKBerg Annotator</svelte:fragment>
        <svelte:fragment slot="default">
            {$editCount}/{$itemCount}
        </svelte:fragment>
        <div slot="trail" class="flex space-x-8">
            {#if $dataStore.length > 0}
                <ExportDataButton />
                <ResetButton {handleClearData} />
            {/if}
            <LightSwitch class="flex-initial" />
        </div>
    </AppBar>
    <ProgressBar
        label="Progress Bar"
        class="fixed"
        value={$editCount}
        max={$itemCount}
        meter="bg-success-500"
        labelledby="${editCount}/${$itemCount}"
    />
    <slot />
</AppShell>
