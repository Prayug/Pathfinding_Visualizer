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
            <div className="modalHeader"> Dijkstra's Algorithm </div>
            <video
              className="algorithmVideo"
              src={dijkstraVideo}
              loop
              autoPlay
            />
            <div className="algorithmDescription"></div>
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
            <div className="modalHeader"> A* Algorithm</div>
            <video className="algorithmVideo" src={aStarVideo} loop autoPlay />
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
            <div className="modalHeader"> Breadth First Search Algorithm</div>
            <video className="algorithmVideo" src={BFSVideo} loop autoPlay />
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
            <div className="modalHeader">
              {" "}
              Bi-Direcional Breadth First Algorithm{" "}
            </div>
            <video
              className="algorithmVideo"
              src={biDirectionalVideo}
              loop
              autoPlay
            />
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
