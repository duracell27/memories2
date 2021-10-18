import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'

import useStyles from "./styles"


export default function Posts({setCurrentId}) {
    const classes = useStyles()

    const {posts} = useSelector((state) => state.posts)

    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item={true} xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        ))
}
