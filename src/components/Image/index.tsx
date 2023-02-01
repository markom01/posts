import { ImgHTMLAttributes } from "react";
// import styles from "./index.module";

interface ImageProps {
  fullName?: string;
  rounded?: boolean;
  attrs?: ImgHTMLAttributes<HTMLImageElement>;
}

export default function Image({ fullName, rounded, attrs }: ImageProps) {
  if (attrs.width && rounded) attrs.height = attrs.width;
  return (
    <img
      onError={(e) => {
        e.currentTarget.src = require("../../assets/placeholderUser.svg");
      }}
      alt={fullName ?? ""}
      title={fullName ?? ""}
      className={rounded ? "rounded" : ""}
      {...attrs}
    />
  );
}
