import { useLoaderData } from "react-router-dom";
import { fetchStreamersRating } from "../../api/fetch-streamers-voting";
import { fetchUserVotes } from "../../api/fetch-user-votes";
import { StreamerRating } from "../../api/types";
import { MockUserId } from "../../mock-user-id";
import { SubmitStreamerForm } from "./submit-streamer-form";
import { StreamersWithVotes } from "./streamers-with-votes";
import { useState } from "react";
import { Modal } from "../../ui/modal";

export const streamersVotingLoader = async () => {
  return await Promise.all<[Array<StreamerRating>, Array<string>]>([
    fetchStreamersRating(),
    fetchUserVotes(),
  ]);
};

const mapError: Record<string, string> = {
  ERR_BAD_REQUEST: "Streamer already exists",
};

export const StreamersVotingWithSubmition = () => {
  const [streamerWithRating, userVotes] = useLoaderData() as [
    streamerWithRating: Array<StreamerRating>,
    userVotes: Array<string>
  ];

  const [streamers, setStreamers] = useState(streamerWithRating);
  const [exludedFromVoting, SetExludedFromVoting] =
    useState<Array<string>>(userVotes);
  const [error, setError] = useState<Record<string, string>>({
    code: "",
  });

  const addToExludedFromVotes = (id: string) => {
    SetExludedFromVoting([...exludedFromVoting, id]);
  };

  const voteForStreamer = (
    streamerId: string,
    action: "upvote" | "downvote"
  ) => {
    let streamerToUpdate = streamers.find(
      (item) => item.id === streamerId
    ) as StreamerRating;

    switch (action) {
      case "upvote":
        streamerToUpdate.upvote += 1;
        break;
      case "downvote":
        streamerToUpdate.downvote += 1;
    }

    const newStreamers = streamers.map((el) =>
      el.id === streamerToUpdate?.id ? streamerToUpdate : el
    );

    setStreamers(newStreamers);
    addToExludedFromVotes(streamerId);
  };

  const submitStreamer = (streamer: StreamerRating) => {
    setStreamers([streamer, ...streamers]);
  };

  const clearError = () => {
    setError({ code: "" });
  };

  return (
    <div className="streamers-voting-with-submition">
      <MockUserId />
      <SubmitStreamerForm submitStreamer={submitStreamer} setError={setError} />
      <StreamersWithVotes
        streamers={streamers}
        exludedFromVoting={exludedFromVoting}
        voteForStreamer={voteForStreamer}
        setError={setError}
      />
      <Modal
        handleClose={clearError}
        isOpen={!!error.code}
        closeButtonText="close"
      >
        {mapError[error?.code] || error.message}
      </Modal>
    </div>
  );
};
