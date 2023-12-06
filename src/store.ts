import type { Readable, Writable } from "svelte/store"
import { derived, writable } from "svelte/store"

import { localStorageStore } from "@skeletonlabs/skeleton"

type Suburb = "Altstadt" | 
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
              "Ziegelhausen"

type Cuisine = {
    african: boolean,
    american: boolean,
    asian: boolean,
    chinese: boolean,
    german: boolean,
    greek: boolean,
    indian: boolean,
    international: boolean,
    italian: boolean,
    japanese: boolean,
    korean: boolean,
    oriental: boolean,
    sushi: boolean,
    thai: boolean,
}

// Declare venue type for data import and manipulation
export type Venue = {
    type: "restaurant" | "hotel" | "attraction"
    name: string,
    description: string,
    housenumber: string,
    street: string,
    suburb: Suburb,
    phone: string,
    website: string,
    cuisine?: Cuisine,
    delivery?: "yes" | "no" | "unknown",
    indoor_seating?: "yes" | "no" | "limited" | "unknown",
    internet_access?: "yes" | "no" | "unknown",
    outdoor_seating?: "yes" | "no" | "limited" | "unknown",
    price: "cheap" | "moderate" | "expensive" | "free" | "unknown",
    smoking?: "yes" | "no" | "unknown",
    vegan?: "yes" | "no" | "limited" | "unknown",
    vegetarian?: "yes" | "no" | "limited" | "unknown",
    wheelchair?: "yes" | "no" | "limited" | "unknown",
    stars?: "1" | "2" | "3" | "4" | "5" | "unknown",
    air_conditioning?: "yes" | "no" | "unknown",
    parking?: "yes" | "no" | "unknown",
    edited: boolean,
}

export const dataStore: Writable<Array<Venue>> = localStorageStore("dataStore", [])
export const currentIndex: Writable<number> = writable(0)

export const itemCount = derived(dataStore, ($dataStore) => $dataStore.length)
export const editCount = derived(dataStore, ($dataStore) => $dataStore.filter((v: Venue) => v.edited == true).length)
export const currentVenue: Readable<Venue> = derived([dataStore, currentIndex], ([$dataStore, $currentIndex]) => {return $dataStore[$currentIndex]})