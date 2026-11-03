"use client";

import Image, { type ImageProps } from "next/image";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ImageOverrides } from "@/lib/image-slots";

const ImagesContext = createContext<ImageOverrides>({});

export function ImagesProvider({ initialImages, children }: { initialImages: ImageOverrides; children: ReactNode }) {
  const [images, setImages] = useState(initialImages);
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/images", { cache: "no-store", signal: controller.signal });
        if (response.ok) setImages(await response.json());
      } catch { /* Keep the last working images during a connection failure. */ }
    }
    const timer = window.setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("images-updated", refresh);
    return () => {
      controller.abort(); window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("images-updated", refresh);
    };
  }, []);
  return <ImagesContext.Provider value={images}>{children}</ImagesContext.Provider>;
}

export function ManagedImage({ slot, src, alt, ...props }: ImageProps & { slot?: string }) {
  const images = useContext(ImagesContext);
  const replacement = slot ? images[slot] : undefined;
  return <Image {...props} src={replacement?.url || src} alt={replacement?.alt || alt} unoptimized />;
}
