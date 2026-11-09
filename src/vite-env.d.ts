/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Gemini API key for the Coach Dinesh AI chatbot */
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
