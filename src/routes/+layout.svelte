<script lang="ts">
	import "../app.postcss"
	import { AppBar, AppShell, LightSwitch, ProgressBar, getModalStore, initializeStores, Modal} from "@skeletonlabs/skeleton"
	import type {  ModalSettings } from "@skeletonlabs/skeleton"
	import { dataStore, editCount, itemCount } from "../store"
	import ExportData from "$lib/ExportData.svelte";

	initializeStores()
	const modal: ModalSettings = {
		type: "confirm",
		title: "Danger! You are deleting all data",
		body: "Are you sure you wish to delete all local data? \n \
		All progress might be lost",
		response: (r: boolean) => {
			if (r) {
				$dataStore = []
			}
		},
	}
	const modalStore = getModalStore()
	const handleClearData = () => {
		console.log("Click!")
		modalStore.trigger(modal)
	}
</script>

<Modal background="bg-error-500"/>
<AppShell>
	<AppBar class="flex" slot="header">
		<svelte:fragment slot="lead">HeidelKBerg Annotator</svelte:fragment>
		<svelte:fragment slot="default">
			{$editCount}/{$itemCount}
		</svelte:fragment>
		<div slot="trail" class="flex space-x-8">
			{#if ($dataStore.length > 0)}
				<ExportData/>
				<button type="button" 
						class="btn variant-filled-error flex-initial"
						on:click={handleClearData}
				>
					<span class="flex-initial">Clear data</span>
				</button>
			{/if}
			<LightSwitch class="flex-initial"/>
		</div>
	</AppBar>
	<ProgressBar label="Progress Bar" class="fixed" value={$editCount} max={$itemCount} meter="bg-success-500" labelledby="${editCount}/${$itemCount}"/>
	<slot/>
</AppShell>
