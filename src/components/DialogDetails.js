import React from "react";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";

export const DialogDetails = (props) => {
  return (
    <Dialog
      open={props.open}
      maxWidth={"md"}
      onClose={props.close}
      aria-labelledby="responsive-dialog-title"
      sx={{
        color: "#f897f5",
        "& .MuiPaper-root": {
          background: "rgb(18, 18, 18)",
          color: "#ffffff",
          padding: "10px 20px",
          minWidth: "200px",
        },
      }}
    >
      <WrapContent>
        <h3>{props.track.track.name}</h3>
        <h5>{props.track.track.artists.map((artist) => artist.name + "  ")}</h5>
        <h6> </h6>
        <div className="infos">
          <img
            className="logo"
            src={props.track.track.album.images[1].url}
            alt="cover-album"
          />
          <p>
            <span>Album name : {props.track.track.album.name}</span>
            <span>
              Release date :
              {new Date(
                props.track.track.album.release_date
              ).toLocaleDateString("en-GB")}
            </span>
            <span>
              Number of tracks : {props.track.track.album.total_tracks}
            </span>
          </p>
        </div>
        <ButtonWrapper>
          <a
            href={props.track.track.external_urls.spotify}
            target="_blank"
            className="toSpotify"
            rel="noreferrer"
          >
            Open on Spotify
          </a>
        </ButtonWrapper>
        {props.track.track.preview_url ? (
          <audio className="audioControls" controls="controls">
            <source src={props.track.track.preview_url} type="audio/mpeg" />
          </audio>
        ) : (
          <span className="noPlayer">No Player Found</span>
        )}
      </WrapContent>
    </Dialog>
  );
};
const WrapContent = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  h3 {
    margin: 8px 0px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  h6,
  h5 {
    margin-top: 5px;
    margin-bottom: 0px;
  }

  .infos {
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    .logo {
      height: 180px;
      width: 180px;
      margin-right: 40px;
      @media (max-width: 768px) {
        height: 200 px;
        width: 200 px;
        margin-right: 40px;
      }
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 16px;
      @media (max-width: 480px) {
        span {
          margin: 5px 0px;
        }
      }
    }
  }
  .audioControls {
    margin-top: 1rem;
    width: 100%;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .noPlayer {
    text-align: center;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  .toSpotify {
    margin-top: 1rem;
    min-width: 110px;
    border: 1px solid #20d06a;
    border-radius: 100px;
    color: #20d06a;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    padding: 8px 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    background-color: transparent;
    &:hover {
      background-color: #20d06a;
      color: white;
    }
  }
`;
