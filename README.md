# Annotator

An annotator to enrich our OpenStreetMap data manually for the knowledge base (to be published).

## Installation

### Download binary

You can (soon) find built binaries under [Releases](https://github.com/chrispr8/annotator/releases).

### Development

**Setup**

- Install [Tauri](https://tauri.app/v1/guides/getting-started/prerequisites) for you OS.
- Install [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

- In the project root run
  ```
  npm install
  npm run dev # for development in the browser
  # or
  npm run tauri dev
  ```
  Keep in mind that not all features are available in the browser.

**Building**

Follow the instructions in the [docs](https://tauri.app/v1/guides/building).

```
npm run tauri build
```

## TODO

- [ ] Fix Drag-n-Drop
- [x] Export edited data as JSON
- [x] Fix warnings
- [x] Fix MacOS support
- [ ] Build binaries and publish under Releases
  - [x] Linux Binary
  - [x] MacOS Binary
  - [ ] Windows Binary
- [ ] Fix "cuisine" selection
- [x] Auto-Scroll to top after pressing previous/next
