import Register from "@/components/Authentication/Register/Register";
import React from "react";

export default function RegisterPage() {
  return (
    <main
      style={{
        height: "100vh",
      }}
    >
      <Register />
    </main>
    // <div
    //   style={{
    //     height: "100vh",
    //     width: "100%",
    //     backgroundColor: "red",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <div
    //     style={{
    //       margin: 0,
    //       width: "100%",
    //       height: "100%",
    //       maxWidth: "600px",
    //       backgroundColor: "yellow",
    //       padding: "20px",
    //     }}
    //   >
    //     Content inside the yellow div
    //   </div>
    // </div>
  );
}
