import { assets } from "./assets";

export const introduction =
  "From the first ring to the final wedding ritual, we preserve every celebration with candid emotion, vibrant colour and a timeless cinematic style.";

export const services = [
  {
    title: "Engagement",
    image: assets.home.imgRectangle6,
    slot: "home.imgRectangle6",
    alt: "Engaged couple celebrating together in formal wedding attire",
    description:
      "Relaxed engagement and pre-wedding portraits, guided just enough to keep every frame natural and personal.",
  },
  {
    title: "Haldi",
    image: assets.home.imgRectangle7,
    slot: "home.imgRectangle7",
    alt: "Bride smiling during a joyful pre-wedding celebration",
    description:
      "Candid coverage of the colour, laughter and family traditions that make your haldi feel alive.",
  },
  {
    title: "Sangeet",
    image: assets.home.imgRectangle8,
    slot: "home.imgRectangle8",
    alt: "Close portrait of a woman wearing a green sequined gown and statement necklace",
    description:
      "Expressive photographs of performances, dance, details and the people who bring your sangeet to life.",
  },
  {
    title: "Wedding",
    image: assets.home.imgRectangle9,
    slot: "home.imgRectangle9",
    alt: "Couple in formal attire posing together on a staircase",
    description:
      "Wedding-day storytelling that brings together intimate rituals, composed portraits and unguarded emotion.",
  },
];

export const categories = ["All", "Engagement", "Haldi", "Sangeet", "Wedding"] as const;
export type Category = (typeof categories)[number];
export type Gallery = {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  image: string;
  slot: string;
  alt: string;
};

const p = assets.portfolio;
export const galleries: Record<string, Gallery> = {
  engagementStory: { id: "engagement-story", category: "Engagement", title: "A Promise Begins", image: p.imgRectangle, slot: "portfolio.imgRectangle", alt: "Couple photographed together during their engagement story" },
  engagementPortrait: { id: "engagement-portrait", category: "Engagement", title: "Together, Naturally", image: p.imgRectangle1, slot: "portfolio.imgRectangle1", alt: "Romantic engagement portrait in soft natural light" },
  engagementEvening: { id: "engagement-evening", category: "Engagement", title: "The Ring and the Romance", image: p.imgRectangle2, slot: "portfolio.imgRectangle2", alt: "Elegant couple portrait celebrating an engagement" },
  haldiJoy: { id: "haldi-joy", category: "Haldi", title: "Sunshine and Smiles", image: p.imgRectangle3, slot: "portfolio.imgRectangle3", alt: "Joyful family moments during a colourful haldi ceremony" },
  haldiRituals: { id: "haldi-rituals", category: "Haldi", title: "A Celebration in Yellow", image: p.imgRectangle4, slot: "portfolio.imgRectangle4", alt: "Close portrait of a bride wearing traditional jewellery" },
  haldiCandid: { id: "haldi-candid", category: "Haldi", title: "Colour, Laughter, Love", image: p.imgRectangle5, slot: "portfolio.imgRectangle5", alt: "Bride in red attire looking beyond the camera" },
  sangeetStage: { id: "sangeet-stage", category: "Sangeet", title: "Lights, Music, Memories", image: p.imgRectangle6, slot: "portfolio.imgRectangle6", alt: "Evening sangeet celebration with music and festive lights" },
  sangeetDance: { id: "sangeet-dance", category: "Sangeet", title: "Dancing Together", image: p.imgRectangle7, slot: "portfolio.imgRectangle7", alt: "Warm points of light scattered across a dark background" },
  sangeetDetails: { id: "sangeet-details", category: "Sangeet", title: "The Festive Details", image: p.imgRectangle8, slot: "portfolio.imgRectangle8", alt: "Close portrait of a woman in a green sequined gown" },
  weddingBride: { id: "wedding-bride", category: "Wedding", title: "The Bridal Story", image: p.imgEditorialCouture, slot: "portfolio.imgEditorialCouture", alt: "Couple sharing a quiet embrace beside a window" },
  weddingPortrait: { id: "wedding-portrait", category: "Wedding", title: "Made for Each Other", image: p.imgEditorialGreenGown, slot: "portfolio.imgEditorialGreenGown", alt: "Timeless wedding portrait with cinematic light" },
  weddingVows: { id: "wedding-vows", category: "Wedding", title: "Sacred Promises", image: p.imgEditorialRedBride, slot: "portfolio.imgEditorialRedBride", alt: "Bride framed in a doorway during a dramatic portrait" },
  fullEngagementOne: { id: "full-engagement-one", category: "Engagement", title: "New Beginnings", image: p.imgFullWeddingBride, slot: "portfolio.imgFullWeddingBride", alt: "Engagement portrait capturing a joyful new beginning" },
  fullEngagementTwo: { id: "full-engagement-two", category: "Engagement", title: "Just the Two of Us", image: p.imgFullWeddingCeremony, slot: "portfolio.imgFullWeddingCeremony", alt: "Couple together during a romantic pre-wedding session" },
  fullHaldiOne: { id: "full-haldi-one", category: "Haldi", title: "Haldi Happiness", image: p.imgFullWeddingHaldi, slot: "portfolio.imgFullWeddingHaldi", alt: "Joyful couple surrounded by loved ones during haldi" },
  fullHaldiTwo: { id: "full-haldi-two", category: "Haldi", title: "Family Traditions", image: p.imgFullPortraitBride, slot: "portfolio.imgFullPortraitBride", alt: "Detail portrait of a woman in a green gown and silver necklace" },
  fullSangeetOne: { id: "full-sangeet-one", category: "Sangeet", title: "An Evening to Remember", image: p.imgFullPortraitGown, slot: "portfolio.imgFullPortraitGown", alt: "Bride ready for a glamorous sangeet evening" },
  fullSangeetTwo: { id: "full-sangeet-two", category: "Sangeet", title: "Celebration in Motion", image: p.imgFullPortraitTuxedo, slot: "portfolio.imgFullPortraitTuxedo", alt: "Formal portrait from an energetic sangeet celebration" },
  fullWeddingOne: { id: "full-wedding-one", category: "Wedding", title: "The Little Details", image: p.imgFullEditorialDetails, slot: "portfolio.imgFullEditorialDetails", alt: "Carefully arranged heirloom details from a wedding day" },
  fullWeddingTwo: { id: "full-wedding-two", category: "Wedding", title: "A Timeless Bride", image: p.imgFullEditorialMonument, slot: "portfolio.imgFullEditorialMonument", alt: "Indian bride in red photographed in an architectural setting" },
  fullWeddingThree: { id: "full-wedding-three", category: "Wedding", title: "Forever Starts Here", image: p.imgFullEditorialLight, slot: "portfolio.imgFullEditorialLight", alt: "Newly married couple photographed in dramatic light" },
};

export const gallerySections = [
  { id: "featured", eyebrow: "Featured Celebrations", title: "The Wedding Journey", featured: true, items: [galleries.engagementStory, galleries.haldiJoy, galleries.weddingVows] },
  { id: "engagement", eyebrow: "Engagement", title: "Where Your Story Begins", items: [galleries.engagementStory, galleries.engagementPortrait, galleries.engagementEvening] },
  { id: "haldi", eyebrow: "Haldi", title: "Colour, Tradition and Joy", items: [galleries.haldiJoy, galleries.haldiRituals, galleries.haldiCandid] },
  { id: "sangeet", eyebrow: "Sangeet", title: "An Evening Full of Energy", items: [galleries.sangeetStage, galleries.sangeetDance, galleries.sangeetDetails] },
  { id: "wedding", eyebrow: "Wedding", title: "The Day You Say Forever", items: [galleries.weddingBride, galleries.weddingPortrait, galleries.weddingVows] },
];

export const fullGallery = [
  galleries.fullEngagementOne,
  galleries.fullHaldiOne,
  galleries.fullWeddingOne,
  galleries.fullSangeetOne,
  galleries.fullEngagementTwo,
  galleries.fullWeddingTwo,
  galleries.fullHaldiTwo,
  galleries.fullSangeetTwo,
  galleries.fullWeddingThree,
];

export const philosophy = [
  { title: "01 - Observe", description: "We notice the glances, laughter and family moments that make every wedding celebration personal." },
  { title: "02 - Feel", description: "Real emotion leads every frame, so your photographs bring back how each ritual and celebration felt." },
  { title: "03 - Create", description: "Through light, colour and composition, we turn fleeting wedding moments into lasting visual stories." },
];
