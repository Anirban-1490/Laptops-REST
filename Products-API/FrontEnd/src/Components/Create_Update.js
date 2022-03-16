import React, { useState ,useEffect,useRef} from 'react'
import "../Styling/createAndupdate_style.css"
import axios from 'axios'
import { useParams } from 'react-router'


export const CreateUpdate = ()=>{

    const {productID} = useParams() //check on update route


    const formref = useRef();
    const errorDisplay = useRef()
    const [toggleText,setToggleText] = useState(false)
    const [fetchedData,setFetchedData] = useState();


    useEffect(()=>{
        async function fetchProd(){
          const response =  await axios.get(`http://localhost:5000/api/v1/${productID}`)
            const data = response.data.data;
     

            const inputs = document.getElementsByTagName("input");
          
            [...inputs].forEach(ip=>ip.value = data[ip.name])

        }
        fetchProd()

    },[productID])


    
    async function formHandler(e){
       
        e.preventDefault()
        const formData = new FormData(formref.current)
        const inputData = Object.fromEntries(formData);
        console.log(inputData);
        const URL_POST_DATA = "http://localhost:5000/api/v1/products"
        const URL_PUT_DATA = `http://localhost:5000/api/v1/${productID}`

       try {
            errorDisplay.current.classList.remove("active")
          const response =   (productID)?await axios.put(URL_PUT_DATA,inputData):await axios.post(URL_POST_DATA,inputData)
            if(response.status == 200){
                setToggleText(true)
                errorDisplay.current.classList.add("active")
            }
       } catch (error) {
            errorDisplay.current.classList.add("active")
       }
        
    }


    return <>
        <div className='container'>
            <h2>{(productID)?"Update a Product":"Add a Product"}</h2>
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
                <button type="submit" className='submit-btn'>
                    {
                        (productID)?"Update Product":
                        "Add Product"
                    }
                </button>
                <h4 className="error" ref={errorDisplay} style ={(!toggleText)?{backgroundColor:"#f7505091"}:{backgroundColor:"#4ce24cb0"}}>{(!toggleText)?"Please fill up all the fields" : (productID)?"Updated successfully":"Product added"}</h4>
            </form>
        </div>
    </>
}