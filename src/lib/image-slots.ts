import { assets } from "./assets";

const labels: Record<string, string> = {
  "home.imgFrame": "Main hero",
  "home.imgRectangle": "Selected stories — first photo",
  "home.imgRectangle1": "Selected stories — second photo",
  "home.imgRectangle2": "Selected stories — third photo",
  "home.imgRectangle3": "Selected stories — fourth photo",
  "home.imgRectangle4": "About the photographer — main photo",
  "home.imgRectangle5": "About the photographer — detail photo",
  "home.imgRectangle6": "Wedding service",
  "home.imgRectangle7": "Portrait service",
  "home.imgRectangle8": "Editorial service",
  "portfolio.imgHeroImage": "Portfolio hero",
  "about.imgHeroImage": "About page hero",
  "about.imgFrame": "About page story",
  "shared.logo": "Header logo",
  "shared.footerLogo": "Footer logo",
};

export const imageSlots = Object.entries(assets).flatMap(([group, entries]) =>
  Object.entries(entries)
    .filter(([name]) => !["imgArrowRight", "imgLine", "imgChevronRight"].includes(name))
    .map(([name, src], index) => ({
      id: `${group}.${name}`,
      group: group === "home" ? "Home" : group === "portfolio" ? "Portfolio" : group === "about" ? "About" : "Branding",
      label: labels[`${group}.${name}`] || `Gallery photo ${index}`,
      src,
    })),
);

export type ImageOverride = { url: string; alt: string; updatedAt: string };
export type ImageOverrides = Record<string, ImageOverride>;
export const findImageSlot = (id: string) => imageSlots.find((slot) => slot.id === id);
