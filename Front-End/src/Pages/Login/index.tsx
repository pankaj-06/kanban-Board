import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputField from '../../Components/InputField';
import { useForm } from 'react-hook-form';
import './login.css';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { messagesObject } from '../../Utils/Messages';
import ReCAPTCHA from "react-google-recaptcha";
import { createRef, useEffect, useState } from 'react';
import { getApiCall } from '../../Api/service';
import { getUsers } from '../../AppConfig';
import { ILoggedInUserDetails, userLoggedIn } from '../../Redux/Actions/AuthActions';
import Loader from '../../Components/loader/loader';
import { setTitle } from '../../Utils/Helper';


interface ILoginData {
  email: string;
  password: string;
}

export default function Login() {
  setTitle("Signin");
  const [loading, isLoading] = useState(true);
  const isUserLoggedIn = localStorage.getItem("userLoggedIn");
  const { register, handleSubmit, formState: { errors, } } = useForm<ILoginData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const recaptchaRef = createRef<any>();


  useEffect(() => {
    if (isUserLoggedIn === "true") {
      navigate('/dashboard');
    }
    isLoading(false);
  }, [])

  const submit = (data: any, e: any) => {
    e.preventDefault();
    isLoading(true);
    const queryString = `email=${data.email}&password=${data.password}`;
    getApiCall(`${getUsers}?${queryString}`).then((res) => {
      if (res.data) {
        isLoading(false);
        const loggedInUserData = res.data[0];
        const payload: ILoggedInUserDetails = {
          name: loggedInUserData.name,
          email: loggedInUserData.email,
          profileImg: loggedInUserData.profileImg,
          tel: loggedInUserData.tel,
          userName: loggedInUserData.userName
        }
        localStorage.setItem("userLoggedIn", "true");
        dispatch(userLoggedIn(payload));
        navigate('/dashboard');
        addToast(messagesObject.loginSuccess, {
          appearance: "success"
        });
      }
    }).catch(() => {
      isLoading(false);
      addToast(messagesObject.emailOrPwdIncorrect, {
        appearance: "error"
      });
    })
  };

  return (
    <Container component="main" maxWidth="xs" className='login-container'>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} sm={12}>
              <InputField
                type='email'
                label='Email'
                attrName='email'
                register={register}
                error={errors.email ? true : false}
                errorMessage={errors.email && errors.email.message}
                required
              />
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <InputField
                type='password'
                label='Password'
                attrName='password'
                register={register}
                error={errors.password ? true : false}
                errorMessage={errors.password && errors.password.message}
                required
              />
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loading && <Loader />}
    </Container>
  );
}