/// <reference types="vite/client" />

declare interface ImportMetaEnv {
    readonly BASE_URL: string
    readonly BASE_API_PREFIX: string
    readonly BASE_API_TIMEOUT: number
    readonly VITE_APP_ENV: string
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_TITLE_SUB: string
    readonly VITE_APP_VERSION: string
    readonly VITE_APP_GIT_COMMIT: string
}

declare interface ImportMeta {
    readonly env: ImportMetaEnv
}