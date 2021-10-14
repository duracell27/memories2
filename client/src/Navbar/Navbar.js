import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "./../images/memories.png";
import useStyles from "./styles"
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router";
import decode from 'jwt-decode'

export default function Navbar() {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedtoken = decode(token)

            if (decodedtoken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (<div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' color='secondary' className={classes.logout} onClick={logout}>вийти</Button>
                </div>) : (<Button component={Link} to='/auth' variant='contained' color='primary'>Увійти</Button>)}
            </Toolbar>
        </AppBar>
    )
}
