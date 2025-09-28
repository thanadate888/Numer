// src/declarations.d.ts
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";
declare module "*.jpg" {
  const value: string;
  export default value;
}