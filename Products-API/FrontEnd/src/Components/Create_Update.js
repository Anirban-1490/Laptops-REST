import React, { useState ,useRef} from 'react'
import "../Styling/createAndupdate_style.css"
import axios from 'axios'


export const CreateUpdate = ()=>{

    const formref = useRef();
    
    
    function formHandler(e){
        // console.log(e);
        e.preventDefault()
        const formData = new FormData(formref.current)
        const inputData = Object.fromEntries(formData);
        const URL_POST_DATA = "http://localhost:5000/api/v1/products"
        axios.post(URL_POST_DATA,inputData).then(res=>console.log(res)).catch(err=>console.log(err))
        
    }


    return <>
        <div className='container'>
            <h2>Add a Product</h2>
            <form className='product-form' ref={formref} onSubmit ={(e)=>formHandler(e)}>
                <input type="text" name="name" id="name" autoComplete='off'  placeholder='Product name'/>
                <input type="text" name="img" id="imgfield" autoComplete='off' placeholder='Image url'/>
                <div>
                    <input type="text" name="price" id="pricefield" autoComplete='off' placeholder='Price' />
                    <input type="text" name="ram" id="ram" autoComplete='off' placeholder='Ram'/>
                    <input type="text" name="cpu" id="cpu" autoComplete='off' placeholder='Cpu'/>
                    <input type="text" name="generation" id="generation" autoComplete='off' placeholder='Cpu generation'/>
                    <input type="text" name="gpu" id="gpu" autoComplete='off' placeholder='Gpu'/>
                    <input type="text" name="vram" id="vram" autoComplete='off' placeholder='Vram'/>
                </div>
                
                <input type="text" name="display" id="display" autoComplete='off' placeholder='Display Specification'/>
                <button type="submit" className='submit-btn'>Add Product</button>
            </form>
        </div>
    </>
}