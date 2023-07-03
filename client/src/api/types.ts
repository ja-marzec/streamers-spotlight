export type StreamingPlatforms =
  | "Twitch"
  | "YouTube"
  | "TikTok"
  | "Kick"
  | "Rumble";

export type StreamerBaseInfo = {
  name: string;
  streamingPlatform: StreamingPlatforms;
  description: string;
};

export type StreamerDetailsResponse = {
  avatar: string;
} & StreamerBaseInfo;

export type StreamerRating = {
  name: string;
  upvote: number;
  downvote: number;
  id: string;
};

export type VoteAction = "upvote" | "downvote";
