<script lang="ts">
    import { dataStore } from "../store"
    import { save } from "@tauri-apps/api/dialog"
    import { downloadDir} from "@tauri-apps/api/path"
    import { writeTextFile } from "@tauri-apps/api/fs"

    const downloadJson = async() => {
        const suggestedFilename = "export.json"
        const jsonString = JSON.stringify($dataStore, null, 2)

        try {
            const filePath = await save({
                defaultPath: (await downloadDir()) + "/" + suggestedFilename,
            })
            await writeTextFile({contents: jsonString, path: filePath})
        } catch(e) {
            console.error(e)
        }
    }
</script>

<button type="button" class="btn variant-filled-surface flex-initial" on:click={downloadJson}>
    Export JSON
</button>
