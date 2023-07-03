import {
  StreamerBaseInfo,
  StreamerRating,
  StreamingPlatforms,
} from "../../api/types";
import { useState } from "react";
import { postSubmitNewStreamer } from "../../api/post-submit-new-streamer";

const streamingPlatforms: StreamingPlatforms[] = [
  "Twitch",
  "YouTube",
  "TikTok",
  "Kick",
  "Rumble",
];

const initialState: StreamerBaseInfo = {
  name: "",
  description: "",
  streamingPlatform: streamingPlatforms[0],
};

interface SubmitStreamerFormProps {
  submitStreamer: (payload: StreamerRating) => void;
  setError: React.SetStateAction<any>;
}

export const SubmitStreamerForm = (props: SubmitStreamerFormProps) => {
  const [streamerInfo, setStreamerInfo] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleUserInput = (e: any) => {
    const name: "name" | "description" | "streamingPlatform" = e.target.name;
    const value : string = e.target.value;

    setStreamerInfo((s) => ({ ...s, [name]: value }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let res;

    try {
      res = await postSubmitNewStreamer(streamerInfo);
    } catch (err: any) {
      setLoading(false);
      props.setError(err);
      return;
    }

    if (res.status === 201) {
      setStreamerInfo(initialState);
      props.submitStreamer(res.data);
      setLoading(false);
    }
  };

  const disabledSubmit =
    streamerInfo.description.length === 0 || streamerInfo.name.length === 0;

  return (
    <div>
      <h2 className="title">SUBMIT NEW STREAMER</h2>
      <form onSubmit={submit} className="streamer-submit">
        <label htmlFor="name">Name</label>
        <input
          required={true}
          value={streamerInfo.name}
          placeholder="Write name"
          name="name"
          onChange={handleUserInput}
          className="name"
          maxLength={20}
        />
        <label htmlFor="streamingPlatform">Streaming platform</label>
        <select
          value={streamerInfo.streamingPlatform}
          required={true}
          name="streamingPlatform"
          onChange={handleUserInput}
          className="streaming-platform"
        >
          {streamingPlatforms.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="description">Description</label>
        <textarea
          required={true}
          value={streamerInfo.description}
          placeholder="Write description"
          name="description"
          onChange={handleUserInput}
          className="description"
          rows={10}
          maxLength={200}
        />
        <button
          type="submit"
          className={`submit  ${disabledSubmit && "submit--disable"}`}
          disabled={disabledSubmit}
        >
          {disabledSubmit ? "FILL ALL INPUTS" : "SEND SUBMITION"}
          {loading ? "LOADING..." : ""}
        </button>
      </form>
    </div>
  );
};
