import axios from "axios";
import { streamersEndpoint } from "./endpoints";
import { StreamerBaseInfo } from "./types";

export async function postSubmitNewStreamer(streamerInfo: StreamerBaseInfo) {
  return await axios.post(streamersEndpoint, {
    ...streamerInfo,
  });
}
