import React, { Component } from "react";
import Card from "../components/Card";

class List extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const movies = await (await fetch("../../assets/data.json")).json();
    const moviesJSON = movies;

    if (moviesJSON) {
      this.setState({
        data: moviesJSON,
        loading: false,
      });
    }
  }
  render() {
    const { data, loading } = this.state;

    if (loading) {
      return <div>...Loading</div>;
    }

    return (
      <div className='row'>
        {data.map((movie) => (
          <div className='col-sm-2' key={movie.id}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
    );
  }
}

export default List;
