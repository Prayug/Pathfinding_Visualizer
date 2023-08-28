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
            <div className="algorithmDescription">
              <a>How does it work?</a>
              <br />
              <br />
              Dijkstra's starts with the start node, updates distances to all
              neighbors, and repeats until the end node is reached or all nodes
              are visited. This results in the shortest possible path between
              the start and end nodes.
            </div>
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
            <div className="algorithmDescription">
              <a>How does it work?</a>
              <br />
              <br />
              A* search, finds the shortest path between start and finish nodes
              on a grid. It uses different costs (fCost, gCost, hCost) for each
              node and iterates, updates costs, and tracks all visited nodes. It
              finishes when the finish node is reached or when all nodes are
              visited. This will guarantee the shortest path between the start
              and finish nodes.
            </div>
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
            <div className="algorithmDescription">
              <a>How does it work?</a>
              <br />
              <br />
              Breadth-First Search (BFS) finds the shortest path between start
              and finish nodes on a grid. It uses a queue to explore nodes in
              levels, marking visited nodes and their distances. The search ends
              when the finish node is found or the queue is empty.
            </div>
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
            <div className="algorithmDescription">
              <a>How does it work?</a>
              <br />
              <br />
              Bi-directional search algorithm finds the shortest path between a
              start and finish node on a grid. It starts from each node,
              explores towards each other, and marks all visited nodes. If they
              intersect, an intersection point is found, and a path will be
              traced.
            </div>
            <button className="close-modal" onClick={toggleModalBD}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
