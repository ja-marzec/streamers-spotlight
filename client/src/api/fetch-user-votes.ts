import axios from "axios";
import { userEndpoint } from "./endpoints";

export async function fetchUserVotes() {
  const res = await axios.get(userEndpoint, {
    headers: {
      UserId: window.localStorage.getItem("userId"),
    },
  });

  return res.data;
}
