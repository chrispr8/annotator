<script lang="ts">
    import { FileDropzone } from "@skeletonlabs/skeleton"
    import { dataStore } from "../store"
    import type { Venue } from "../store"

    type ImportFormat = {
        data: Venue[]
    }

    let files: FileList
    let data: ImportFormat

    const handleFiles = (event: Event) => {
        const target = event.target as HTMLInputElement
        try {
            // figure out a way to handle multiple files
            const file = target.files?.[0]
            const reader = new FileReader()
            reader.onload = () => {
                try {
                    data = JSON.parse(reader.result as string)
                    console.log(data.data)
                    $dataStore = [...$dataStore, ...data.data]
                } catch (error) {
                    console.error("Error parsing JSON file: ", error)
                }
            }
            if (file) {
                reader.readAsText(file)
            }
        } catch (error) {
            console.error("Error loading file: ", error)
        }
    }
</script>

<FileDropzone
    name="files"
    class="w-full h-full"
    border="none"
    bind:files
    accept="application/json"
    on:change={handleFiles}
>
    <svelte:fragment slot="lead">
        <div class="flex justify-center items-center select-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                />
            </svg>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="message">
        <b>Upload a file</b> or drag and drop
    </svelte:fragment>
    <svelte:fragment slot="meta">HeidelKBerg JSON allowed</svelte:fragment>
</FileDropzone>
