import React from "react";
import styled from "styled-components";

interface TrackImageProps {
  imageURL: string;
  name: string;
  className?: string;
}
const TrackImage = ({ imageURL, name, className }: TrackImageProps) => (
  <img
    src={imageURL}
    className={`mr-3 img-thumbnail ${className}`}
    alt={name}
  />
);
const StyledTrackImage = styled(TrackImage)`
  max-width: 7rem;
`;

export default function Track({ track }: { track: Track }) {
  return (
    <li className='list-group-item mb-2 hover-shadow'>
      <div className='media align-items-center'>
        <StyledTrackImage imageURL={track.imageURL} name={track.name} />
        <div className='media-body'>
          <h5 className='mt-0 mb-3'>{track.name}</h5>
          <div className='row mb-3'>
            <div className='col-md-6 d-flex align-items-center'>
              <small className='font-weight-bold mr-2'>Type :</small>
              <span className='badge badge-pill badge-info'>{track.type}</span>
            </div>
            <div className='col-md-6 d-flex align-items-center'>
              <small className='font-weight-bold mr-2'>Release Date :</small>
              <span className='badge badge-pill badge-dark'>
                {track.releaseDate}
              </span>
            </div>
          </div>
          {track.previewURL ? (
            <audio controls>
              <source src={track.previewURL} type='audio/mpeg' />
              Your browser does not support the audio tag.
            </audio>
          ) : null}
        </div>
      </div>
    </li>
  );
}
