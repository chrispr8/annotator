<script lang="ts">
    import { open } from "@tauri-apps/api/shell"
    import { currentIndex, currentVenue, dataStore, itemCount } from "../store"
    import type { Attraction_Type, Cuisine, Venue } from "../store"
    import { onMount } from "svelte"

    let venue: Venue = {
        type: "restaurant",
        name: "",
        description: "",
        price: "cheap",
        housenumber: "",
        street: "",
        suburb: "Altstadt",
        phone: "",
        website: "",
        edited: false
    }

    let default_cuisine: Cuisine = {
        african: false,
        american: false,
        asian: false,
        chinese: false,
        german: false,
        greek: false,
        indian: false,
        international: false,
        italian: false,
        japanese: false,
        korean: false,
        oriental: false,
        sushi: false,
        thai: false
    }

    // Somehow we cannot bind to booleans inside objects (TypeError: Attempted to assign to readonly property.)
    // Thats why we need this beautiful list and all the functions to handle this mess.
    let african = false
    let american = false
    let asian = false
    let chinese = false
    let german = false
    let greek = false
    let indian = false
    let international = false
    let italian = false
    let japanese = false
    let korean = false
    let oriental = false
    let sushi = false
    let thai = false

    let default_attraction_type: Attraction_Type = {
        active: false,
        architecture: false,
        child_friendly: false,
        educational: false,
        historic: false,
        indoor: false,
        nature: false,
        outdoor: false,
        passive: false,
        view: false,
        zoo: false
    }

    let active = false
    let architecture = false
    let child_friendly = false
    let educational = false
    let historic = false
    let indoor = false
    let nature = false
    let outdoor = false
    let passive = false
    let view = false
    let zoo = false

    onMount(() => {
        updateVenue()
    })

    const saveVenue = () => {
        if (venue.type == "restaurant") {
            venue.cuisine = {
                african,
                american,
                asian,
                chinese,
                german,
                greek,
                indian,
                international,
                italian,
                japanese,
                korean,
                oriental,
                sushi,
                thai
            }
        }
        if (venue.type == "attraction") {
            venue.attraction_type = {
                active,
                architecture,
                child_friendly,
                educational,
                historic,
                indoor,
                nature,
                outdoor,
                passive,
                view,
                zoo
            }
        }
        $dataStore[$currentIndex] = venue
    }

    // I mean it works... but WHY?!
    const updateCuisine = () => {
        african = $currentVenue.cuisine ? $currentVenue.cuisine.african : false
        american = $currentVenue.cuisine ? $currentVenue.cuisine.american : false
        asian = $currentVenue.cuisine ? $currentVenue.cuisine.asian : false
        chinese = $currentVenue.cuisine ? $currentVenue.cuisine.chinese : false
        german = $currentVenue.cuisine ? $currentVenue.cuisine.german : false
        greek = $currentVenue.cuisine ? $currentVenue.cuisine.greek : false
        indian = $currentVenue.cuisine ? $currentVenue.cuisine.indian : false
        international = $currentVenue.cuisine ? $currentVenue.cuisine.international : false
        italian = $currentVenue.cuisine ? $currentVenue.cuisine.italian : false
        japanese = $currentVenue.cuisine ? $currentVenue.cuisine.japanese : false
        korean = $currentVenue.cuisine ? $currentVenue.cuisine.korean : false
        oriental = $currentVenue.cuisine ? $currentVenue.cuisine.oriental : false
        sushi = $currentVenue.cuisine ? $currentVenue.cuisine.sushi : false
        thai = $currentVenue.cuisine ? $currentVenue.cuisine.thai : false
    }

    const updateAttractionType = () => {
        active = $currentVenue.attraction_type ? $currentVenue.attraction_type.active : false
        architecture = $currentVenue.attraction_type
            ? $currentVenue.attraction_type.architecture
            : false
        child_friendly = $currentVenue.attraction_type
            ? $currentVenue.attraction_type.child_friendly
            : false
        educational = $currentVenue.attraction_type
            ? $currentVenue.attraction_type.educational
            : false
        historic = $currentVenue.attraction_type ? $currentVenue.attraction_type.historic : false
        indoor = $currentVenue.attraction_type ? $currentVenue.attraction_type.indoor : false
        nature = $currentVenue.attraction_type ? $currentVenue.attraction_type.nature : false
        outdoor = $currentVenue.attraction_type ? $currentVenue.attraction_type.outdoor : false
        passive = $currentVenue.attraction_type ? $currentVenue.attraction_type.passive : false
        view = $currentVenue.attraction_type ? $currentVenue.attraction_type.view : false
        zoo = $currentVenue.attraction_type ? $currentVenue.attraction_type.zoo : false
    }

    const updateVenue = () => {
        venue = $currentVenue
        if ($currentVenue.type == "restaurant") {
            updateCuisine()
        }
        if ($currentVenue.type == "attraction") {
            updateAttractionType()
        }
    }

    const handleNext = (increase: boolean) => {
        venue.edited = true
        saveVenue()

        if (increase) {
            currentIndex.update((current) => {
                if (current == $itemCount - 1) {
                    return 0
                } else {
                    return current + 1
                }
            })
        } else {
            currentIndex.update((current) => {
                if (current == 0) {
                    return $itemCount - 1
                } else {
                    return current - 1
                }
            })
        }

        updateVenue()
        scrollToTop()
    }

    const scrollToTop = () => {
        let page = document.getElementById("page")
        if (page) {
            page.scrollTo(0, 0)
        }
    }

    const openLink = () => {
        open(`https://www.google.com/maps?q=${$currentVenue.name},Heidelberg`)
    }

    // Debug
    $: console.log(venue.price)
</script>

<div class="flex justify-center p-8">
    <div
        class="w-full sm:w-2/3 p-8 rounded-lg justify-content shadow-md transition-all duration-300 ease-in-out whitespace-pre-wrap"
    >
        <header class="header">
            <button class="h3" on:click={openLink}>
                <u>{venue.name}</u>
            </button>
        </header>
        <div class="flex-1 p-4">
            <label class="label">
                <span>Name</span>
                <input class="input select-all" type="text" bind:value={venue.name} />
            </label>
            <label class="label">
                <span>Street</span>
                <input class="input select-all" type="text" bind:value={venue.street} />
            </label>
            <label class="label">
                <span>Housenumber</span>
                <input class="input select-all" type="text" bind:value={venue.housenumber} />
            </label>
            <label class="label">
                <span>Suburb</span>
                <select class="select" bind:value={venue.suburb}>
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
                <textarea class="textarea select-all" rows="3" bind:value={venue.description} />
            </label>
            <label class="label">
                <span>Website</span>
                <input class="input select-all" type="text" bind:value={venue.website} />
            </label>
            <label class="label" for={venue.phone}>
                <span>Phone</span>
                <input class="input select-all" type="text" bind:value={venue.phone} />
            </label>
            <label class="label">
                <span>Price</span>
                <select class="select" bind:value={venue.price}>
                    <option value="unknown">unknown</option>
                    <option value="cheap">cheap</option>
                    <option value="moderate">moderate</option>
                    <option value="expensive">expensive</option>
                    <option value="free">free</option>
                </select>
            </label>
            <label class="label">
                <span>Wheelchair</span>
                <select class="select" bind:value={venue.wheelchair}>
                    <option value="unknown">unknown</option>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                    <option value="limited">limited</option>
                </select>
            </label>
            {#if venue.type == "restaurant"}
                {#if venue.cuisine}
                    <div class="space-y-2 grid grid-cols-3">
                        <span>Cuisine</span>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={african} />
                            <p>🇬🇭 African</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={american} />
                            <p>🍔 American</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={asian} />
                            <p>🍜 Asian</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={chinese} />
                            <p>🇨🇳 Chinese</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={german} />
                            <p>🇩🇪 German</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={greek} />
                            <p>🇬🇷 Greek</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={indian} />
                            <p>🇮🇳 Indian</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={international} />
                            <p>🌐 International</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={italian} />
                            <p>🍕 Italian</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={japanese} />
                            <p>🇯🇵 Japanese</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={korean} />
                            <p>🇰🇷 Korean</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={oriental} />
                            <p>🌴 Oriental</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={sushi} />
                            <p>🍣 Sushi</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={thai} />
                            <p>🇹🇭 Thai</p>
                        </label>
                    </div>
                {/if}
                <label class="label">
                    <span>Delivery</span>
                    <select class="select" bind:value={venue.delivery}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                </label>
                <label class="label">
                    <span>Indoor seating</span>
                    <select class="select" bind:value={venue.indoor_seating}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
                <label class="label">
                    <span>Outdoor seating</span>
                    <select class="select" bind:value={venue.outdoor_seating}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
                <label class="label">
                    <span>Vegetarian</span>
                    <select class="select" bind:value={venue.vegetarian}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
                <label class="label">
                    <span>Vegan</span>
                    <select class="select" bind:value={venue.vegan}>
                        <option value="unknown">unknown</option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                        <option value="limited">limited</option>
                    </select>
                </label>
            {:else if $currentVenue.type == "hotel"}
                <label class="label">
                    <span>Stars</span>
                    <select class="select" bind:value={venue.stars}>
                        <option value="unknown">unknown</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                </label>
            {:else if $currentVenue.type == "attraction"}
                {#if venue.cuisine}
                    <div class="space-y-2 grid grid-cols-2">
                        <span>Attraction Type</span>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={active} />
                            <p>🏃 Active</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={architecture} />
                            <p>⛪️ Architecture</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={child_friendly} />
                            <p>👨‍👩‍👧‍👦 Child Friendly</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={educational} />
                            <p>📖 Educational</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={historic} />
                            <p>🏛 Historic</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={indoor} />
                            <p>🪟 Indoor</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={nature} />
                            <p>🌳 Nature</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={outdoor} />
                            <p>🏕 Outdoor</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={passive} />
                            <p>📺 Passive</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={view} />
                            <p>🌄 View</p>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" bind:checked={zoo} />
                            <p>🐅 Zoo</p>
                        </label>
                    </div>
                {/if}
            {/if}
        </div>
        <footer class="flex justify-between mt-4">
            <button
                type="button"
                class="btn variant-filled-surface rounded-md justify-left"
                on:click={() => handleNext(false)}
            >
                Previous
            </button>
            <button
                type="button"
                class="btn variant-filled-error rounded-md justify-between"
                on:click={() => {
                    $dataStore = $dataStore.filter((_, i) => i != $currentIndex)
                    updateVenue()
                    scrollToTop()
                }}
            >
                Delete
            </button>
            <button
                type="button"
                class="btn variant-filled-success rounded-md justify-right"
                on:click={() => handleNext(true)}
            >
                Next
            </button>
        </footer>
    </div>
</div>
