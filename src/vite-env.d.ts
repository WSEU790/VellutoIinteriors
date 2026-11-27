/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_PUBLIC_PHONE?: string;
  readonly VITE_PUBLIC_EMAIL?: string;
  readonly VITE_PUBLIC_INSTAGRAM_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_UPLOAD_MAX_FILES?: string;
  readonly VITE_UPLOAD_MAX_MB?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
