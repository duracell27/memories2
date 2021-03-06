import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import useStyles from "./styles";
import moment from "moment";
import "moment/locale/uk";
import { getPost, getPostsBySearch } from "./../actions/posts";
import CommentsSection from "./CommentsSection";

export default function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  moment.locale("uk");

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }));
  }, [post]);
  
  let recommendedPosts;
  if (post && posts) recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);
  
  const openPost = (_id) => {
    history.push(`/posts/${_id}`);
  };

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  return (
    <Paper style={{ padding: "20px", borderradius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Автор: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Чат в розробці!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentsSection post={post}/>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length > 0 ? (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            Тобі теж сподобається:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => {
                    openPost(_id);
                  }}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Лайки: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      ) : null}
    </Paper>
  );
}
