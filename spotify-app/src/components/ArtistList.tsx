import React, { Fragment } from "react";
import Artist from "./Artist";

interface ArtistListProps {
  artistsList: Artist[];
  displayTracksList: (artistID: string) => void;
}

export default function ArtistList({
  artistsList,
  displayTracksList,
}: ArtistListProps) {
  const handleClick = (artistID: string) => displayTracksList(artistID);
  const artistElemens = artistsList.map((artist: Artist) => {
    const artistID = artist.id;
    return (
      <Artist
        artist={artist}
        key={artistID}
        handleClick={(artistID: string) => handleClick(artistID)}
      />
    );
  });

  return (
    <Fragment>
      {artistsList.length ? (
        <div className='ArtistList card-columns p-4'>{artistElemens}</div>
      ) : null}
    </Fragment>
  );
}
