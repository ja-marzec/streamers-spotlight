import axios from "axios";
import { voteForStreamerEndpoint } from "./endpoints";
import { VoteAction } from "./types";

export async function putVoteForStreamer(
  streamerId: string,
  action: VoteAction
) {
  return await axios.put(voteForStreamerEndpoint(streamerId), {
    action,
    headers: {
      UserId: window.localStorage.getItem("userId"),
    },
  });
}
