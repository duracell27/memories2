import { Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";
import useStyles from "./styles";

export default function CommentsSection({ post }) {
  const classes = useStyles();
  const [comments, setComments] = useState([1,2,3])

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Коментарі</Typography>
            {comments.map((comment, index)=>(
                <Typography key={index} gutterBottom variant='subtitle1'>
                    {index}
                </Typography>
            ))}
        </div>
        <div style={{width: '70%'}}>
        <Typography gutterBottom variant='h6'>Написати коментар</Typography>
        </div>
      </div>
    </div>
  );
}
