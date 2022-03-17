import React, { useEffect ,useRef,useState} from "react";
import "../Styling/detailedView-style.css"
import axios from 'axios'
import {useParams} from 'react-router'

export const DetailedView = ()=>{

    const {productID} = useParams()
    const [data,setData] = useState()
    const imgref = useRef()

    useEffect(()=>{

        async function getData(){
            const response = await axios.get(`http://localhost:5000/api/v1/${productID}`)
            const data = response.data.data;
            
            setData(data)
        }
        getData()
    },[productID])

    const imgHover = (e)=>{
        const originX = e.currentTarget.clientWidth / 2
        const originY = e.currentTarget.clientHeight / 2



        const x = e.clientX - originX;
        const y = e.clientY - originY;

        imgref.current.style.transform = `translate(-${x}px , -${y}px) scale(2)`


        
    }

    const imgHoverOut = (e)=>{
        
            imgref.current.style.transform = "translate(0) scale(1)"
        
    }

    return <>
        <div className="wrapper">
            <div className="img-container" onMouseMove={e=>imgHover(e)} onMouseOut ={e=>imgHoverOut(e)}>
                <img src={data?.img} alt="" ref={imgref} />
            </div>
            <div className="information">
                <h2 className="name">{data?.name}</h2>
                <div className="price-stars">
                    <h4>&#8377;{data?.price}</h4>
                    <h4><ion-icon name="star"></ion-icon>{data?.rating}</h4>
                </div>
                <h4>CPU : {data?.cpu}</h4>
                <h4>CPU Generation : {data?.generation}</h4>
                <h4>GPU : {data?.gpu}</h4>
                <h4>VRAM : {data?.vram}</h4>
                <h4>RAM : {data?.ram}</h4>
                <h4>Display Specification : {data?.display}</h4>
            </div>
        </div>

    </>
}
