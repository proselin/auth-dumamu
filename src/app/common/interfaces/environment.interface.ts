export interface IEnvironment {
  NODE_ENV: string;
  SERVER_PORT: string;
  SERVER_PREFIX: string;
  SERVER_API_DOCUMENT_PREFIX?: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  TCP_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_HOST: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
}
