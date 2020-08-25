import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Card, CardContent, Typography, Avatar, IconButton, TextField, Divider, Button, CardActionArea, CardActions, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { updateProfile } from '../../../actions/usersAction'
import { verifyRedirect } from '../../../actions/authAction'
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing(2),
        margin: 'auto',
        // marginTop: '5%',
        maxWidth: 600,
    },
    input: {
        display: 'none',
    },
    textField: {
        margin: theme.spacing(1),
        width: '100%',
    },

}));
export const Profile = (props) => {



    const [name, setFullName] = useState('')
    const [password, setOldPassword] = useState()
    const [showOldPassword, setOldShowPassword] = useState(false)
    const [showNewPassword, setNewShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [newPassword, setNewPassword] = useState()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [conFirmNewPassword, setConFirmNewPassword] = useState()
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [guarantorPhone, setGuarantorPhone] = useState('')
    const [guarantorAddress, setGuarantorAddress] = useState('')
    const [thumbnail_url, setThumbnail_url] = useState('')
    const [url, setUrl] = useState('')
    const classes = useStyles();
    const myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'charisbiz-africa',
        upload_preset: 'qtwirqod',
    }, (error, result) => {
        if (result.event == "success") {
            setThumbnail_url(result.info.thumbnail_url)
            setUrl(result.info.url)
            console.log(result.info) // result.info contains data from upload
        }
    })
    const handleDialogClose = () => {
        setDialogOpen(false)
    }
    useEffect(() => {
        props.verifyRedirect()
    }, [])
    useEffect(() => {
        if (props.errorUpdatingProfile) {
            setDialogOpen(true)
        }
    }, [props.errorUpdatingProfile])

    useEffect(() => {
        props.manager.user && setFullName(props.manager.user.name)
        props.manager.user && setLocation(props.manager.user.location)
        props.manager.user && setEmail(props.manager.user.email)
        props.manager.user && setPhoneNumber(props.manager.user.phoneNumber)
        props.manager.user && setGuarantorPhone(props.manager.user.guarantorPhone)
        props.manager.user && setGuarantorAddress(props.manager.user.guarantorAddress)
        props.manager.user && setThumbnail_url(props.manager.user.thumbnail_url)
        props.manager.user && setUrl(props.manager.user.url)
    }, [props.manager])
    const handleUpdateProfile = () => {
        const data = {
            name,
            password: newPassword,
            oldPassword: password,
            location,
            email,
            phoneNumber,
            guarantorPhone,
            guarantorAddress,
            thumbnail_url,
            url,
            user_id: props.manager.user.id
        }
        props.updateProfile(data)
    }
    const feild = [
        {
            name: 'name',
            label: 'Full Name',
            onChange: (e) => setFullName(e.target.value),
            value: name,
            type: 'text'
        },
        {
            name: 'password',
            label: 'Old Password',
            onChange: (e) => setOldPassword(e.target.value),
            showPassword: () => setOldShowPassword(!showOldPassword),
            shouldShowPassword: showOldPassword,
            value: password,
            type: 'password'
        },
        {
            name: 'newPassword',
            label: 'New Password',
            onChange: (e) => setNewPassword(e.target.value),
            showPassword: () => setNewShowPassword(!showNewPassword),
            shouldShowPassword: showNewPassword,
            value: newPassword,
            type: 'password'
        },
        {
            name: 'conFirmNewPassword',
            label: 'Confirm Password',
            onChange: (e) => setConFirmNewPassword(e.target.value),
            showPassword: () => setShowConfirmPassword(!showConfirmPassword),
            shouldShowPassword: showConfirmPassword,
            value: conFirmNewPassword,
            type: 'password'
        },
    ]


    const bioData = [

        {
            name: 'location',
            label: 'Unit location',
            onChange: (e) => setLocation(e.target.value),
            value: location,
            type: 'text'
        },

        {
            name: 'email',
            label: 'Email Address',
            onChange: (e) => setEmail(e.target.value),
            value: email,
            type: 'email'
        },

        {
            name: 'phoneNumber',
            label: 'Phone Number',
            onChange: (e) => setPhoneNumber(e.target.value),
            value: phoneNumber,
            type: 'text'
        },
        {
            name: 'guarantorPhone',
            label: 'Guarantor\'s Phone number',
            onChange: (e) => setGuarantorPhone(e.target.value),
            value: guarantorPhone,
            type: 'text'
        },
        {
            name: 'guarantorAddress',
            label: 'Guarantor\'s Address',
            onChange: (e) => setGuarantorAddress(e.target.value),
            value: guarantorAddress,
            type: 'text'
        },

    ]
    return (
        <Container className={classes.root}>
            <Grid alignContent='center' alignItems='center' justify='center' direction="column-reverse">
               {props.updated && <Alert severity='success'>{props.updated}</Alert>}
                <Dialog
                    open={dialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">An Error Occurred</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Alert severity="error">Unable to update profile</Alert>
                            <Typography variant='body2'>{JSON.stringify(props.errorUpdatingProfile)}</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained'
                            onClick={handleDialogClose}
                            color='secondary'
                        // style={{ float: 'right' }}>
                        > Close
                        </Button>
                        <Button onClick={handleUpdateProfile} color="primary" autoFocus>
                            Retry
                        </Button>

                    </DialogActions>
                </Dialog>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6'>Update Profile</Typography>
                        <Grid container>
                            <Grid md={6} sm={6} xs={12}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Avatar src={url} size='large' style={{ width: 200, height: 200, alignSelf: 'center' }}
                                            onClick={() => myWidget.open()} />
                                    </IconButton>
                            </Grid>
                            <Divider />
                            <Grid md={6} sm={6} xs={12}>
                                <Typography variant='subtitle1'>Update Account settings</Typography>

                                {
                                    feild.map(input => (
                                        <FormControl className={classes.textField} variant="outlined">
                                            <InputLabel htmlFor={input.type === 'password' ? "outlined-adornment-password" : "outlined-basic"}>{input.label}</InputLabel>
                                            <OutlinedInput
                                                id={input.type === 'password' ? "outlined-adornment-password" : "outlined-basic"}
                                                type={input.shouldShowPassword ? 'text' : input.type}
                                                value={input.value}
                                                onChange={input.onChange}
                                                endAdornment={
                                                    input.type === 'password' ?
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={input.showPassword}
                                                                // onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {input.shouldShowPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                        : null}
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                    ))
                                }
                            </Grid>
                            <Grid container>
                                <Divider />
                                <Typography variant='subtitle1'>Bio Data</Typography>
                                {
                                    bioData.map(input => (
                                        <Grid xs={12}>
                                            <FormControl className={classes.textField} variant="outlined">
                                                <TextField id="outlined-basic" onChange={input.onChange} value={input.value} label={input.label} variant="outlined" />
                                            </FormControl>
                                        </Grid>
                                    ))
                                }
                            </Grid>


                        </Grid>
                    </CardContent>
                    <CardActionArea>
                        <Button variant='contained'
                            onClick={handleUpdateProfile}
                            disabled={props.isUpdatingProfile}
                            variant='contained'
                            color='primary'
                            style={{ float: 'right' }}>
                            {props.isUpdatingProfile ? <CircularProgress size={20} /> : 'Update Profile'}
                        </Button>

                    </CardActionArea>
                </Card>
            </Grid>

        </Container>
    )
}

const mapStateToProps = (state) => ({
    manager: state.auth.manager,
    isUpdatingProfile: state.managers.isUpdatingProfile,
    errorUpdatingProfile: state.managers.errorUpdatingProfile,
    updated: state.managers.updated,
})

const mapDispatchToProps = {
    updateProfile, verifyRedirect
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
