"use client";

import { useEffect, useRef } from "react";

const Page = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.onload = () => {
      try {
        const height = iframe.contentDocument?.documentElement.scrollHeight;
        if (height) iframe.style.height = height + "px";
      } catch {
        iframe.style.height = "100vh";
      }
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        src="/products.html"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
        }}
        title="Trcelabs | Advanced Cybersecurity Solutions"
      />
    </div>
  );
};

export default Page;