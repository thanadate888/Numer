// src/declarations.d.ts
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "react-plotly.js" {
  import * as React from "react";

  interface PlotParams {
    data: any[];
    layout?: Partial<Plotly.Layout>;
    config?: Partial<Plotly.Config>;
    style?: React.CSSProperties;
    className?: string;
    onInitialized?: (figure: any, graphDiv: HTMLElement) => void;
    onUpdate?: (figure: any, graphDiv: HTMLElement) => void;
  }

  export default class Plot extends React.Component<PlotParams> {}
}