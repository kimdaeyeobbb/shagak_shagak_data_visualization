import { createBrowserRouter } from "react-router-dom";
import Canvas from "./pages/canvas";
import App from "./App";
import ChartJs from "./pages/chartjs";
import D3js from "./pages/d3js";
import Map from "./pages/map";
import AreaChart from "./pages/chartjs/AreaChart";
import BarChart from "./pages/chartjs/BarChart";
import BubbleChart from "./pages/chartjs/BubbleChart";
import LineChart from "./pages/chartjs/LineChart";
import Ex1 from "./pages/d3js/01";
import DoughnutPieChart from "./pages/chartjs/DoughnutChart";
import MBTI from "./pages/chartjs/MBTI";
import MixedChart from "./pages/chartjs/MixedChart";
import Olympic from "./pages/chartjs/Olympic";
import PieChart from "./pages/chartjs/PieChart";
import PolarAreaChart from "./pages/chartjs/PolarAreaChart";
import RadarChart from "./pages/chartjs/RadarChart";
import ScatterChart from "./pages/chartjs/ScatterChart";
import Map01 from "./pages/map/01";
import Map0101 from "./pages/map/01/01";
import Map0102 from "./pages/map/01/02";
import Map0103 from "./pages/map/01/03";
import Map0201 from "./pages/map/02/01";
import Map0202 from "./pages/map/02/02";
import Map0203 from "./pages/map/02/03";
import Map0301 from "./pages/map/03/01";
import Map0302 from "./pages/map/03/02";
import Map0401 from "./pages/map/04/01";
import Map0402 from "./pages/map/04/02";
import Map03 from "./pages/map/03";
import Map02 from "./pages/map/02";
import Map04 from "./pages/map/04";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "canvas",
        element: <Canvas />,
        children: [{}],
      },
      {
        path: "chartjs",
        element: <ChartJs />,
        children: [
          {
            path: "areachart",
            element: <AreaChart />,
          },
          {
            path: "barchart",
            element: <BarChart />,
          },
          {
            path: "bubblechart",
            element: <BubbleChart />,
          },
          {
            path: "doughnutpiechart",
            element: <DoughnutPieChart />,
          },
          {
            path: "linechart",
            element: <LineChart />,
          },
          {
            path: "mbti",
            element: <MBTI />,
          },
          {
            path: "mixedchart",
            element: <MixedChart />,
          },
          {
            path: "olympic",
            element: <Olympic />,
          },
          {
            path: "piechart",
            element: <PieChart />,
          },
          {
            path: "polarareachart",
            element: <PolarAreaChart />,
          },
          {
            path: "radarchart",
            element: <RadarChart />,
          },
          {
            path: "scatterchart",
            element: <ScatterChart />,
          },
        ],
      },
      {
        path: "d3js",
        element: <D3js />,
        children: [
          {
            path: "ex1",
            element: <Ex1 />,
          },
        ],
      },
      {
        path: "map",
        element: <Map />,
        children: [
          {
            path: "01",
            element: <Map01 />,
            children: [
              { path: "1", element: <Map0101 /> },
              { path: "2", element: <Map0102 /> },
              { path: "3", element: <Map0103 /> },
            ],
          },
          {
            path: "02",
            element: <Map02 />,
            children: [
              { path: "1", element: <Map0201 /> },
              { path: "2", element: <Map0202 /> },
              { path: "3", element: <Map0203 /> },
            ],
          },
          {
            path: "03",
            element: <Map03 />,
            children: [
              { path: "1", element: <Map0301 /> },
              { path: "2", element: <Map0302 /> },
            ],
          },
          {
            path: "04",
            element: <Map04 />,
            children: [
              { path: "1", element: <Map0401 /> },
              { path: "2", element: <Map0402 /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
