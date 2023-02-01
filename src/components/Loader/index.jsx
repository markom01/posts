import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default function Loader({ children }) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "grid",
            placeContent: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
