import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useHistory } from 'react-router';

const OneProduct = () => {

    const [productInfo, setProductInfo] = useState({});
    const history = useHistory();
    const {_idParam} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${_idParam}`)
        .then(res=>{
            // console.log("one prod:", res)
            setProductInfo(res.data.results)
        })
        .catch(err=>console.log(err))
    },[])

    const deleteClickHandler =() => {
        // console.log("haha deleted", _idParam);
        axios.delete(`http://localhost:8000/api/products/delete/${_idParam}`)
        .then(res=>{
            console.log(res);
            history.push("/");
        })
        .catch(err=>err)
    }

    return (
        <div>
            <h3>Title: {productInfo.title}</h3>
            <h3>Price: {productInfo.price}</h3>
            <h3>Description: {productInfo.description}</h3>
            <hr />
            <h3><Link to={`/product/edit/${productInfo._id}`} className = "btn btn-info">EDIT</Link></h3>
            <button onClick={deleteClickHandler} className="btn btn-danger">Delete!</button>
        </div>
    );
};


export default OneProduct;