
import React,{useEffect,useState} from 'react';
import "../Styling/Main_Style.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
export const Main = ()=>
{
    const [windowSize,setWindowSize] = useState(window.innerWidth)
    const [data,setData] = useState([])
   const URL_GET_DATA = "http://localhost:5000/api/v1"
    

    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(URL_GET_DATA)
            setData(res=>[...res,...result.data.data])
        }
      
        fetchData()
    },[URL_GET_DATA])

   

    useEffect(()=>{
        const callbc = ()=>{
            console.log(windowSize);
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize",callbc)
        return ()=> window.removeEventListener("resize",callbc)
    },[windowSize])

    return <>
        <div className='container-main'>
            <h2>Laptop-ssss</h2>
            <button className='createbtn'><Link to={"/createandupdate"} className="btnlink">
            <ion-icon name="add"></ion-icon>Create</Link></button>
            <main>
               {
                      
                   data && data.map(item=>{
                    
                    const {img,name,price,rating,_id} = item;

                    return <div key={_id} className ="item-container">
                        <div className='img-container'><img src={img} alt="" /></div>
                        <div className='info'>
                            <h3>{(windowSize<=430)?String(name).substring(0,50)+"...":(windowSize<=810)?String(name).substring(0,90)+"...":name}</h3>
                            <div className='wrapper'>
                                <div className='more-details'>
                                    <h4> &#8377;{price}</h4>
                                    <h4><ion-icon name="star"></ion-icon>{rating}</h4>
                                </div>
                                <div className='operations'>
                                    <ion-icon name="create-outline"></ion-icon>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                   })
               }
            </main>
        </div>
    </>
}