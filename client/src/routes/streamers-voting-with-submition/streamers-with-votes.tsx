import { Link } from "react-router-dom";
import { StreamerRating, VoteAction } from "../../api/types";
import { putVoteForStreamer } from "../../api/put-vote-for-streamer copy";

type OnVote = (streamerId: string, action: VoteAction) => Promise<void>;

interface StreamerCardProps {
  streamerInfo: StreamerRating;
  onVote: OnVote;
  disableVoting: boolean;
}

const StreamerCard = (props: StreamerCardProps) => {
  return (
    <div className="card">
      <div>
        <h6 className="name">
          Name:
          <br />
          {props.streamerInfo.name}
        </h6>
        <div className="votes">
          <div>Upvotes: {props.streamerInfo.upvote}</div>
          <div>Downvotes: {props.streamerInfo.downvote}</div>
        </div>
        {props.disableVoting ? (
          <span className="already-voted">ALREADY VOTED</span>
        ) : (
          <div className={`actions`}>
            <button
              onClick={() => props.onVote(props.streamerInfo.id, "upvote")}
              disabled={props.disableVoting}
              className={`${props.disableVoting && "vote--disable"}`}
            >
              UPVOTE
            </button>
            <button
              onClick={() => props.onVote(props.streamerInfo.id, "downvote")}
              disabled={props.disableVoting}
              className={`${props.disableVoting && "vote--disable"}`}
            >
              DOWNVOTE
            </button>
          </div>
        )}
      </div>

      <Link className="go-to-details" to={`/${props.streamerInfo.id}`}>
        View details
      </Link>
    </div>
  );
};

interface StreamersWithVotesProps {
  streamers: StreamerRating[];
  exludedFromVoting: string[];
  voteForStreamer: (streamerId: string, action: VoteAction) => void;
  setError: any;
}

export const StreamersWithVotes = (props: StreamersWithVotesProps) => {
  
  const vote: OnVote = async (streamerId, action) => {
    try {
      await putVoteForStreamer(streamerId, action);
    } catch (err: any) {
      props.setError(err);
      return;
    }

    props.voteForStreamer(streamerId, action);
  };

  return (
    <div className="votes">
      <h2 className="title">VOTE FOR STREAMER!</h2>
      {!props.streamers.length && (
        <>
          <p className="no-streamers-info">
            A LITTLE BIT SILENT HERE - ADD STREAMER TO VOTE!
          </p>
          <p className="dev-info">
            Type those manualy or use: <code>npm run seed</code> in{" "}
            <code>/service</code> directory to create 10 streamers.
            <br />
            To clear data afterwards use: <code>npm run clear-data</code>.
          </p>
        </>
      )}
      <div className="streamer-cards-wrapper">
        {props.streamers.map((item: StreamerRating) => (
          <StreamerCard
            streamerInfo={item}
            key={item.id}
            onVote={vote}
            disableVoting={props.exludedFromVoting.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
