import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory } from 'react-router';

const EditProduct = () => {
    const [productInfo, setProductInfo] = useState({});
    const history = useHistory();
    const {_idParam} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${_idParam}`)
        .then(res=>{
            console.log("one prod:", res)
            setProductInfo(res.data.results)
        })
        .catch(err=>console.log(err))
    },[])

    let changeHandler = (e) => {
        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
        console.log("hello");
    }

    let submitHandler = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/update/${_idParam}`,productInfo)
        .then(res => {
            console.log(res);
            history.push(`/product/${_idParam}`);
        })
        .catch(err=>err);
    }

    return (
        <div>
            <h1>EDIT</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input onChange={changeHandler} type="text" name="title" id="" className="form-control" value={productInfo.title}/>
                    {/* <p className="text-danger">{validationErrors.title? validationErrors.title.message : ""}</p> */}
                </div>
                <div className="form-group">
                    <label htmlFor="">Price</label>
                    <input onChange={changeHandler}type="number" name="price" id="" className="form-control" value={productInfo.price}/>
                    {/* <p className="text-danger">{validationErrors.price?.message}</p>  */}
                    {/* short way to write it from title validation, no need for an if else  */}
                </div>
                <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input onChange={changeHandler} type="text" name="description" id="" className="form-control" value={productInfo.description}/>
                </div>
                <br></br>
                <input type="submit" value="Create" className="btn btn-primary"/>
            </form>
        </div>
    );
};


export default EditProduct;