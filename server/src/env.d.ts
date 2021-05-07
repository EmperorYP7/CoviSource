declare namespace NodeJS {
  interface ProcessEnv {
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
    DATABASE_URL: string;
    PORT: string;
    REDIS_PORT: string;
    REDIS_HOST: string;
  }
}