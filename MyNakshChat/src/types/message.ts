export type Sender =
  | "system"
  | "user"
  | "ai_astrologer"
  | "human_astrologer";

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
  type: string;
  replyTo?: string;
  reaction?: string;
  hasFeedback?: boolean;
  feedbackType?: "liked" | "disliked";
}