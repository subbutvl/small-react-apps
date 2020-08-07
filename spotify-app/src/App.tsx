import React, { Component, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ArtistSearch from "./components/ArtistSearch";
import ArtistList from "./components/ArtistList";
import TracksList from "./components/TrackList";
import styled from "styled-components";
import { getArtists, getTracks } from "./spotifyService";
import debounce from "lodash.debounce";

const unknownImagePlaceHolder =
  "https://via.placeholder.com/360x360.png?text=Unknown";
const artistObjectMapper = (artists: any) =>
  artists && artists.items && artists.items.length
    ? artists.items.map((item: any) => ({
        genres: item.genres.length ? item.genres : ["unknown"],
        id: item.id,
        imageURL: item.images.length
          ? item.images[0].url
          : unknownImagePlaceHolder,
        name: item.name,
        popularity: item.popularity,
      }))
    : [];

const trackObjectMapper = (tracks: any) =>
  tracks && tracks.length
    ? tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        type: track.type,
        releaseDate: track.album.release_date,
        imageURL: track.album.images.length
          ? track.album.images[0].url
          : unknownImagePlaceHolder,
        previewURL: track.preview_url,
      }))
    : [];

interface AppState {
  artist: string;
  artistsList: Artist[];
  tracksList: Track[];
}

const Section = styled.section`
  margin-top: 1rem;
`;

const SectionHeader = ({ title }: { title: string }) => (
  <header className='text-center pt-3'>
    <h4 className='d-inline-block border-bottom pb-1'>{title}</h4>
  </header>
);
class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      artist: "",
      artistsList: [],
      tracksList: [],
    };
  }

  displayArtists = debounce(async (artistQuery: string) => {
    const { artists } = await getArtists(artistQuery);

    this.setState({
      artistsList: artistObjectMapper(artists),
    });
  }, 300);

  handleUpdateArtist = (value: string) => {
    this.setState({
      artist: value,
    });
    this.displayArtists(value);
    value.length === 0 && this.setState({ tracksList: [] });
  };

  displayTracks = async (artistID: string) => {
    const tracks = (await getTracks(artistID)).tracks;

    this.setState({ tracksList: trackObjectMapper(tracks) });
  };

  render() {
    const { artistsList, tracksList } = this.state;

    return (
      <div className='container'>
        <header className='mt-5 mb-4 App-header'>
          <h1 className='text-center font-weight-bold'>Spotifier</h1>
        </header>
        <main>
          <Section className='mb-4'>
            <div className='d-flex justify-content-center mb-3'>
              <ArtistSearch
                artist={this.state.artist}
                onInputChange={this.handleUpdateArtist}
              />
            </div>
          </Section>
          {artistsList.length ? (
            <Section className='border shadow'>
              <SectionHeader title='Artists' />
              <ArtistList
                artistsList={artistsList}
                displayTracksList={this.displayTracks}
              />
            </Section>
          ) : null}
          {tracksList.length ? (
            <Section className='border shadow mt-5'>
              <SectionHeader title='Tracks' />
              <TracksList tracksList={tracksList} />
            </Section>
          ) : null}
        </main>
      </div>
    );
  }
}

export default App;
