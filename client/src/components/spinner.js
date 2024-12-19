import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const Spinner = ({path="login"}) => {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((preValue) => --preValue)

        },1000)
        count == 0 &&  navigate(`/${path}`, {
          state:location.pathname
        })
        return ()=>clearInterval(interval)

    },[count,navigate, location,path])

  return (
    <>
    <div className="d-flex justify-content-center align-items-center 100vh"
    style ={{height: "100vh"}}
    >
        <h1 className='text-center'>redirecting to you...{count} seconds</h1>
  <div className="spinner-border" role="status">
    {/* <span className="">Loading...</span> */}

  </div>
</div></>
  )
}

export default Spinner