import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const AllProducts = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [deleteClicked, setDeleteClicked] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
        .then(res=>{
            // console.log(res)
            setAllProducts(res.data.results)
        })
        .catch(err => console.log(err))
    },[deleteClicked])

    const deleteClickHandler =(e,idOfProduct) => {
        // console.log("haha deleted", _idParam);
        axios.delete(`http://localhost:8000/api/products/delete/${idOfProduct}`)
        .then(res=>{
            console.log(res);
            setDeleteClicked(!deleteClicked);
        })
        .catch(err=>err)
    }

    return (
        <div>
            <h2>All the Products</h2>
            {allProducts.map((product,i)=> {
                return <>
                <h4 key={i}>
                    <Link to = {`/product/${product._id}`} >{product.title}</Link>
                </h4>
                <button onClick={(e) => deleteClickHandler(e,product._id)} className="btn btn-danger">Delete!</button>
                </>
            })}
        </div>
    );
};

export default AllProducts;