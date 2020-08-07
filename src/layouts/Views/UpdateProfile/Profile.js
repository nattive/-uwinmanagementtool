import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Card, CardContent, Typography, Avatar, IconButton, TextField, Divider, Button, CardActionArea, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginTop: '5%',
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
    const [fullName, setFullName] = useState(props.fullName)
    const [oldPassword, setOldPassword] = useState(props.oldPassword)
    const [newPassword, setNewPassword] = useState(props.newPassword)
    const [conFirmNewPassword, setConFirmNewPassword] = useState(props.conFirmNewPassword)
    const [Location, setLocation] = useState(props.Location)
    const [email, setEmail] = useState(props.email)
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
    const [guarantorPhone, setGuarantorPhone] = useState(props.guarantorPhone)
    const [guarantorAddress, setGuarantorAddress] = useState(props.guarantorAddress)
    const classes = useStyles();
    const myWidget = window.cloudinary.createUploadWidget({
        cloudName: '',
        upload_preset: 'preset1',
    }, (error, result) => {
        if (result.event == "success") {
            console.log(result.info) // result.info contains data from upload
        }
    })

    const feild = [
        {
            name: 'fullName',
            label: 'Full Name',
            onChange: (e) => setFullName(e.target.value),
            value: fullName,
            type: 'text'
        },
        {
            name: 'oldPassword',
            label: 'Old Password',
            onChange: (e) => setOldPassword(e.target.value),
            value: oldPassword,
            type: 'password'
        },
        {
            name: 'newPassword',
            label: 'New Password',
            onChange: (e) => setNewPassword(e.target.value),
            value: newPassword,
            type: 'password'
        },
        {
            name: 'conFirmNewPassword',
            label: 'Confirm Password',
            onChange: (e) => setConFirmNewPassword(e.target.value),
            value: conFirmNewPassword,
            type: 'password'
        },
    ]
    const bioData = [

        {
            name: 'Location',
            label: 'Unit Location',
            onChange: (e) => setLocation(e.target.value),
            value: Location,
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
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='h6'>Update Profile</Typography>
                        <Grid container>
                            <Grid md={6} xs={12}>
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Avatar size='large' style={{ width: 200, height: 200, alignSelf: 'center' }} onClick={() => myWidget.open()} />
                                    </IconButton>
                                </label>
                            </Grid>
                            <Grid md={6} xs={12}>
                                {
                                    feild.map(input => (
                                        <FormControl className={classes.textField} variant="outlined">
                                            <InputLabel htmlFor={input.type === 'password' ? "outlined-adornment-password" : "outlined-basic"}>{input.label}</InputLabel>
                                            <OutlinedInput
                                                id={input.type === 'password' ? "outlined-adornment-password" : "outlined-basic"}
                                                // type={values.showPassword ? 'text' : 'password'}
                                                value={input.value}
                                                // onChange={handleChange('password')}
                                                endAdornment={
                                                    input.type === 'password' ?
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                // onClick={handleClickShowPassword}
                                                                // onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            ><Visibility />
                                                                {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
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
                                                <TextField id="outlined-basic" value={input.value} label={input.label} variant="outlined" />
                                            </FormControl>
                                        </Grid>
                                    ))
                                }
                            </Grid>


                        </Grid>
                    </CardContent>
                    <CardActionArea>
                        <Button variant='contained' color='primary' style={{ float: 'right' }}>Update Profile</Button>
                    </CardActionArea>
                </Card>
            </Grid>

        </Container>
    )
}

const mapStateToProps = (state) => ({
    manager: state.auth.manager,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
