import React from "react";
import Track from "./Track";

export default function TracksList({ tracksList }: { tracksList: Track[] }) {
  return (
    <ul className='list-group py-4'>
      {tracksList.map((track: any) => (
        <Track track={track} key={track.id} />
      ))}
    </ul>
  );
}
