import React, { useEffect, useRef } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import Iframe from "react-iframe-click";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const videolinkdata = [
    {
      id: 1,
      video: 'https://www.youtube.com/embed/nnilq3XGLcA'
    },
    {
      id: 2,
      video: 'https://www.youtube.com/embed/Nw8j2WJYH5U'
    },
    {
      id: 3,
      video: 'https://www.youtube.com/embed/xMUaTFsMwAc'
    },
    {
      id: 4,
      video: 'https://www.youtube.com/embed/htk-RAK5yhc'
    },
    {
      id: 5,
      video: 'https://www.youtube.com/embed/HOkkbGSxmp4'
    },
    {
      id: 6,
      video: 'https://www.youtube.com/embed/O4ej9Sr7F4M'
    },
    {
      id: 7,
      video: 'https://www.youtube.com/embed/Nw8j2WJYH5U'
    },
    {
      id: 8,
      video: 'https://www.youtube.com/embed/nW8yKp4Dw4w'
    },
    {
      id: 9,
      video: 'https://www.youtube.com/embed/xMUaTFsMwAc'
    },
    {
      id: 10,
      video: 'https://www.youtube.com/embed/xMUaTFsMwAc'
    },
    {
      id: 11,
      video: 'https://www.youtube.com/embed/vlDzYIIOYmM}'
    }
  ]

  const [videoData, setVideoData] = useState(videolinkdata[0])

  const [count, setCount] = useState(0);
  const [view, setView] = useState(0);
  const [rednum, setRednum] = useState();
  const [coin, setCoin] = useState(250);
  const [play, setPlay] = useState(false);
  const video = useRef(null)

  useEffect(() => {
    setRednum(Math.floor(Math.random() * 25) + 1)
  }, [])

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };


  const handleChangeVideo = (id) => {
    if (id <= videolinkdata.length) {
      const data = videolinkdata.find(item => item.id === (videoData.id + 1))
      setVideoData(data)
    } else {
      const data = videolinkdata.find(item => item.id === 1)
      setVideoData(data)
    }

  }

  // const playVideo = () => {
  //   const ytplayer = document.getElementById("ytplayer");
  //   ytplayer.addEventListener("blur", () => {
  //     console.log('data', ytplayer['#player']);
  //     setPlay(true)
  //   });
  // }

  // useEffect(() => {
  //   playVideo()
  // }, [])


  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        if (count === 50) {
          setCount(0);
          setView(view + 1)
          setCoin(view === 0 ? coin + 100 : coin + rednum)
          setPlay(false)
          setRednum(Math.floor(Math.random() * 25) + 1)
          handleChangeVideo(videoData.id)
        } else {
          setCount(count + 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count, play]);

  const handleStart = () => {
    setPlay(true)
  }

  console.log(play);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {
        <div className="ratio ratio-16x9">
          <div className="d-flex">
            <div class="card w-50" style={{'background-color':'aliceblue'}}>
              <div class="card-body text-center">
                <h5 class="card-title font-weight-bold h1">{view}</h5>
                <p class="card-text h4">view</p>
              </div>
            </div>
            <div class="card w-50" style={{'background-color':'aliceblue'}}>
              <div class="card-body text-center">
                <h5 class="card-title font-weight-bold h1">₹{coin}</h5>
                <p class="card-text h4">Balance</p>
              </div>
            </div>
          </div>
            <Iframe
              src={videoData.video}
              onInferredClick={handleStart}
              title="YouTube video"
              allowfullscreen
              width='100%'
              height='500px'
            ></Iframe>
          {/* <div onClick={() => setPlay(true)} style={{ zIndex: "22", position: "relative" }}> */}
            {/* <iframe
              id="ytplayer"
              src={videoData.video}
              title="YouTube video"
              allowfullscreen
              width='100%'
              height='500px'
              style={{ 'zIndex': "11", 'position': "relative" }}
            ></iframe> */}
          {/* </div> */}
          <div className="progress">
            <div className={`progress-bar`} style={{ width: `${count * 20}px` }} role="progressbar" aria-valuenow={count} aria-valuemin={count} aria-valuemax={count} />
          </div>
          <p class="h5 text-center mt-2 font-weight-bold">Watch {count} Sec.</p>
          <p class="h5 text-center mt-2 font-weight-bold">Please Video And Earn ₹{view === 0 ? 100 : rednum}</p>
          {/* <div className="text-center" style={{ 'marginTop': "15px" }}>
            <Button
              className="text-capitalize"
              variant={"secondary"}
              onClick={handleChangeVideo.bind(null, (videoData.id + 1))}
              style={{ 'backgroundColor': '#158cba', 'padding': '20px 70px' }}
            >
              watch next
            </Button>
          </div> */}
        </div>
      }
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={note._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyNotes;
