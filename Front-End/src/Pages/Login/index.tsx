import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputField from '../../Components/InputField';
import { useForm } from 'react-hook-form';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { messagesObject } from '../../Utils/Messages';
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from 'react';
import { getApiCall } from '../../Api/service';
import { getUsers, reCaptchSiteKey } from '../../AppConfig';
import { ILoggedInUserDetails, userLoggedIn } from '../../Redux/Actions/AuthActions';
import Loader from '../../Components/loader/loader';
import { setTitle } from '../../Utils/Helper';
import { AxiosError } from 'axios';
import './login.css';

interface ILoginData {
  email: string;
  password: string;
}

export default function Login() {
  setTitle("SignIn");
  const isUserLoggedIn = localStorage.getItem("userLoggedIn");
  const { register, handleSubmit, formState: { errors, } } = useForm<ILoginData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [catptchaToken, setCaptchaToken] = useState<string | null>("");
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    if (isUserLoggedIn === "true") {
      navigate('/dashboard');
    }
    isLoading(false);
  }, [])


  /**
   * This function execute after successful login.
   * @purpose Set user details in app stoarge ( Redux ) and redirect to dashboard.
   */
  const successLoginFn = (loggedInUserData: ILoggedInUserDetails) => {
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
    addToast(messagesObject.loginSuccess, { appearance: "success" });
    isLoading(false);
  }

  /**
   * failureLoginFn execute inside catch block.
   * If login is not successfull then show error mssage.
   */
  const failureLoginFn = (error: AxiosError) => {
    isLoading(false);
    let errorMsg = messagesObject.emailOrPwdIncorrect;
    if (error.code === "ERR_NETWORK") {
      errorMsg = `${error.message}. ${messagesObject.contactAdmin}`;
    }
    addToast(errorMsg, { appearance: "error" });
  }


  /**
   * This function is used for submit login form data and calling login api.
   */
  const submitLoginFormHandler = (data: any, e: any) => {
    e.preventDefault();
    if (catptchaToken) {
      isLoading(true);
      const queryString = `email=${data.email}&password=${data.password}`;
      getApiCall(`${getUsers}?${queryString}`).then((res) => {
        if (res.data) {
          successLoginFn(res.data[0]);
        }
      }).catch((err: AxiosError) => { failureLoginFn(err) })
    } else {
      addToast(messagesObject.captchaRequired, { appearance: "error" });
    }

  };

  return (
    <Container component="main" maxWidth="xs" className='login-container'>
      <Box
        sx={{
          marginTop: 1,
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
        <Box component="form" onSubmit={handleSubmit(submitLoginFormHandler)} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className='captcha-container'>
                <ReCAPTCHA
                  sitekey={reCaptchSiteKey}
                  onChange={setCaptchaToken}
                  onExpired={() => {
                    setCaptchaToken(null);
                  }}
                />
              </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
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