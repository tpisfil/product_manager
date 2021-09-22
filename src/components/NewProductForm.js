import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router';

const NewProductForm = () => {

    const history = useHistory();

    let [formInfo, setFormInfo] = useState({
        title: null,
        price: null,
        description: null
    });

    let [validationErrors, setValidationErrors] = useState({});

    let changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    let submitHandler = (e) =>{
        e.preventDefault();
        console.log("tis my form info",formInfo);
        axios.post("http://localhost:8000/api/products/new", formInfo)
            .then(res=>{
                console.log("sup ",res);
                if (res.data.err){//if theres validation errors 
                    //store errors object so that you can display it
                    //if you remove the err you dont have to nest it an extra layer
                    setValidationErrors(res.data.err.errors);
                }else{
                    history.push("/"); //redirects to home if submitted properly
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h1>Form goes here</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input onChange={changeHandler} type="text" name="title" id="" className="form-control"/>
                    <p className="text-danger">{validationErrors.title? validationErrors.title.message : ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price</label>
                    <input onChange={changeHandler}type="number" name="price" id="" className="form-control"/>
                    <p className="text-danger">{validationErrors.price?.message}</p> 
                    {/* short way to write it from title validation, no need for an if else  */}
                </div>
                <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input onChange={changeHandler} type="text" name="description" id="" className="form-control"/>
                </div>
                <br></br>
                <input type="submit" value="Create" className="btn btn-primary"/>
            </form>
            <hr></hr>
        </div>
    );
};

export default NewProductForm;