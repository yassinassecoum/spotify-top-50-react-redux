import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setTracks } from "../redux/spotify";

import { DialogDetails } from "./DialogDetails";
import Pagination from "@mui/material/Pagination";

export const Table = () => {
  const [displayedTracks, setDisplayedTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const totalTracks = useSelector((state) => state.spotify.tracks);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const tokenResponse = await axios(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              process.env.REACT_APP_CLIENT_ID +
                ":" +
                process.env.REACT_APP_SECRET
            ),
        },
        data: "grant_type=client_credentials",
      }
    );
    dispatch(setToken(tokenResponse.data.access_token));
    const dataResponse = await axios(
      `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=50&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + tokenResponse.data.access_token,
        },
      }
    ).catch((error) => console.log(error));
    dispatch(setTracks(dataResponse.data.items));
    setDisplayedTracks(dataResponse.data.items.slice(0, 10));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickTrack = (track) => {
    setCurrentTrack(track);
    handleClickOpen();
  };

  const handlePagination = (event, value) => {
    let offset = (value - 1) * 10;
    setOffset(offset);
    setPage(value);
    setDisplayedTracks(totalTracks.slice(offset, offset + 10));
  };

  return (
    <Container>
      {displayedTracks.map((track, key) => (
        <Box key={key} onClick={() => onClickTrack(track)}>
          <div className="wrapRankImg">
            <span className="ranking">
              {key === 9 ? page + "0" : page - 1 + "" + (key + 1)}
            </span>
            <img
              className="logo"
              src={track.track.album.images[1].url}
              alt="cover-album"
            />
          </div>

          <div className="infos">
            <span className="title"> {track.track.name} </span>
            <span className="artist"> {track.track.artists[0].name}</span>
            <span className="date">
              {new Date(track.track.album.release_date).toLocaleDateString(
                "en-GB"
              )}
            </span>
          </div>
          <a
            href={track.track.external_urls.spotify}
            target="_blank"
            className="toSpotify"
            rel="noreferrer"
          >
            Open on Spotify
          </a>
        </Box>
      ))}
      {open ? (
        <DialogDetails close={handleClose} open={open} track={currentTrack} />
      ) : (
        ""
      )}

      <Pagination
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem 0rem",
          "& .MuiPaginationItem-root": {
            color: "#fff",
            backgroundColor: "#181818",
          },
        }}
        page={page}
        count={5}
        shape="rounded"
        variant="outlined"
        onChange={handlePagination}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .pagination ul li {
    color: white;
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #181818;
  cursor: pointer;
  margin: 16px 0 0;
  padding: 24px 44px 24px 32px;
  min-height: 95px;
  @media (max-width: 768px) {
    padding: 14px;
  }
  .wrapRankImg {
    display: flex;
    align-items: center;
    @media (max-width: 468px) {
      align-items: left;
    }
  }

  .logo {
    height: 98px;
    width: 98px;
    margin-right: 40px;
    @media (max-width: 768px) {
      height: 68px;
      width: 68px;
      margin-right: 15px;
    }
    @media (max-width: 468px) {
      height: 88px;
      width: 88px;
      margin-right: 0px;
    }
  }
  .ranking {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 16px;
  }
  .infos {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    .title {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: -0.04em;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
    .artist {
      color: #9f9f9f;
      display: block;
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px 0 0;
      @media (max-width: 768px) {
        font-size: 13px;
      }
    }
    .date {
      color: #9f9f9f;
      display: block;
      font-size: 14px;
      line-height: 24px;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
  .toSpotify {
    min-width: 110px;
    border: 1px solid #20d06a;
    border-radius: 100px;
    color: #20d06a;
    font-size: 11px;
    font-weight: 700;
    padding: 8px 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, color 0.3s;
    background-color: transparent;
    &:hover {
      background-color: #20d06a;
      color: white;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  .DIATEST {
    width: 800px;
    background-color: red;
  }
`;
