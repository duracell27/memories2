import React, { useState } from 'react'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Input from './Input'

export default function Auth() {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(true)
    //const isSignup = true
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Зареєструватися' : 'Увійти'}</Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label="Імя" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Прізвище" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label="Email" handleChange={handleChange} type='email' />
                        <Input name='password' label="Пароль" handleChange={handleChange} type='password' />
                        {isSignup ? (<Input name='confirmPassword' label="Підтвердження пароля" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />) : null}

                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? 'Зареєструватися' : 'Увійти'}</Button>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button  variant='contained' color='secondary' onClick={switchMode}>
                                {isSignup ? 'Маєте акаунт? Увійдіть' : 'Не маєте акаунта? Зареєструйтеся'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
