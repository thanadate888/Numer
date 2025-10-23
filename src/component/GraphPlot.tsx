import React from "react";
import Plot from "react-plotly.js";

interface GraphPlotProps {
  data: any[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

const GraphPlot: React.FC<GraphPlotProps> = ({
  data,
  title = "Graph",
  xLabel = "x",
  yLabel = "y",
}) => (
  <Plot
    data={data}
    layout={{
      width: 700,
      height: 400,
      title: { text: title },
      xaxis: { title: { text: xLabel } },
      yaxis: { title: { text: yLabel } },
    }}
  />
);

export default GraphPlot;