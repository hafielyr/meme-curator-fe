import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, ButtonGroup, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/mc"
import McForm from "./McForm";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
    //example of overriding specific class in material-ui, after this put the below css class to the correspondece tag 
    // e.g. className={classes.root}
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper :{
        //1 space is 8 px
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
//after putting withStyles(syles)(Mc) on connect, there is properties added on props which is props.classes
// const [classes, ...props] = props


const Mc = ({classes,...props}) => {

    //toast msg
    const {addToast} = useToasts()

    const [currentId,setCurrentId] = useState(0)
    
    var memeApproval = () => {}

    const updateStatus = (id,status) =>{
        var memeData= props.mcList.find( x => x.meId == id)
        console.log(status)
        if (status=='rejected'){
            memeData.status = 'RJ';
            memeApproval = () => {
                addToast("Weak meme", {appearance:'error'})
            }
        }
        else if (status=='approved'){
            memeData.status = 'AP';
            memeApproval = () => {
                addToast("Legit", {appearance:'success'})
            }
        }

        props.updateMeme(id,memeData, ()=>{
            props.fetchAllMemes();
            memeApproval()})
        
    }

    // example use 
    // const [x,setX] = useState(0)
    // setX(5)
    // x initial value is 0
    // setX will set x to 5
    //
    // below callback function will be called if there is change on x value
    // useEffect(()=>{
    //    
    // },[x]) //alternative to ComponentDidMount 
    
    //if component is fully loaded, use effect will be called
    useEffect(()=>{
      props.fetchAllMemes()
    },[])
    return ( 
        <Paper className = {classes.paper} elevation = {3}>
            <Grid container>
                <Grid item xs ={5}>
                    <McForm />
                </Grid>
                <Grid item xs ={7}>
                    <TableContainer>
                                {
                                    props.mcList.map((record,index)=>{
                                        return (<TableRow key={index}>
                                             <TableCell>{record.title}</TableCell>
                                             <TableCell>{record.status}</TableCell> 
                                             <TableCell>
                                                 {console.log(record)}
                                                 <ButtonGroup variant="text">
                                                    <Button><CheckIcon color="primary" 
                                                    onClick={()=>{updateStatus(record.meId, 'approved')}}/></Button>
                                                    <Button><CloseIcon color="secondary" 
                                                    onClick={()=>{updateStatus(record.meId, 'rejected')}} /></Button>
                                                 </ButtonGroup>
                                             </TableCell>
                                             </TableRow>)                                             
                                    })
                                }
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state=>({
   mcList: state.mc.list
})

const mapActionToProps ={
    fetchAllMemes: actions.fetchAll,
    updateMeme: actions.update,
    fetchById: actions.fetchById
}
// connect is a function, it returns another function as a parameter to that return function we have passed this component here
export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Mc));

