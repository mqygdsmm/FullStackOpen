```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spab
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server
```