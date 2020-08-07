import React from "react";
import ArtistGenres from "./ArtistGenres";
interface ArtistProps {
  artist: Artist;
  handleClick: () => void;
}
export default function Artist({ artist, handleClick }: ArtistProps) {
  return (
    <div className='card hover-shadow'>
      <img
        src={artist.imageURL}
        className='card-img-top img-thumbnail'
        alt={artist.name}
        onClick={handleClick}
      />
      <div className='card-body'>
        <h4 className='card-title text-center mb-2' onClick={handleClick}>
          {artist.name}
        </h4>
        <div onClick={handleClick} className='mb-2'>
          <small className='card-text font-weight-bold mr-2'>Genres:</small>
          <ArtistGenres genres={artist.genres} />
        </div>
        <p
          className='card-text d-flex justify-content-between align-items-center'
          onClick={handleClick}
        >
          <small className='font-weight-bold '>Popularity: </small>
          <span className='badge badge-pill badge-warning'>
            {artist.popularity}
          </span>
        </p>
      </div>
    </div>
  );
}
