
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export interface Trend {
  topic: string;
  description: string;
  link: string;
}
