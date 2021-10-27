import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "./../actions/posts";

export default function CommentsSection({ post }) {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComment('')
    setComments(newComments)
    commentsRef.current.scrollIntoView({bahavior: 'smooth'})
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Коментарі
          </Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}</strong>{comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Написати коментар
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Комент"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "40px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
