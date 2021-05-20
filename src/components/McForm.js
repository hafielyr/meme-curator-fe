import React, {useState} from "react";
import { Paper, Grid, TextField,withStyles, Button } from "@material-ui/core";
import { connect } from "react-redux";
import useForm from "./useForm";
import { ACTION_TYPES } from "../actions/mc";
import * as actions from "../actions/mc"
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
    //example of overriding specific class in material-ui, after this put the below css class to the correspondece tag 

    root :{
       '& .MuiTextField-root':{
           margin: theme.spacing(1),
           minWidth: 230,
       }       
    }
})

const initialFieldValues ={
     title: '',
     status: ''
}

const McForm = ({classes, ...props}) => {
    
    //toast msg
    const {addToast} = useToasts()

    //reuse common logic inside useForm
    const {
    values,
    setValues,
    handleInputChange 
    } = useForm(initialFieldValues)

    const handleSubmit = e =>{
        const onSuccess = () => {
            addToast("Meme has been submitted", {appearance:'success'})
        }
        e.preventDefault()
        values.status='WW';
        props.createMeme(values, onSuccess())
    }

    return ( 
    
        <form autoComplete="off" noValidate className = {classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    
                    <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    value={values.title}
                    onChange={handleInputChange}
                    />
                    
                  <div>
                     <Button
                      variant="contained"
                      color="primary"
                       type="submit">
                        Submit
                    </Button>
                   </div>
                </Grid>
            </Grid>
        </form>
    
        );
}

const mapStateToProps = state=>({
    mcList: state.mc.list
 })
 
 const mapActionToProps ={
     createMeme: actions.create
 }
 // connect is a function, it returns another function as a parameter to that return function we have passed this component here
 export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(McForm));
