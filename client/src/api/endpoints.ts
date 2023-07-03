// COULD BE IN .ENV
export const baseEndpoint = "http://localhost:3001";

export const streamersEndpoint = `${baseEndpoint}/streamers`;
export const userEndpoint = `${baseEndpoint}/user`;

export const streamersDetailsEndpoint = (streamerId: string) =>
  `${streamersEndpoint}/${streamerId}`;

export const voteForStreamerEndpoint = (streamerId: string) =>
  `${streamersDetailsEndpoint(streamerId)}/vote`;
