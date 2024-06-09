import React from "react"

export function Loading() {
    const Spin = (
        <style>
            {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
        `}
        </style>
    );
    return (
        <div id={"loading"} style={{
            zIndex: 1000,
            width: "100%",
            height: "100%",
            backgroundColor: "#e0e0e0",
            opacity: 0.7,
            position: "absolute",
            top: 0,
            left: 0,
            display: 'none'
        }}>
            {Spin}
            <span className="dli-loading-1" style={{
                display: "inline-block",
                verticalAlign: "middle",
                color: "#666",
                lineHeight: 1,
                width: "5em",
                height: "5em",
                border: "0.52em solid currentColor",
                borderTopColor: "rgba(102, 102, 102, 0.3)",
                borderRadius: "50%",
                boxSizing: "border-box",
                animation: "spin 1s linear infinite",
                position: "absolute",
                top: "50%",
                left: "50%"
            }}>
              </span>
        </div>
    );
}