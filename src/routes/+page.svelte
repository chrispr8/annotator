<script lang="ts">
	import Dropzone from "$lib/Dropzone.svelte"
	import { dataStore } from "../store"

	let currentIndex = 0

	const handlePrevious = () => {
		if (currentIndex == 0) {
			currentIndex = $dataStore.length - 1
		} else {
			currentIndex -= 1
		}
	}

	const handleNext = () => {
		currentIndex += 1 % $dataStore.length
	}
</script>

{#if ($dataStore.length > 0)}
	<div class="flex items-start justify-center min-h-screen p-6">
		<div class="card w-full sm:w-2/3  p-8 rounded-lg shadow-md transition-all duration-300 ease-in-out whitespace-pre-wrap">
			<section class="card-content p-8">x
				ITEM: {JSON.stringify($dataStore[currentIndex])}
			</section>
			<footer class="card-footer flex justify-between mt-4">
				<button type="button" class="btn variant-filled-surface rounded-md justify-left">Previous</button>
				<button type="button" class="btn variant-filled-success rounded-md justify-right">Next</button>
			</footer>
		</div>
	</div>
{:else}
	<Dropzone/>
{/if}