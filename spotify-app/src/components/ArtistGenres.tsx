import React from "react";

const getRandomColor = () =>
  `hsl(${Array(3)
    .fill(0)
    .map(
      (_, index) =>
        Math.round(Math.random() * (!index ? 255 : 50)) +
        (!index ? 0 : 50) +
        (!index ? "" : "%")
    )
    .join(",")})`;

export default function ArtistGenres({
  genres,
}: {
  [genres: string]: string[];
}) {
  return (
    <span>
      {genres.map((genre, key) => (
        <span
          className='badge badge-pill mr-2'
          key={key}
          style={{ backgroundColor: getRandomColor() }}
        >
          {genre}
        </span>
      ))}
    </span>
  );
}
