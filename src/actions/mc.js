import api from "./api";
// api is the custom name variable for the imported file/package

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_BY_ID: 'FETCH_BY_ID'
}

// below is called action creator or redux-thunk function wrapper
// () => is parameter
// => is returning inner function
//
// below is the extended version of fetchAll function
//export const fetchAll = () =>
//{
//    return dispatch =>
//    {
//         
//    }
//}

export const fetchAll = () => dispatch => {
    // get api req
    // then function is to handle the successful response
    // catch function is to handle error response
    api.mc()
    .fetchAll().then(response => {
        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload:response.data
        })
    })
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch =>
{
   api.mc()
   .create(data).then( response =>{
       dispatch({
           type: ACTION_TYPES.CREATE,
           payload: response.data
       })
       onSuccess()
   })
   .catch(err=>console.log(err))
}


export const update = (id, data, onSuccess) => dispatch =>
{
   api.mc()
   .update(id,data).then( response =>{
       dispatch({
           type: ACTION_TYPES.UPDATE,
           payload: response.data
       })
       onSuccess()
   })
   .catch(err=>console.log(err))
}

export const fetchById = (id) => dispatch => {
    // get api req
    // then function is to handle the successful response
    // catch function is to handle error response
    api.mc()
    .fetchById(id).then(response => {
        dispatch({
            type:ACTION_TYPES.FETCH_BY_ID,
            payload:response.data
        })
    })
    .catch(err => console.log(err))
}