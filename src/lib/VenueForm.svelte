<script lang="ts">
    import { currentIndex, currentVenue, itemCount } from "../store"
    import type { Venue } from '../store'
    
	const handlePrevious = () => {
        currentIndex.update(current => {
            if (current == 0) {
                return $itemCount - 1
            } else {
                return current - 1
            }
        })
        console.log("PREVIOUS")
	}

	const handleNext = () => {
		currentIndex.update(current => {
            if (current == $itemCount - 1) {
                return 0
            } else {
                return current + 1
            }
            
        }) 
        console.log("NEXT")
	}

</script>

<div class="flex items-start justify-center min-h-screen p-6">
    <div class="card w-full sm:w-2/3  p-8 rounded-lg shadow-md transition-all duration-300 ease-in-out whitespace-pre-wrap">
        <header class="card-header">
            {$currentVenue.name}
        </header>
        <section class="card-content p-8">x
            ITEM: {$currentVenue}
        </section>
        <footer class="card-footer flex justify-between mt-4">
            <button type="button" 
                    class="btn variant-filled-surface rounded-md justify-left"
                    on:click={handlePrevious}
            >
                Previous
            </button>
            <button type="button" 
                    class="btn variant-filled-success rounded-md justify-right"
                    on:click={handleNext}
            >
                Next
            </button>
        </footer>
    </div>
</div>
