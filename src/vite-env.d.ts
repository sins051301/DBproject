/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_NODE_ENV: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_PROTOCOL: string;
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
