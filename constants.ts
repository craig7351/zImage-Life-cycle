import { TimelineEvent } from './types';

// Helper to generate mock data
// Born in 1944 means age 80 is 2024
const BASE_YEAR = 1944;

// Prompt template - age will be replaced with actual value
const PROMPT_TEMPLATE = (age: number) =>
  `${age}歲 台灣女生，及肩棕色頭髮，自然淡妝，溫柔暖色的眼神，苗條身形，乾淨真實的肌膚質感，柔和微笑`;

// Data mapped exactly to the provided file list (17 files)
// Images are in public/images - use direct URL paths
export const TIMELINE_DATA: TimelineEvent[] = [
  { age: 4, title: "Early Childhood", description: "First memories and discovery.", imageUrl: "/images/4.webp" },
  { age: 8, title: "Grade School", description: "Learning to read and making friends.", imageUrl: "/images/8.webp" },
  { age: 12, title: "Growing Up", description: "The last days of childhood adventures.", imageUrl: "/images/12.webp" },
  { age: 16, title: "Sweet Sixteen", description: "High school, driving lessons, and dreams.", imageUrl: "/images/16.webp" },
  { age: 20, title: "University Life", description: "Studying hard and exploring the world.", imageUrl: "/images/20.webp" },
  { age: 24, title: "Early Career", description: "Stepping into the professional world.", imageUrl: "/images/24.webp" },
  { age: 28, title: "Independence", description: "Building a home and finding stability.", imageUrl: "/images/28.webp" },
  { age: 36, title: "Full Stride", description: "Confident in career and family life.", imageUrl: "/images/36.webp" },
  { age: 40, title: "The Milestone", description: "Reflecting on four decades of life.", imageUrl: "/images/40.webp" },
  { age: 45, title: "New Perspectives", description: "Embracing change and maturity.", imageUrl: "/images/45.webp" },
  { age: 50, title: "Half Century", description: "A golden milestone of wisdom.", imageUrl: "/images/50.webp" },
  { age: 55, title: "Established", description: "Mastery in work and life balance.", imageUrl: "/images/55.webp" },
  { age: 60, title: "Diamond Jubilee", description: "Celebrating experience and legacy.", imageUrl: "/images/60.webp" },
  { age: 65, title: "Transition", description: "Entering a new era of freedom.", imageUrl: "/images/65.webp" },
  { age: 70, title: "Platinum Years", description: "Grandchildren and golden memories.", imageUrl: "/images/70.webp" },
  { age: 75, title: "Quiet Strength", description: "Peace, reflection, and gratitude.", imageUrl: "/images/75.webp" },
  { age: 80, title: "The Oak Tree", description: "Standing tall with 80 years of stories.", imageUrl: "/images/80.webp" },
].map((item, index) => ({
  ...item,
  id: `event-${index}`,
  year: BASE_YEAR + item.age,
  prompt: PROMPT_TEMPLATE(item.age)
}));