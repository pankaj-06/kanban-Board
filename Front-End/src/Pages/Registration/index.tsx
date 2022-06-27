import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { messagesObject } from '../../Utils/Messages';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../Components/InputField';
import './registration.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../Redux/Store';
import { IconButton, TextField } from '@mui/material';
import profilePlaceHolder from '../../Assets/Images/Profile_placeholder.png';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { getApiCall, postApiCall } from '../../Api/service';
import { createUser, findUser } from '../../AppConfig';
import Loader from '../../Components/loader/loader';
import { setTitle } from '../../Utils/Helper';

export type fileAcceptType = "image/*" | ".png" | ".jpeg" | ".jpg";
export interface IUserDetails {
    id?: string;
    name: string;
    email: string;
    userName: string;
    password: string;
    tel?: string;
    profileImg?: string;
}

export default function Register() {
    setTitle("Signup");
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");
    const { register, handleSubmit, formState: { errors, }, reset } = useForm<IUserDetails>()
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [fileObj, setFileObj] = useState<any>(undefined);
    const [profileUrl, setProfileUrl] = useState("");
    const [loding, isLoading] = useState(true);

    useEffect(() => {
        if (isUserLoggedIn === "true") {
            navigate('/dashboard');
        }
        isLoading(false);
    }, []);


    const submitForm = (data: any, e: any) => {
        e.preventDefault();
        isLoading(true);
        getApiCall(`${findUser}${data.email}`).then((res) => {
            if (res.data.length > 0) {
                addToast(messagesObject.userExist, {
                    appearance: "error"
                });
                isLoading(false);
            } else {
                const payload = { ...data, id: uuidv4(), profileImg: profileUrl || "" }
                postApiCall(createUser, payload).then((res) => {
                    if (res.statusText === 'Created') {
                        navigate('/signIn');
                        addToast(messagesObject.registrationSuccess, {
                            appearance: "success"
                        });
                        isLoading(false);
                    }
                }).catch(() => {
                    addToast(messagesObject.contactAdmin, { appearance: "error" });
                    isLoading(true);
                })
            }
        }).catch(() => {
            addToast(messagesObject.contactAdmin, { appearance: "error" });
            isLoading(true);
        });
    }

    const handleOnChange = (e: any) => {
        const fileObj = e.target.files[0];
        setProfileUrl(URL.createObjectURL(fileObj))
        setFileObj(fileObj);
    }

    const getFileType = (acceptFileType: fileAcceptType) => {
        if (
            acceptFileType === 'image/*' ||
            acceptFileType === '.jpeg' ||
            acceptFileType === '.jpg' ||
            acceptFileType === '.png'
        ) {
            return 'image';
        }
    };

    //this useeffect used for validate file.
    useEffect(() => {
        if (fileObj) {
            if (fileObj.type.split('/')[0] !== getFileType("image/*")) {
                addToast(messagesObject.validFile, { appearance: "warning" });
                setFileObj(undefined);
                setProfileUrl("");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileObj]);

    return (
        <Container component="main" maxWidth="md" className='registration-form-conatiner'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ mt: 3, mb: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} sm={12}>
                            <div style={{ display: "flex", }}>
                                <div className='prof-pic'>
                                    <div className='rel-con'>
                                        <div className='avatar'>
                                            <img src={profileUrl || profilePlaceHolder} />
                                        </div>
                                        <div className='file-select'>
                                            <label htmlFor="icon-button-file">
                                                <TextField
                                                    id="icon-button-file"
                                                    style={{ display: "none" }}
                                                    type={"file"}
                                                    onChange={handleOnChange}
                                                    inputProps={{ accept: "image/*" }}
                                                    variant="standard"
                                                />

                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <PhotoCamera />
                                                </IconButton>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='name-input-box'>
                                    <InputField
                                        type='text'
                                        label='Name'
                                        attrName='name'
                                        register={register}
                                        error={errors.name ? true : false}
                                        errorMessage={errors.name && errors.name.message}
                                        required
                                    />
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} sm={6}>
                            <InputField
                                type='text'
                                label='Username'
                                attrName='userName'
                                register={register}
                                error={errors.userName ? true : false}
                                errorMessage={errors.userName && errors.userName.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6}>
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
                        <Grid item xs={12} md={6} sm={6}>
                            <InputField
                                type='tel'
                                label='Contact Number'
                                attrName='tel'
                                register={register}
                                error={errors.tel ? true : false}
                                errorMessage={errors.tel && errors.tel.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} >
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
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type='submit'
                                    style={{ width: "200px" }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {loding && <Loader />}
        </Container>
    );
}
