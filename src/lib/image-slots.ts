import { assets } from "./assets";

const labels: Record<string, string> = {
  "home.imgFrame": "Main hero",
  "home.imgRectangle": "Selected stories — first photo",
  "home.imgRectangle1": "Selected stories — second photo",
  "home.imgRectangle2": "Selected stories — third photo",
  "home.imgRectangle3": "Selected stories — haldi celebration",
  "home.imgRectangle4": "Studio introduction — couple portrait",
  "home.imgRectangle5": "About the photographer — detail photo",
  "home.imgRectangle6": "Engagement photography service",
  "home.imgRectangle7": "Haldi photography service",
  "home.imgRectangle8": "Sangeet photography service",
  "home.imgRectangle9": "Wedding photography service",
  "portfolio.imgHeroImage": "Portfolio hero",
  "about.imgHeroImage": "About page hero",
  "about.imgFrame": "About page story",
  "shared.logo": "Header logo",
  "shared.footerLogo": "Footer logo",
};

const descriptions: Record<string, string> = {
  "home.imgFrame": "Bride leaning on the groom beneath wedding lights",
  "home.imgRectangle": "Bride seated in red wedding attire before dark curtains",
  "home.imgRectangle1": "Bride and groom embracing beneath wedding lights",
  "home.imgRectangle2": "Bride in profile adjusting her red wedding veil",
  "home.imgRectangle3": "Bride standing close to the groom in formal wedding attire",
  "home.imgRectangle4": "Black-and-white portrait of the groom beneath a geometric ceiling",
  "home.imgRectangle5": "Bride displaying her wedding jewellery and henna",
  "home.imgRectangle6": "Couple smiling at each other during a softly lit portrait session",
  "home.imgRectangle7": "Woman in yellow haldi attire posing beside a column",
  "home.imgRectangle8": "Bride in pink wedding attire posing outdoors at night",
  "home.imgRectangle9": "Groom kissing the bride's forehead during their wedding celebration",
  "portfolio.imgHeroImage": "Bride and groom standing together beneath colourful wedding lights",
  "portfolio.imgRectangle": "Bride displaying her wedding jewellery and henna",
  "portfolio.imgRectangle1": "Bride posing outdoors in pink wedding attire at night",
  "portfolio.imgRectangle2": "Bride standing beside a tree during a night portrait",
  "portfolio.imgRectangle3": "Bride in profile adjusting her red wedding veil",
  "portfolio.imgRectangle4": "Bride smiling against rich red drapery",
  "portfolio.imgRectangle5": "Bride seated in red wedding attire before dark curtains",
  "portfolio.imgRectangle6": "Bride illuminated beneath a flowing red veil",
  "portfolio.imgRectangle7": "Soft bridal portrait framed by a translucent red veil",
  "portfolio.imgRectangle8": "Bride holding the embroidered edge of her red veil",
  "portfolio.imgEditorialCouture": "Bride and groom embracing beneath wedding lights",
  "portfolio.imgEditorialGreenGown": "Bride resting against the groom during their wedding celebration",
  "portfolio.imgEditorialRedBride": "Groom kissing the bride's forehead",
  "portfolio.imgFullWeddingBride": "Bride and groom standing together beneath colourful lights",
  "portfolio.imgFullWeddingCeremony": "Bride and groom looking at each other during a wedding portrait",
  "portfolio.imgFullWeddingHaldi": "Couple smiling together during a portrait session",
  "portfolio.imgFullPortraitBride": "Bride and groom standing together on a decorated stage",
  "portfolio.imgFullPortraitGown": "Bride and groom sharing a quiet wedding moment",
  "portfolio.imgFullPortraitTuxedo": "Groom photographed in dramatic directional light",
  "portfolio.imgFullEditorialDetails": "Black-and-white portrait of the groom beneath a geometric ceiling",
  "portfolio.imgFullEditorialMonument": "Woman in yellow haldi attire posing beside a column",
  "portfolio.imgFullEditorialLight": "Bride leaning on the groom beneath wedding lights",
  "about.imgHeroImage": "Bride seated in red wedding attire before dark curtains",
  "about.imgFrame": "Bride resting against the groom during their wedding celebration",
  "shared.logo": "Prime Yantra Photography",
  "shared.footerLogo": "Prime Yantra Photography",
};

export const imageSlots = Object.entries(assets).flatMap(([group, entries]) =>
  Object.entries(entries)
    .filter(([name]) => !["imgArrowRight", "imgLine", "imgChevronRight"].includes(name))
    .map(([name, src], index) => ({
      id: `${group}.${name}`,
      group: group === "home" ? "Home" : group === "portfolio" ? "Portfolio" : group === "about" ? "About" : "Branding",
      label: labels[`${group}.${name}`] || `Gallery photo ${index}`,
      description: descriptions[`${group}.${name}`] || labels[`${group}.${name}`] || `Gallery photo ${index}`,
      src,
    })),
);

export type ImageOverride = { url: string; alt: string; updatedAt: string };
export type ImageOverrides = Record<string, ImageOverride>;
export const findImageSlot = (id: string) => imageSlots.find((slot) => slot.id === id);
