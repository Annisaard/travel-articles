import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface NextImageCustomProps extends ImageProps {
  fallbackSrc?: string;
}

const isExternal = (src: ImageProps["src"]) => {
  if (typeof src !== "string") return false;
  return src.startsWith("http");
};

export const NextImage = ({
  fallbackSrc = "/no-image.png",
  src,
  alt,
  ...props
}: NextImageCustomProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // 👉 EXTERNAL IMAGE → pakai <img>
  if (isExternal(imgSrc)) {
    return (
      <img
        src={imgSrc as string}
        alt={alt ?? "image"}
        onError={() => setImgSrc(fallbackSrc)}
        className={props.className}
      />
    );
  }

  // 👉 LOCAL IMAGE → pakai next/image
  return (
    <Image {...props} src={imgSrc} alt={alt ?? "image"} onError={() => setImgSrc(fallbackSrc)} />
  );
};
