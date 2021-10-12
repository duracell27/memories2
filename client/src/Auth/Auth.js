import React, { useState } from "react";
import useStyles from "./styles";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./icon";
import { useDispatch } from "react-redux";
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
import {signup, signin} from './../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''

}

export default function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState(initialState)

  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
      dispatch(signup(formData, history))
    }else{
      dispatch(signin(formData, history))
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Спроба вхоу була невдала. Спробуйте ще раз");
  };
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
              type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
            />
            {isSignup ? (
              <Input
                name="confirmPassword"
                label="Підтвердження пароля"
                handleChange={handleChange}
                type='password'
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
              >
                Увіти через Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
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
