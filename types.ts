export interface TimelineEvent {
  id: string;
  age: number;
  year: number;
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
}

export interface EraContext {
  summary: string;
  highlight: string;
}
