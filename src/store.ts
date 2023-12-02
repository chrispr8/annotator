import { localStorageStore } from "@skeletonlabs/skeleton"
import { derived, writable } from "svelte/store"
import type { Writable } from "svelte/store"

// Declare venue type for data import and manipulation
export type Venue = {
    "type": "restaurant" | "hotel" | "attraction"
    "name": string,
    "description": string,
    "addr:housenumber": string,
    "addr:street": string,
    "addr:suburb": "Altstadt" | 
                    "Bahnstadt" | 
                    "Bergheim" | 
                    "Boxberg" | 
                    "Emmertsgrund" | 
                    "Handschuhsheim" | 
                    "Kirchheim" | 
                    "Neuenheim" | 
                    "Pfaffengrund" | 
                    "Rohrbach" |
                    "Schlierbach" |
                    "Südstadt" |
                    "Weststadt" |
                    "Wieblingen" | 
                    "Ziegelhausen",
    "phone": string,
    "website": string,
    "cuisine": "african" |
                "american" |
                "asian" |
                "chinese" |
                "german" |
                "greek" |
                "indian" |
                "international" |
                "italian" |
                "japanese" |
                "korean" |
                "oriental" |
                "sushi" |
                "thai", 
    "delivery": "yes" | "no" | "unknown",
    "indoor_seating": "yes" | "no" | "limited" | "unknown",
    "internet_access": "yes" | "no" | "unknown",
    "outdoor_seating": "yes" | "no" | "limited" | "unknown",
    "price": "cheap" | "moderate" | "expensive" | "unknown",
    "smoking": "yes" | "no" | "unknown",
    "vegan": "yes" | "no" | "limited" | "unknown",
    "vegetarian": "yes" | "no" | "limited" | "unknown",
    "wheelchair": "yes" | "no" | "limited" | "unknown",
    "edited": boolean,
}

export const dataStore: Writable<Array<Venue>> = localStorageStore("dataStore", [])

function createCurrentItem(dataStore: Venue[]) {
    const { subscribe, set, update } = writable(0)
    return {
        subscribe,
        previous: (dataStore: Venue[]) => update((n: number) => {
            if (n == 0) {
                return dataStore.length - 1
            } else {
                return n - 1
            }
        }),
        next: ($dataStore: Venue[]) => update((n: number) => {
            return n + 1 % $dataStore.length
        }),
        reset: () => set(0)
    }
}
export const currentItem = createCurrentItem(dataStore)

export const itemCount = derived(dataStore, ($dataStore) => $dataStore.length)
export const editCount = derived(dataStore, ($dataStore) => $dataStore.filter((v: Venue) => v.edited == true).length)
