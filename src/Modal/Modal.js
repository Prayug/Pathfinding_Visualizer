import React, { useState } from "react";
import "./Modal.css";
import dijkstraVideo from "../helpVideos/dijkstra.mp4";
import aStarVideo from "../helpVideos/astar.mp4";
import BFSVideo from "../helpVideos/bfs.mp4";
import biDirectionalVideo from "../helpVideos/biDirectional.mp4";

export default function Modal() {
  const [modalDijkstra, setModalDijkstra] = useState(false);
  const [modalAStar, setModalAStar] = useState(false);
  const [modalBFS, setModalBFS] = useState(false);
  const [modalBD, setModalBD] = useState(false);

  const toggleModalDijkstra = () => {
    setModalDijkstra(!modalDijkstra);
  };

  const toggleModalAStar = () => {
    setModalAStar(!modalAStar);
  };

  const toggleModalBFS = () => {
    setModalBFS(!modalBFS);
  };

  const toggleModalBD = () => {
    setModalBD(!modalBD);
  };

  return (
    <>
      <button
        id="helpDijkstra"
        className="helpButton"
        onClick={toggleModalDijkstra}
      >
        ?
      </button>
      <button id="helpAStar" className="helpButton" onClick={toggleModalAStar}>
        ?
      </button>
      <button id="helpBFS" className="helpButton" onClick={toggleModalBFS}>
        ?
      </button>
      <button id="helpBD" className="helpButton" onClick={toggleModalBD}>
        ?
      </button>

      {modalDijkstra && (
        <div className="modal">
          <div onClick={toggleModalDijkstra} className="overlay"></div>
          <div className="modal-content">
            <div className="modalHeader"> Dijkstra </div>
            <div className="video-container">
              <video id="dijkstraVideo" src={dijkstraVideo} loop autoPlay />
            </div>
            <p>Content for Dijkstra modal</p>

            <button className="close-modal" onClick={toggleModalDijkstra}>
              &times;
            </button>
          </div>
        </div>
      )}

      {modalAStar && (
        <div className="modal">
          <div onClick={toggleModalAStar} className="overlay"></div>
          <div className="modal-content">
            <div className="modalHeader"> A* </div>
            <div className="video-container">
              <video id="aStarVideo" src={aStarVideo} loop autoPlay />
            </div>
            <p>Content for A* modal</p>
            <button className="close-modal" onClick={toggleModalAStar}>
              X
            </button>
          </div>
        </div>
      )}

      {modalBFS && (
        <div className="modal">
          <div onClick={toggleModalBFS} className="overlay"></div>
          <div className="modal-content">
            <div className="modalHeader"> Breadth First Search </div>
            <div className="video-container">
              <video id="BFSVideo" src={BFSVideo} loop autoPlay />
            </div>
            <p>Content for BFS modal</p>

            <button className="close-modal" onClick={toggleModalBFS}>
              X
            </button>
          </div>
        </div>
      )}

      {modalBD && (
        <div className="modal">
          <div onClick={toggleModalBD} className="overlay"></div>
          <div className="modal-content">
            <div className="modalHeader"> Bi-Direcional Modal </div>
            <div className="video-container">
              <video
                id="biDirectionalVideo"
                src={biDirectionalVideo}
                loop
                autoPlay
              />
            </div>
            <p>Content for BD modal</p>
            <button className="close-modal" onClick={toggleModalBD}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
