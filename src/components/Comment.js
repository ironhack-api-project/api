import { useEffect, useState } from "react";
import axios from "axios";
import commentimg from "../comment.png";

//https://ironrest.herokuapp.com/

function Comment() {
  let [info, setInfo] = useState([]);
  let [comment, setComment] = useState(false);
  let [prevComment, setPrevComment] = useState(false);

  useEffect(() => {
    axios.get("https://ironrest.herokuapp.com/leave").then((res) => {
      setInfo(res.data.reverse());
    });
  }, []);

  const saveComment = (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let comment = e.target[1].value;

    if (name === "" || comment === "") {
      alert("name and comment fields cannot be empties");
      return null;
    }
    axios
      .post("https://ironrest.herokuapp.com/leave", {
        comment: `${comment}`,
        name: `${name}`,
        date: Date().substr(0, 21),
      })
      .then((res) => {
        setInfo([...res.data.ops, ...info]);
      });
    e.target[0].value = "";
    e.target[1].value = "";
  };

  return (
    <div className="commentscontainer">
      <h1>Comments </h1>
      <br></br>
      <center>
        <img src={commentimg} />
      </center>
      <br></br>
      <button onClick={() => setComment(!comment)}>Leave us a comment!</button>
      <br></br>
      <br></br>
      {comment ? (
        <form onSubmit={saveComment}>
          <div>
            <input type="text" placeholder="Your name" />
          </div>
          <br></br>
          <div>
            <textarea placeholder="Comment" />
          </div>
          <div>
            <button type="submit">Send</button> &nbsp;
            <button type="reset">Reset</button>
          </div>
        </form>
      ) : null}
      <br />
      <br />
      {!prevComment ? (
        <button onClick={() => setPrevComment(!prevComment)}>
          See previous comments
        </button>
      ) : (
        <button onClick={() => setPrevComment(!prevComment)}>
          Hide previous comments
        </button>
      )}
      {prevComment
        ? info?.map((dat) => {
            return (
              <div>
                <div className="comments">
                  <h4>
                    👤 {dat?.name} <span className="commentsdate">{dat?.date}</span>
                  </h4>
                  <p>{dat?.comment}</p>
                  <br></br>
                  <hr></hr>
                  <br></br>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Comment;
