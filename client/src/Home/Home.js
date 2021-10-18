import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../actions/posts";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";
import useStyles from "./styles";
import { useLocation, useHistory } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container disableGutters={true} maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item={true} xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item={true} xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="name"
                variant="outlined"
                label="Пошук"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Пошук по тегам"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                onClick={searchPost}
                variant="contained"
                color="primary"
              >
                Пошук
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
