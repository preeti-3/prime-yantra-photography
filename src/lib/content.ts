import { assets } from "./assets";

export const introduction =
  "From the first ring to the final wedding ritual, we preserve every celebration with candid emotion, vibrant colour and a timeless cinematic style.";

export const services = [
  {
    title: "Engagement",
    image: assets.home.imgRectangle6,
    slot: "home.imgRectangle6",
    alt: "Couple smiling at each other during a softly lit portrait session",
    description:
      "Relaxed engagement and pre-wedding portraits, guided just enough to keep every frame natural and personal.",
  },
  {
    title: "Haldi",
    image: assets.home.imgRectangle7,
    slot: "home.imgRectangle7",
    alt: "Woman in yellow haldi attire posing beside a column",
    description:
      "Candid coverage of the colour, laughter and family traditions that make your haldi feel alive.",
  },
  {
    title: "Sangeet",
    image: assets.home.imgRectangle8,
    slot: "home.imgRectangle8",
    alt: "Bride in pink wedding attire posing outdoors at night",
    description:
      "Expressive photographs of performances, dance, details and the people who bring your sangeet to life.",
  },
  {
    title: "Wedding",
    image: assets.home.imgRectangle9,
    slot: "home.imgRectangle9",
    alt: "Groom kissing the bride's forehead during their wedding celebration",
    description:
      "Wedding-day storytelling that brings together intimate rituals, composed portraits and unguarded emotion.",
  },
];

export type Gallery = {
  id: string;
  image: string;
  slot: string;
  alt: string;
};

const p = assets.portfolio;
export const portfolioGallery: Gallery[] = [
  { id: "photo-01", image: p.imgRectangle, slot: "portfolio.imgRectangle", alt: "Bride displaying her wedding jewellery and henna" },
  { id: "photo-02", image: p.imgRectangle1, slot: "portfolio.imgRectangle1", alt: "Bride posing outdoors in pink wedding attire at night" },
  { id: "photo-03", image: p.imgRectangle2, slot: "portfolio.imgRectangle2", alt: "Bride standing beside a tree during a night portrait" },
  { id: "photo-04", image: p.imgRectangle3, slot: "portfolio.imgRectangle3", alt: "Bride in profile adjusting her red wedding veil" },
  { id: "photo-05", image: p.imgRectangle4, slot: "portfolio.imgRectangle4", alt: "Bride smiling against rich red drapery" },
  { id: "photo-06", image: p.imgRectangle5, slot: "portfolio.imgRectangle5", alt: "Bride seated in red wedding attire before dark curtains" },
  { id: "photo-07", image: p.imgRectangle6, slot: "portfolio.imgRectangle6", alt: "Bride illuminated beneath a flowing red veil" },
  { id: "photo-08", image: p.imgRectangle7, slot: "portfolio.imgRectangle7", alt: "Soft bridal portrait framed by a translucent red veil" },
  { id: "photo-09", image: p.imgRectangle8, slot: "portfolio.imgRectangle8", alt: "Bride holding the embroidered edge of her red veil" },
  { id: "photo-10", image: p.imgEditorialCouture, slot: "portfolio.imgEditorialCouture", alt: "Bride and groom embracing beneath wedding lights" },
  { id: "photo-11", image: p.imgEditorialGreenGown, slot: "portfolio.imgEditorialGreenGown", alt: "Bride resting against the groom during their wedding celebration" },
  { id: "photo-12", image: p.imgEditorialRedBride, slot: "portfolio.imgEditorialRedBride", alt: "Groom kissing the bride's forehead" },
  { id: "photo-13", image: p.imgFullWeddingBride, slot: "portfolio.imgFullWeddingBride", alt: "Bride and groom standing together beneath colourful lights" },
  { id: "photo-14", image: p.imgFullWeddingCeremony, slot: "portfolio.imgFullWeddingCeremony", alt: "Bride and groom looking at each other during a wedding portrait" },
  { id: "photo-15", image: p.imgFullWeddingHaldi, slot: "portfolio.imgFullWeddingHaldi", alt: "Couple smiling together during a portrait session" },
  { id: "photo-16", image: p.imgFullPortraitBride, slot: "portfolio.imgFullPortraitBride", alt: "Bride and groom standing together on a decorated stage" },
  { id: "photo-17", image: p.imgFullPortraitGown, slot: "portfolio.imgFullPortraitGown", alt: "Bride and groom sharing a quiet wedding moment" },
  { id: "photo-18", image: p.imgFullPortraitTuxedo, slot: "portfolio.imgFullPortraitTuxedo", alt: "Groom photographed in dramatic directional light" },
  { id: "photo-19", image: p.imgFullEditorialDetails, slot: "portfolio.imgFullEditorialDetails", alt: "Black-and-white portrait of the groom beneath a geometric ceiling" },
  { id: "photo-20", image: p.imgFullEditorialMonument, slot: "portfolio.imgFullEditorialMonument", alt: "Woman in yellow haldi attire posing beside a column" },
  { id: "photo-21", image: p.imgFullEditorialLight, slot: "portfolio.imgFullEditorialLight", alt: "Bride leaning on the groom beneath wedding lights" },
];

export const philosophy = [
  { title: "01 - Observe", description: "We notice the glances, laughter and family moments that make every wedding celebration personal." },
  { title: "02 - Feel", description: "Real emotion leads every frame, so your photographs bring back how each ritual and celebration felt." },
  { title: "03 - Create", description: "Through light, colour and composition, we turn fleeting wedding moments into lasting visual stories." },
];
