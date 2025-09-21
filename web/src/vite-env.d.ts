/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT?: string; // opcional, porque puede no estar definido
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
