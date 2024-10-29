import * as React from "react";

const DownloadIcon: React.FC = (/*props*/) => (
  <svg
    fill="#393"
    width={800}
    height={800}
    viewBox="0 0 24 24"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    //{...props}
  >
    <path
      d="M14 14.34V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v10.34"
      style={{
        fill: "none",
        stroke: "#393",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      d="m10 14.34-3.4-2.92-2.6 3 7.35 6.3a1 1 0 0 0 1.3 0L20 14.46l-2.6-3-3.4 2.88"
      style={{
        fill: "none",
        stroke: "#393",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
export default DownloadIcon;
