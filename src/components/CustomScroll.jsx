import React, { useEffect, useState } from "react";
import axios from "axios";


const CustomScroll = ()=>{

    const [products,setProducts] = useState([])
    const [scrollPercentage,setScrollPercentage] = useState(0)

    async function fetchProducts(){

        try{

            const response  = await axios.get('https://dummyjson.com/products?limit=100')
            const result =  response.data.products
            setProducts(result)
            console.log(result)

        }
        catch(erro){
            console.log(erro)
        }
    }

  

    useEffect(()=>{

        fetchProducts()

    },[])

   

    function handleSrcollPercentage(){

        console.log(
            document.body.scrollTop,
            document.documentElement.scrollTop,
            document.documentElement.scrollHeight,
            document.documentElement.clientHeight
        )

        const howMuchScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

        setScrollPercentage((howMuchScroll/height)*100)
       

    }

    console.log(scrollPercentage)


    useEffect(()=>{

        window.addEventListener('scroll', handleSrcollPercentage)

        return ()=>{
            window.removeEventListener('scroll',()=>{})
        }

    },[])


    return (
        <div>

            <div className="top-container">
                <div className="scroll-tracker">
                    <div className="current-progress" style={{width:`${scrollPercentage}%`}}>
                    </div>
                </div>

            </div>
            <br />
            <div className="data-container">
                {
                    products.map((product,index)=>(
                        <p>{product.title}</p>
                    ))
                }

            </div>
            
        </div>
    )
}


export default CustomScroll