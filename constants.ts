import { TimelineEvent } from './types';

// Helper to generate mock data
// Born in 1944 means age 80 is 2024
const BASE_YEAR = 1944;

// Data mapped exactly to the provided file list (17 files)
// Ages: 4, 8, 12, 16, 20, 24, 28 (4-year steps)
// SKIP 32 (file missing)
// Ages: 36, 40 (4-year steps)
// Ages: 45, 50, 55, 60, 65, 70, 75, 80 (5-year steps)
export const TIMELINE_DATA: TimelineEvent[] = [
  { age: 4, title: "Early Childhood", description: "First memories and discovery.", imageUrl: "./4.png" },
  { age: 8, title: "Grade School", description: "Learning to read and making friends.", imageUrl: "./8.png" },
  { age: 12, title: "Growing Up", description: "The last days of childhood adventures.", imageUrl: "./12.png" },
  { age: 16, title: "Sweet Sixteen", description: "High school, driving lessons, and dreams.", imageUrl: "./16.png" },
  { age: 20, title: "University Life", description: "Studying hard and exploring the world.", imageUrl: "./20.png" },
  { age: 24, title: "Early Career", description: "Stepping into the professional world.", imageUrl: "./24.png" },
  { age: 28, title: "Independence", description: "Building a home and finding stability.", imageUrl: "./28.png" },
  { age: 36, title: "Full Stride", description: "Confident in career and family life.", imageUrl: "./36.png" },
  { age: 40, title: "The Milestone", description: "Reflecting on four decades of life.", imageUrl: "./40.png" },
  { age: 45, title: "New Perspectives", description: "Embracing change and maturity.", imageUrl: "./45.png" },
  { age: 50, title: "Half Century", description: "A golden milestone of wisdom.", imageUrl: "./50.png" },
  { age: 55, title: "Established", description: "Mastery in work and life balance.", imageUrl: "./55.png" },
  { age: 60, title: "Diamond Jubilee", description: "Celebrating experience and legacy.", imageUrl: "./60.png" },
  { age: 65, title: "Transition", description: "Entering a new era of freedom.", imageUrl: "./65.png" },
  { age: 70, title: "Platinum Years", description: "Grandchildren and golden memories.", imageUrl: "./70.png" },
  { age: 75, title: "Quiet Strength", description: "Peace, reflection, and gratitude.", imageUrl: "./75.png" },
  { age: 80, title: "The Oak Tree", description: "Standing tall with 80 years of stories.", imageUrl: "./80.png" },
].map((item, index) => ({
  ...item,
  id: `event-${index}`,
  year: BASE_YEAR + item.age
}));