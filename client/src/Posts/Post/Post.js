import React from 'react'
import useStyles from "./styles"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/uk'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../actions/posts'
import { useHistory } from 'react-router'


export default function Post({ post, setCurrentId }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
    moment.locale('uk')

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize='small' /> &nbsp;{post.likes.length > 2 ? `Ви і ${post.likes.length - 1} інших` : `${post.likes.length} лайк${post.likes.length % 10 > 1 && post.likes.length % 10 < 5 ? 'и' : post.likes.length === 1 ? '' : 'ів'}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize='small' /> &nbsp;{post.likes.length} {`лайк${post.likes.length % 10 > 1 && post.likes.length % 10 < 5 ? 'и' : post.likes.length === 1 ? '' : 'ів'}`}</>
                )
        }
        return <><ThumbUpAltOutlined fontSize='small' /> &nbsp; Лайк </>
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}> 
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (<Button style={{ color: 'white' }} size='small' onClick={() => { setCurrentId(post._id) }}>
                    <MoreHorizIcon fontSize='medium' />
                </Button>)}
                
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <Typography className={classes.title} variant='h6' gutterBottom>{post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (<Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' />
                    Видалити
                </Button>)}

            </CardActions>
            
        </Card>
    )
}
