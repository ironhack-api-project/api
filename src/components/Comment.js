import { useEffect, useState } from "react";
import axios from "axios";

//https://ironrest.herokuapp.com/

function Comment() {
  let [info, setInfo] = useState([]);
  let [comment, setComment] = useState(false);
  let [prevComment, setPrevComment] = useState(false);

  useEffect(() => {
    axios.get("https://ironrest.herokuapp.com/leave").then((res) => {
      setInfo(res.data);
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
      })
      .then((res) => {
        setInfo([...info, ...res.data.ops]);
      });
    e.target[0].value = "";
    e.target[1].value = "";
  };

  return (
    <div className="App">
      <h1>Comments </h1>
      <button onClick={() => setComment(!comment)}>Leave us a comment!</button>
      {comment ? (
        <form onSubmit={saveComment}>
          <div>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="input">
            <textarea rows="4" cols="50" placeholder="Comment" />
          </div>
          <div>
            <button type="submit">Send</button>
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
                  <h4>👤{dat?.name}:</h4>
                  <p>{dat?.comment}</p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Comment;
