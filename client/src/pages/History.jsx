import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const History = () => {

  const [history,setHistory] = useState([])

  const {user,backendUrl,token} = useContext(AppContext)

 const getHistory = async()=>{

    try{

      if(!user) return

      console.log("USER:",user)

      // 🔥 FIXED: Changed endpoint to match your backend userRouter path (/api/user/history)
      const {data} = await axios.post(
        backendUrl + '/api/user/history',
        {
          userId:user._id
        },
        {
          headers:{token}
        }
      )

      console.log("HISTORY:",data)

      if(data.success){
        setHistory(data.history)
      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getHistory()
  },[user])

  return (

    <div className='min-h-[80vh] p-10'>

      <h1 className='text-3xl font-bold mb-8'>
        Generated Images
      </h1>

      {
        history.length === 0 ?

        <p>No history found</p>

        :

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>

          {history.map((item,index)=>(

            <div
              key={index}
              className='border rounded-xl p-3 shadow'
            >

              <img
                src={item.image}
                alt=""
                className='w-full rounded-lg'
              />

              <p className='mt-2 text-sm'>
                {item.prompt}
              </p>

            </div>

          ))}

        </div>
      }

    </div>
  )
}

export default History