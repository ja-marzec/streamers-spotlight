import { Link, useLoaderData } from "react-router-dom";
import { fetchStreamerDetails } from "../../api/fetch-streamer-details";
import { StreamerDetailsResponse } from "../../api/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export const streamerDetailsLoader = async ({
  params,
}: any): Promise<StreamerDetailsResponse> => {
  return await fetchStreamerDetails(params.streamerId);
};

export const StreamerDetails = () => {
  const details = useLoaderData() as Awaited<
    ReturnType<typeof streamerDetailsLoader>
  >;

  return (
    <div className="streamer-details">
        <LazyLoadImage
          src={details.avatar}
          width={200}
          height={200}
          className="avatar"
          placeholderSrc='/image-loader.jpg'
          effect="blur"
        />
      <div className="info">
        <h1 className="name">Name: {details.name}</h1>
        <h3 className="subtitle">
          <span className="category">Platform: </span>
          {details.streamingPlatform}
        </h3>
        <h3 className="subtitle">
          <span className="category">Description:</span>
        </h3>
        <p className="description">{details.description}</p>
        <Link to="/" className="go-to-main">
          GO TO MAIN PAGE
        </Link>
      </div>
    </div>
  );
};
