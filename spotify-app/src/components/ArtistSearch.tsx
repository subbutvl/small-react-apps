import React, { FormEvent } from "react";

interface ArtistSearchProps {
  artist: string;
  onInputChange: (artist: string) => void;
}

export default function ArtistSearch({
  artist,
  onInputChange,
}: ArtistSearchProps) {
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    onInputChange(value);
  };
  return (
    <div className='form-group'>
      <input
        type='text'
        name='artistName'
        id='artistName'
        className='form-control'
        value={artist}
        placeholder='your favorite artist...'
        onChange={handleChange}
      />
    </div>
  );
}
