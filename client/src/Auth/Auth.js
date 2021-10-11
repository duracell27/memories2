import React, { useState } from "react";
import useStyles from "./styles";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from './icon'
import {useDispatch} from 'react-redux'
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Input from "./Input";
import { useHistory } from "react-router";

export default function Auth() {
  const classes = useStyles();
 const dispatch = useDispatch()
 const history = useHistory()
  const [isSignup, setIsSignup] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId

    try {
        dispatch({type: 'AUTH', data: {result, token}})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
  }

  const googleFailure = () => {
      console.log('Спроба вхоу була невдала. Спробуйте ще раз')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Зареєструватися" : "Увійти"}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="Імя"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Прізвище"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Пароль"
              handleChange={handleChange}
              type="password"
            />
            {isSignup ? (
              <Input
                name="confirmPassword"
                label="Підтвердження пароля"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            ) : null}
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Зареєструватися" : "Увійти"}
          </Button>
          <GoogleLogin
            clientId="454038135077-ufneqpogkj2996g6d9ujbjurq4ac75g1.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                startIcon={<Icon />}
              >Увіти через Google</Button>
            )}
                onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={switchMode}
              >
                {isSignup
                  ? "Маєте акаунт? Увійдіть"
                  : "Не маєте акаунта? Зареєструйтеся"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
