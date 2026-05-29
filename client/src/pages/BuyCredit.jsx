import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";

const BuyCredit = () => {
  const navigate = useNavigate();

  const { user, backendUrl, loadCreditsData, token } = useContext(AppContext)

  const paymentRazorpay = async (planId) => {

    try {

      console.log("Button Clicked", planId)

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-razor',
        {
          userId: user._id,
          planId
        },
        {
          headers: {
            token
          }
        }
      )

      console.log(data)

      if (data.success) {

        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: data.order.currency,
          name: 'Imagify',
          description: 'Credits Payment',
          order_id: data.order.id,

          // handler: async (response) => {

          //   console.log(response)

          //   await loadCreditsData()

          //   toast.success("Payment Successful")
          // }
         handler: async (response) => {
           try{
            const {data} = await axios.post(backendUrl + '/api/user/verify-razor',
              response,{headers:{token}}
            )
            if(data.success){
              loadCreditsData();
              navigate('/')
              toast.success('Credit Added')
            }
           }
           catch(error){
            toast.error(error.message)
           }
           
          }
        }

        const razorpay = new window.Razorpay(options)

        razorpay.open()
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='min-h-[80vh] text-center pt-14 mb-10'
    >

      {/* Top Button */}
      <motion.button
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='border border-blue-400 text-blue-600 px-10 py-2 rounded-full mb-6 bg-blue-50'
      >
        Our Plans
      </motion.button>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className='text-center text-4xl font-bold mb-12 text-gray-800'
      >
        Choose the plan
      </motion.h1>

      {/* Cards */}
      <div className='flex flex-wrap justify-center gap-8 text-left'>

        {plans.map((item, index) => (
          <motion.div
            key={index}

            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}

            transition={{
              duration: 0.5,
              delay: index * 0.2
            }}

            whileHover={{
              scale: 1.05,
              y: -10
            }}

            className='bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl py-10 px-8 text-gray-700 shadow-xl w-72'
          >

            {/* Logo */}
            <motion.img
              whileHover={{ rotate: 10 }}
              width={55}
              src={assets.logo_icon}
              alt=""
              className='mb-5'
            />

            {/* Plan Name */}
            <p className='text-2xl font-semibold mb-2 text-gray-800'>
              {item.id}
            </p>

            {/* Description */}
            <p className='text-sm text-gray-500 mb-5'>
              {item.desc}
            </p>

            {/* Price */}
            <div className='mb-8'>
              <span className='text-5xl font-bold text-gray-900'>
                ₹{item.price}
              </span>

              <span className='text-gray-500 text-lg'>
                / {item.credits} credits
              </span>
            </div>

            {/* Purchase Button */}
            <motion.button

              whileTap={{ scale: 0.9 }}

              whileHover={{
                scale: 1.03
              }}

              onClick={() => paymentRazorpay(item.id)}

              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-blue-300 transition-all duration-300'
            >
              Purchase
            </motion.button>

          </motion.div>
        ))}

      </div>

    </motion.div>
  )
}

export default BuyCredit


