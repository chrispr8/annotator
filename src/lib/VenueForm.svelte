<script lang="ts">
    import { open } from "@tauri-apps/api/shell"
    import { currentIndex, currentVenue, dataStore, itemCount } from "../store"
    import type { Venue } from "../store"
    import { onMount } from "svelte"

    const handlePrevious = () => {
        $dataStore[$currentIndex].edited = true
        currentIndex.update((current) => {
            if (current == 0) {
                return $itemCount - 1
            } else {
                return current - 1
            }
        })
    }

    const handleNext = () => {
        $dataStore[$currentIndex].edited = true
        currentIndex.update((current) => {
            if (current == $itemCount - 1) {
                return 0
            } else {
                return current + 1
            }
        })
    }

    const openLink = () => {
        open(`https://www.google.com/maps?q=${$currentVenue.name},Heidelberg`)
    }
</script>

<div class="flex justify-center p-8 h-screen">
    <div
        class="w-full sm:w-2/3 p-8 rounded-lg justify-content shadow-md transition-all duration-300 ease-in-out whitespace-pre-wrap"
    >
        <header class="header">
            <button class="h3" on:click={openLink}>
                {$currentVenue.name}
            </button>
        </header>
        <div class="flex-1 p-4">
            <label class="label">
                <span>Street</span>
                <input class="input" type="text" bind:value={$currentVenue.street} />
            </label>
            <label class="label">
                <span>Housenumber</span>
                <input class="input" type="text" bind:value={$currentVenue.housenumber} />
            </label>
            <label class="label">
                <span>Suburb</span>
                <select class="select" bind:value={$currentVenue.suburb}>
                    <option value="unknown">unknown</option>
                    <option value="Altstadt">Altstadt</option>
                    <option value="Bahnstadt">Bahnstadt</option>
                    <option value="Bergheim">Bergheim</option>
                    <option value="Boxberg">Boxberg</option>
                    <option value="Emmertsgrund">Emmertsgrund</option>
                    <option value="Handschuhsheim">Handschuhsheim</option>
                    <option value="Kirchheim">Kirchheim</option>
                    <option value="Neuenheim">Neuenheim</option>
                    <option value="Pfaffengrund">Pfaffengrund</option>
                    <option value="Rohrbach">Rohrbach</option>
                    <option value="Schlierbach">Schlierbach</option>
                    <option value="Südstadt">Südstadt</option>
                    <option value="Weststadt">Weststadt</option>
                    <option value="Wieblingen">Wieblingen</option>
                    <option value="Ziegelhausen">Ziegelhausen</option>
                </select>
            </label>
            <label class="label">
                <span>Description</span>
                <textarea class="textarea" rows="3" bind:value={$currentVenue.description} />
            </label>
            <label class="label">
                <span>Website</span>
                <input class="input" type="text" bind:value={$currentVenue.website} />
            </label>
            <label class="label" for={$currentVenue.phone}>
                <span>Phone</span>
                <input class="input" type="text" bind:value={$currentVenue.phone} />
            </label>
            <label class="label">
                <span>Price</span>
                <select class="select" value={$currentVenue.price}>
                    <option value="unknown">unknown</option>
                    <option value="cheap">cheap</option>
                    <option value="moderate">moderate</option>
                    <option value="expensive">expensive</option>
                    <option value="free">free</option>
                </select>
            </label>
            <label class="label">
                <span>Wheelchair</span>
                <select class="select" value={$currentVenue.wheelchair}>
                    <option value="unknown">unknown</option>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                    <option value="limited">limited</option>
                </select>
            </label>
            {#if $currentVenue.type == "restaurant"}
                <label class="label">
                    <span>Cuisine</span>
                    <select class="select" value={$currentVenue.cuisine}>
                        <!-- TODO: fix options -->
                        <option value="unknown"></option>
                        <option value="cheap">cheap</option>
                        <option value="moderate">moderate</option>
                        <option value="expensive">expensive</option>
                        <option value="free">free</option>
                    </select>
                </label>
                <label class="label">
                    <span>Delivery</span>
                    <select class="select" bind:value={$currentVenue.delivery}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                </label>
                <label class="label">
                    <span>Indoor seating</span>
                    <select class="select" bind:value={$currentVenue.indoor_seating}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
                <label class="label">
                    <span>Outdoor seating</span>
                    <select class="select" value={$currentVenue.outdoor_seating}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
                <label class="label">
                    <span>Vegetarian</span>
                    <select class="select" value={$currentVenue.vegetarian}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
                <label class="label">
                    <span>Vegan</span>
                    <select class="select" value={$currentVenue.vegan}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
            {:else if $currentVenue.type == "hotel"}
                <label class="label">
                    <span>Stars</span>
                    <select class="select" value={$currentVenue.stars}>
                        <option value="unknown">unknown</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <!--{:else if $currentVenue.type =="attraction"}-->
            {/if}
        </div>
        <footer class="flex justify-between mt-4">
            <button
                type="button"
                class="btn variant-filled-surface rounded-md justify-left"
                on:click={handlePrevious}
            >
                Previous
            </button>
            <button
                type="button"
                class="btn variant-filled-error rounded-md justify-between"
                on:click={() => {
                    $dataStore = $dataStore.filter((_, i) => i != $currentIndex)
                }}
            >
                Delete
            </button>
            <button
                type="button"
                class="btn variant-filled-success rounded-md justify-right"
                on:click={handleNext}
            >
                Next
            </button>
        </footer>
    </div>
</div>
