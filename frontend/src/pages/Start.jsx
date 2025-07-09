import React, { useState,useEffect } from 'react'
import Input from "../Components/input"
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';
import LocationPanel from '../Components/LocationPanel';
import Vehicletype from '../Components/Vehicletype';
import ConfirmedVehicle from '../Components/ConfirmedVehicle';
import Lookingfordriver from '../Components/Lookingfordriver';
const Start = () => {
  const [pickup,setPickup] =useState("");
  const [drop,setDrop]=useState("");
  const [panel,setpanel]=useState(false);
  const panelRef = React.useRef(null);
  const panelIconRef = React.useRef(null);
  const [vehiclePanel,setvehiclePanel]=useState(false);
  const vehicletypeRef = React.useRef(null);
  const [confirmedvehicle,setConfirmedVehicle] = useState(false);
  const confirmedvehicleRef = React.useRef(null);
  const [choosevehicle, setChooseVehicle] = useState({});
   const vehiclefoundRef = React.useRef(null);
   const [vehiclefound, setVehicleFound] = useState(false);
  
 const submithandler = React.useCallback((e) => {
    e.preventDefault();
}, []);
  
   useGSAP(()=>{
    if(panel){
      gsap.to(panelRef.current,{
        height:"70%",
        duration:0.5,
      })
      gsap.to(panelIconRef.current,{
        autoAlpha:panel?1:0,
        duration:0.3,
      })
    }
    else{
      gsap.to(panelRef.current,{
        height:"0%",
        
    })
      gsap.to(panelIconRef.current,{
        opacity:0,
      })
    }
   },[panel])

   useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehicletypeRef.current,{
        transform:'translateY(0)'
      })}else{
        gsap.to(vehicletypeRef.current,{
          transform:'translateY(100%)'
        })
      }
    }
   ,[vehiclePanel])
  useGSAP(()=>{
    if(confirmedvehicle){
      gsap.to(confirmedvehicleRef.current,{
        transform:'translateY(0)',
    })
   }else{
    gsap.to(confirmedvehicleRef.current,{
      transform:'translateY(100%)'
    })
   }
  },[confirmedvehicle])
  console.log(choosevehicle);
  useGSAP(()=>{
    if(vehiclefound){
      gsap.to(vehiclefoundRef.current,{
        transform:'translateY(0)',
    })
   }else{
    gsap.to(vehiclefoundRef.current,{
      transform:'translateY(100%)'
    })
   }
  },[vehiclefound])
 
  console.log(choosevehicle);
  return (
    <div className='h-100% relative'>
      <img src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" className='w-24 left-5 top-5 absolute '/>
      <div className='h-screen w-screen'>
          <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
     <div className='flex flex-col justify-end h-screen absolute bottom-0  w-full '>
     <div className="bg-white h-[30%] py-5 px-5 relative">
      <h5  ref={panelIconRef}  onClick={()=>setpanel(false)} className=' absolute top-2 right-2 opacity-0 cursor-pointer'><i class="ri-arrow-down-s-line"></i></h5>
         <h4 className=" text-2xl font-semibold ">Find a trip</h4>
         <form onSubmit={(e)=>{
          submithandler(e)
         }}>
          <input
  type="text"
  placeholder="Add a pick-up location"
  value={pickup}
  onChange={(e) => setPickup(e.target.value)}
  onClick={() => setpanel(true)}
  className="px-3 py-5 w-full bg-gray-300 my-2 placeholder:text-2xl rounded-xl"
/>

<input
  type="text"
  placeholder="Enter your drop location"
  value={drop}
  onChange={(e) => setDrop(e.target.value)}
  onClick={() => setpanel(true)}
  className="px-3 py-5 w-full bg-gray-300 my-2 placeholder:text-2xl rounded-xl"
/>
         </form>
      </div>
      <div ref={panelRef} className='bg-white px-5 overflow-hidden  '>
          <LocationPanel  setpanel={setpanel}  setvehicletype={setvehiclePanel}/>
      </div>
     </div>
          <div ref={vehicletypeRef} className="fixed w-full z-10  bottom-0 translate-y-full bg-white px-3 py-10 pt-12'">
          <Vehicletype
  setvehicletype={setvehiclePanel}
  setConfirmedVehicle={setConfirmedVehicle}
  setChooseVehicle={setChooseVehicle}
/>
          </div>
          <div ref={confirmedvehicleRef} className="fixed w-full z-10  bottom-0  bg-white px-3 ">
            <ConfirmedVehicle setConfirmedVehicle={setConfirmedVehicle} choosevehicle={choosevehicle} setvehiclefound={setVehicleFound}/>
          </div>
          <div ref={vehiclefoundRef} className='fixed bottom-0 w-full z-10 bg-white px-3'>
            <Lookingfordriver setVehicleFound={setVehicleFound} choosevehicle={choosevehicle} />
          </div>
         
    </div>
  )
}

export default Start