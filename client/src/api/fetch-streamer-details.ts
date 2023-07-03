import axios from "axios";
import { streamersDetailsEndpoint } from "./endpoints";

export async function fetchStreamerDetails(id: string) {
  const res = await axios.get(streamersDetailsEndpoint(id));
  return res.data;
}
