import type { Readable, Writable } from "svelte/store"
import { derived, writable } from "svelte/store"

import { localStorageStore } from "@skeletonlabs/skeleton"

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
export const currentIndex: Writable<number> = writable(0)

export const itemCount = derived(dataStore, ($dataStore) => $dataStore.length)
export const editCount = derived(dataStore, ($dataStore) => $dataStore.filter((v: Venue) => v.edited == true).length)
export const currentVenue: Readable<Venue> = derived([dataStore, currentIndex], ([$dataStore, $currentIndex]) => {return $dataStore[$currentIndex]})
