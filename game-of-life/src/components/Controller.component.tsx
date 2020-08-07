import React from "react";
import { Button } from "@material-ui/core";
import { PlayArrow, Pause, Replay } from "@material-ui/icons";
import styled from "styled-components";

const ControllerContainer = styled("div")`
  display: flex;
  justify-content: center;
`;

interface ControllerProps {
  handlePlay: React.MouseEventHandler<HTMLElement>;
  handlePause: React.MouseEventHandler<HTMLElement>;
  handlerReset: React.MouseEventHandler<HTMLElement>;
}

export default function Controller(props: ControllerProps) {
  const { handlePlay, handlePause, handlerReset } = props;
  
  return (
    <ControllerContainer>
      <Button
        variant='contained'
        color='primary'
        endIcon={<PlayArrow />}
        onClick={handlePlay}
      >
        Start
      </Button>
      <Button
        variant='contained'
        color='primary'
        endIcon={<Pause />}
        onClick={handlePause}
      >
        Stop
      </Button>
      <Button
        variant='contained'
        color='primary'
        endIcon={<Replay />}
        onClick={handlerReset}
      >
        Reset
      </Button>
    </ControllerContainer>
  );
}
