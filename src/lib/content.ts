import { assets } from "./assets";

export const introduction = "Candid moments elevated through an editorial, cinematic lens. Specializing in high-end luxury weddings, lifestyle storytelling, and timeless romantic documentation.";

export const services = [
  { title: "Editorial Weddings", image: assets.home.imgRectangle6, slot: "home.imgRectangle6", alt: "A sunlit garden wedding reception in a Parisian courtyard", description: "Complete elite wedding weekend coverage. Includes multi-day events, pre-wedding engagement portraits, rehearsal dinners, and custom heirloom legacy albums.", price: "Contact for Pricing" },
  { title: "Cinematic Portraits", image: assets.home.imgRectangle7, slot: "home.imgRectangle7", alt: "Cinematic portrait of a woman in the warm glow of sunset", description: "Artfully directed individual, couple, or editorial sessions in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh. Focused on capturing elevated, magazine-caliber authentic character.", price: "Contact for Pricing" },
  { title: "Commercial & Editorial", image: assets.home.imgRectangle8, slot: "home.imgRectangle8", alt: "Delicate embroidered wedding gowns hanging in soft window light", description: "High-end campaign, lookbook, and lifestyle branding documentation for luxury travel, fashion, and organic wellness brands across Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.", price: "Inquire for Bespoke Quote" },
];

export type Category = "All" | "Wedding" | "Portraits" | "Editorial" | "Events";
export type Gallery = { id: string; category: Exclude<Category, "All">; title: string; image: string; slot: string; alt: string };
const p = assets.portfolio;
export const galleries: Record<string, Gallery> = {
  tuscan: { id: "tuscan", category: "Wedding", title: "Tuscan Villa Wedding", image: p.imgRectangle, slot: "portfolio.imgRectangle", alt: "A lush mountain valley beneath a dramatic golden sky" },
  florence: { id: "florence", category: "Portraits", title: "Florence Portrait Session", image: p.imgRectangle1, slot: "portfolio.imgRectangle1", alt: "Bride in an ivory gown beside a window overlooking Florence" },
  amalfiFeatured: { id: "amalfi-featured", category: "Editorial", title: "Amalfi Coast Editorial", image: p.imgRectangle2, slot: "portfolio.imgRectangle2", alt: "An elegant groom in a black tuxedo" },
  chateau: { id: "chateau", category: "Wedding", title: "Chateau de Villette Wedding", image: p.imgRectangle3, slot: "portfolio.imgRectangle3", alt: "Pastel sunset reflected in gentle waves along the shore" },
  parisWedding: { id: "paris-wedding", category: "Wedding", title: "Parisian Wedding Weekend", image: p.imgRectangle4, slot: "portfolio.imgRectangle4", alt: "Wedding tables and white flowers in an elegant European garden" },
  amalfiWedding: { id: "amalfi-wedding", category: "Wedding", title: "Amalfi Coast Wedding", image: p.imgRectangle5, slot: "portfolio.imgRectangle5", alt: "A woman lit by the golden light of an Amalfi sunset" },
  parisPortrait: { id: "paris-portrait", category: "Portraits", title: "Parisian Portrait Session", image: p.imgRectangle6, slot: "portfolio.imgRectangle6", alt: "A woman holding a vintage camera beside a tall Parisian window" },
  couple: { id: "couple", category: "Portraits", title: "Couple Portrait, Florence", image: p.imgRectangle7, slot: "portfolio.imgRectangle7", alt: "Hands arranging photographs and keepsakes on a sunlit desk" },
  provencePortrait: { id: "provence-portrait", category: "Portraits", title: "Editorial Portrait, Provence", image: p.imgRectangle8, slot: "portfolio.imgRectangle8", alt: "Embroidered ivory gowns hanging beside a window" },
  provence: { id: "provence", category: "Editorial", title: "Provence Editorial", image: p.imgEditorialCouture, slot: "portfolio.imgEditorialCouture", alt: "Detailed ivory couture gown in a softly lit studio" },
  parisFashion: { id: "paris-fashion", category: "Editorial", title: "Parisian Fashion Story", image: p.imgEditorialGreenGown, slot: "portfolio.imgEditorialGreenGown", alt: "Fashion portrait of a woman in an emerald green gown" },
  amalfiEditorial: { id: "amalfi-editorial", category: "Editorial", title: "Amalfi Coast Editorial", image: p.imgEditorialRedBride, slot: "portfolio.imgEditorialRedBride", alt: "Editorial bridal portrait in rich red couture" },
  fullWeddingBride: { id: "full-wedding-bride", category: "Wedding", title: "Manor House Bridal Portrait", image: p.imgFullWeddingBride, slot: "portfolio.imgFullWeddingBride", alt: "Smiling bride holding white flowers beside a manor window" },
  fullWeddingCeremony: { id: "full-wedding-ceremony", category: "Wedding", title: "Tuscan Garden Ceremony", image: p.imgFullWeddingCeremony, slot: "portfolio.imgFullWeddingCeremony", alt: "White floral wedding arch in a sunlit Italian garden" },
  fullWeddingHaldi: { id: "full-wedding-haldi", category: "Wedding", title: "Haldi Celebration", image: p.imgFullWeddingHaldi, slot: "portfolio.imgFullWeddingHaldi", alt: "Joyful couple surrounded by family during a colorful haldi ceremony" },
  fullPortraitBride: { id: "full-portrait-bride", category: "Portraits", title: "Bridal Portrait by Candlelight", image: p.imgFullPortraitBride, slot: "portfolio.imgFullPortraitBride", alt: "Bride in red standing beside a glowing chandelier" },
  fullPortraitGown: { id: "full-portrait-gown", category: "Portraits", title: "Quiet Bridal Study", image: p.imgFullPortraitGown, slot: "portfolio.imgFullPortraitGown", alt: "Intimate bridal portrait in soft natural light" },
  fullPortraitTuxedo: { id: "full-portrait-tuxedo", category: "Portraits", title: "Evening Portrait", image: p.imgFullPortraitTuxedo, slot: "portfolio.imgFullPortraitTuxedo", alt: "Formal portrait of a man in a tuxedo" },
  fullEditorialDetails: { id: "full-editorial-details", category: "Editorial", title: "Heirloom Details", image: p.imgFullEditorialDetails, slot: "portfolio.imgFullEditorialDetails", alt: "Hands arranging an heirloom journal in warm window light" },
  fullEditorialMonument: { id: "full-editorial-monument", category: "Editorial", title: "Architectural Study", image: p.imgFullEditorialMonument, slot: "portfolio.imgFullEditorialMonument", alt: "Editorial architectural portrait framed against the sky" },
  fullEditorialLight: { id: "full-editorial-light", category: "Editorial", title: "Light and Form", image: p.imgFullEditorialLight, slot: "portfolio.imgFullEditorialLight", alt: "Editorial silhouette posed against dramatic light" },
};

export const gallerySections = [
  { id: "featured", eyebrow: "Featured Gallery", title: "Standout Stories", featured: true, items: [galleries.tuscan, galleries.florence, galleries.amalfiFeatured] },
  { id: "weddings", eyebrow: "Wedding", title: "Timeless Wedding Stories", items: [galleries.chateau, galleries.parisWedding, galleries.amalfiWedding] },
  { id: "portraits", eyebrow: "Portraits", title: "Intimate Portraits", items: [galleries.parisPortrait, galleries.couple, galleries.provencePortrait] },
  { id: "editorial", eyebrow: "Editorial", title: "Editorial & Fashion", items: [galleries.provence, galleries.parisFashion, galleries.amalfiEditorial] },
];

export const fullGallery = [
  galleries.fullWeddingBride,
  galleries.fullPortraitBride,
  galleries.fullEditorialDetails,
  galleries.fullWeddingCeremony,
  galleries.fullPortraitGown,
  galleries.fullEditorialMonument,
  galleries.fullWeddingHaldi,
  galleries.fullPortraitTuxedo,
  galleries.fullEditorialLight,
];

export const philosophy = [
  { title: "01 - Observe", description: "I look beyond the obvious to find the small moments that make a story personal." },
  { title: "02 - Feel", description: "Emotion is at the heart of every photograph. I want images to feel as real as the moment itself." },
  { title: "03 - Create", description: "Through light, composition, and perspective, I turn fleeting moments into timeless visual stories." },
];
