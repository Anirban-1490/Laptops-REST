
import React,{useEffect,useState} from 'react';
import "../Styling/Main_Style.css"
import axios from 'axios'
import { Link } from 'react-router-dom';



export const Main = ()=>
{
    const [windowSize,setWindowSize] = useState(window.innerWidth)
    const [data,setData] = useState([])
    const [isDeleted,setIsDeleted] = useState(false);
   
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
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize",callbc)
        return ()=> window.removeEventListener("resize",callbc)
    },[windowSize])

    
    const deleteProduct = async(e,prodID)=>{

      
        e.preventDefault()
        var itemContainer =  e.currentTarget.parentNode.parentNode.parentNode.parentNode;

        

      try {
        const response = await axios.delete(`http://localhost:5000/api/v1/${prodID}`)
        
        if(response.status == 200){
            //* if successful delete
            itemContainer.classList.add("animate")
            setIsDeleted(true);

            //*show the product deleted popup
            itemContainer.previousSibling.classList.add("active");
            setTimeout(()=>{
                itemContainer.parentNode.remove()
            },2000);
        }
      } catch (error) {
        itemContainer.previousSibling.classList.add("active");
        itemContainer.previousSibling.style.backgroundColor = "red"
        setTimeout(()=>{
            itemContainer.previousSibling.classList.remove("active");
        },2000);
      }

    }

    return <>
        <div className='container-main'>
            <h2>Laptop-ssss</h2>
            <button className='createbtn'><Link to={"/createandupdate"} className="btnlink">
            <ion-icon name="add"></ion-icon>Create</Link></button>
            <main>
               {
                      
                   data && data.map(item=>{
                    
                    const {img,name,price,rating,_id} = item;

                    return <div className="item-container-main" key={_id}>
                          
                                <h3>{(isDeleted)?"Item deleted successfully!":"Can't delete item , try again later"}</h3>
                           
                           <div  className="item-container"  >
                               <div className='img-container'><img src={img} alt="" /></div>
                               <div className='info'>
                                   <h3>{(windowSize <= 430) ? String(name).substring(0, 50) + "..." : (windowSize <= 810) ? String(name).substring(0, 90) + "..." : name}</h3>
                                   <div className='wrapper'>
                                       <div className='more-details'>
                                           <h4> &#8377;{price}</h4>
                                           <h4><ion-icon name="star"></ion-icon>{rating}</h4>
                                       </div>
                                       <div className='operations'>
                                           <button className='update'>
                                               <ion-icon name="create-outline"></ion-icon>
                                           </button>
                                           <button className='delete' onClick={e => deleteProduct(e, _id)}>
                                               <ion-icon name="trash-outline"></ion-icon>
                                           </button>
                                       </div>
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