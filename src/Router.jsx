import { createBrowserRouter } from "react-router-dom";
import Canvas from "./pages/canvas";
import App from "./App";
import ChartJs from "./pages/chartjs";
import D3js from "./pages/d3js";
import Map from "./pages/leafletjs";
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
import Map01 from "./pages/leafletjs/01";
import Map0101 from "./pages/leafletjs/01/01";
import Map0102 from "./pages/leafletjs/01/02";
import Map0103 from "./pages/leafletjs/01/03";
import Map0201 from "./pages/leafletjs/02/01";
import Map0202 from "./pages/leafletjs/02/02";
import Map0203 from "./pages/leafletjs/02/03";
import Map0301 from "./pages/leafletjs/03/01";
import Map0302 from "./pages/leafletjs/03/02";
import Map03 from "./pages/leafletjs/03";
import Map02 from "./pages/leafletjs/02";
import Map04 from "./pages/leafletjs/04";
import FillRect from "./pages/canvas/FillRect";
import BeginPath from "./pages/canvas/BeginPath";
import Triangle from "./pages/canvas/Triangle";
import Sin from "./pages/canvas/Sin";
import SunriseSunset from "./pages/canvas/SunriseSunset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "canvas",
        element: <Canvas />,
        children: [
          {
            path: "FillRect",
            element: <FillRect />,
          },
          {
            path: "BeginPath",
            element: <BeginPath />,
          },
          {
            path: "Triangle",
            element: <Triangle />,
          },
          {
            path: "Sin",
            element: <Sin />,
          },
          {
            path: "Sunrise_Sunset",
            element: <SunriseSunset />,
          },
        ],
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
            path: "01 Map",
            element: <Map01 />,
            children: [
              { path: "MapContainer", element: <Map0101 /> },
              { path: "TileLayer", element: <Map0102 /> },
              { path: "Custom Hooks", element: <Map0103 /> },
            ],
          },
          {
            path: "02 marker",
            element: <Map02 />,
            children: [
              { path: "Marker", element: <Map0201 /> },
              { path: "Popup & Tooltip", element: <Map0202 /> },
              { path: "Custom Marker", element: <Map0203 /> },
            ],
          },
          {
            path: "03 Vector",
            element: <Map03 />,
            children: [
              { path: "Vector", element: <Map0301 /> },
              { path: "2", element: <Map0302 /> },
            ],
          },
          {
            path: "map with CSV",
            element: <Map04 />,
          },
        ],
      },
    ],
  },
]);

export default router;
