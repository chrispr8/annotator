<script lang="ts">
    import { dataStore } from "../store"

    function downloadJson() {
        const jsonString = JSON.stringify($dataStore, null, 2)
        const blob = new Blob([jsonString], { type: "application/json" })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "export.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
</script>

<button type="button" class="btn variant-filled-surface flex-initial" on:click={downloadJson}>
    Export JSON
</button>
