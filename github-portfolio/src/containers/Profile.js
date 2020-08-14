import React, { Component } from "react";
import Link from "../components/Link/Link";
import List from "../components/List/List";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;

const Avatar = styled.img`
  width: 150px;
`;

class Profile extends Component {
  constructor() {
    super();

    this.state = { data: {}, loading: true, repositories: [] };
  }

  async componentDidMount() {
    const profile = await fetch("https://api.github.com/users/vdloc");
    const profileJSON = await profile.json();

    if (profileJSON) {
      const repositories = await fetch(profileJSON.repos_url);
      const repositoriesJSON = await repositories.json();

      this.setState({
        data: profileJSON,
        loading: false,
        repositories: repositoriesJSON,
      });
    }
  }

  render() {
    const { data, loading, repositories } = this.state;
    const items = [
      {
        label: "html_url",
        value: <Link url={data.html_url} title='GitHub URL' />,
      },
      { label: "repos_url", value: data.repos_url },
      { label: "name", value: data.name },
      { label: "company", value: data.company },
      { label: "location", value: data.location },
      { label: "email", value: data.email },
      { label: "bio", value: data.bio },
    ];

    const projects = repositories.map((repository) => ({
      label: repository.name,
      value: <Link url={repository.html_url} title='Github URL' />,
    }));

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ProfileWrapper>
        <Avatar src={data.avatar_url} alt='avatar' />
        <List items={items} title='Profile' />
        <List items={projects} title='Projects' />
      </ProfileWrapper>
    );
  }
}

export default Profile;
