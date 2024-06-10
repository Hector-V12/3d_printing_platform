"use client";

import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": any;
    }
  }
}

const SplineViewerComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.5.5/build/spline-viewer.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <spline-viewer url="https://prod.spline.design/v98wfSUyvfchbtKn/scene.splinecode"></spline-viewer>
  );
};

export default SplineViewerComponent;
