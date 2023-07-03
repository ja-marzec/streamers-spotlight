import axios from "axios";
import { streamersEndpoint } from "./endpoints";

export async function fetchStreamersRating() {
  const res = await axios.get(streamersEndpoint);
  return res.data;
}
