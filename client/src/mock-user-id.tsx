import axios from "axios";
import { useEffect, useState } from "react";

export const MockUserId = () => {
  const storedUserId = window.localStorage.getItem("userId") as string;
  const [userId, setUserId] = useState(storedUserId);

  const updateHeaderUserId = (newId: string) => {
    setUserId(newId);
    axios.defaults.headers.common.UserId = newId;
    window.localStorage.setItem("userId", newId);
  };

  useEffect(() => {
    axios.defaults.headers.common.UserId =
      window.localStorage.getItem("userId");
  }, []);

  return (
    <div>
      <label htmlFor="mockUserId">MOCK USER ID </label>
      <input
        name="mockUserId"
        value={userId}
        placeholder="111"
        onChange={(event) => updateHeaderUserId(event.target.value)}
      />
      <button
        style={{ marginLeft: "0.5rem" }}
        onClick={() => window.location.reload()}
      >
        RELOAD
      </button>
    </div>
  );
};
