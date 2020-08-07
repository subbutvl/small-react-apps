/// <reference types="react-scripts" />

interface Artist {
  genres: string[];
  id: string;
  imageURL: string;
  name: string;
  popularity: number;
}

interface Track {
  id: string;
  name: string;
  type: string;
  releaseDate: string;
  imageURL: string;
  previewURL: string;
}
