import React, { useState, useEffect } from 'react'
import Input from "../Components/input"
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';
import LocationPanel from '../Components/LocationPanel';
import Vehicletype from '../Components/Vehicletype';
import ConfirmedVehicle from '../Components/ConfirmedVehicle';
import Lookingfordriver from '../Components/Lookingfordriver';
import axios from 'axios';
import { SocketContext } from '../ContextApi/SocketContext';
import { useContext } from 'react';
import { UserContext } from '../ContextApi/userContextapi';
import { useNavigate } from 'react-router-dom';
import WaitingForDriver from '../Components/WaitingForDriver';
const Start = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [panel, setpanel] = useState(false);
  const panelRef = React.useRef(null);
  const panelIconRef = React.useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const vehicletypeRef = React.useRef(null);
  const [confirmedvehicle, setConfirmedVehicle] = useState(false);
  const confirmedvehicleRef = React.useRef(null);
  const [choosevehicle, setChooseVehicle] = useState({});
  const vehiclefoundRef = React.useRef(null);
  const [vehiclefound, setVehicleFound] = useState(false);
 const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const waitingForDriverRef =React.useRef(null)
  const [image, setImage] = useState("");
  const [ ride, setRide ] = useState(null)
  // New state for location suggestions and active input
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'drop'

  const [allFares, setAllFares] = useState({});
  // Fetch all fares when pickup or drop changes
  const [shouldFetchFare, setShouldFetchFare] = useState(false);
 const [fare, setfare] = useState({})
 const { socket } = useContext(SocketContext)
 const { user } = useContext(UserContext)

  useEffect(() => {
   
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])
  socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

 console.log("ride", ride);
    socket.on('ride-started', ride => {
        console.log(ride)
        setWaitingForDriver(false)
       
    })
  // Fetch suggestions when pickup or drop changes and panel is open
  useEffect(() => {
  let query = "";
  if (panel && activeInput === "pickup" && pickup.length > 0) {
    query = pickup;
  } else if (panel && activeInput === "drop" && drop.length > 0) {
    query = drop;
  } else {
    setLocationSuggestions([]);
    return;
  }
  console.log("Fetching suggestions for:", query);
  const fetchSuggestions = async () => {
    try {
      console.log("Fetching suggestions for:", query);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Response:", res.data);
      setLocationSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setLocationSuggestions([]);
    }
  };

  fetchSuggestions();
}, [pickup, drop, panel, activeInput]);


const handleSuggestionClick = (suggestion) => {
  if (activeInput === "pickup") {
    setPickup(suggestion);
    setActiveInput("pickup");
  } else if (activeInput === "drop") {
    setDrop(suggestion);
     setActiveInput("drop");
  }

  setActiveInput(null);
  setLocationSuggestions([]);
};


const submithandler = (e) => {
  e.preventDefault();

  if (!pickup || !drop) {
    alert("Please enter both pickup and drop locations.");
    return;
  }

  console.log("Pickup:", pickup, "Drop:", drop);
  setpanel(false);
  setvehiclePanel(true);

  // Only now fetch fare
  setShouldFetchFare(true);
};


useEffect(() => {
  if (!shouldFetchFare || !pickup || !drop) return;

  const fetchAllFares = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: {
          pickup: pickup,
          destination: drop,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log("Fare prices:", res.data);
      setAllFares(res.data.fares || {});
    } catch (err) {
      console.error("Error fetching fare prices:", err);
      setAllFares({});
    } finally {
      setShouldFetchFare(false); // Reset after fetch
    }
  };

  fetchAllFares();
}, [shouldFetchFare, pickup, drop]);

async function createRide() {
  if (!pickup || !drop || !choosevehicle) {
    alert("Please enter pickup, drop locations and choose a vehicle.");
    return;
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
      pickup,
      destination: drop,
      vehicleType: choosevehicle.name,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log("Ride created successfully:", res.data);
    // Handle success (e.g., navigate to ride details page)
  } catch (err) {
    console.error("Error creating ride:", err);
    alert("Failed to create ride. Please try again.");
  }
}

  useGSAP(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
      })
      gsap.to(panelIconRef.current, {
        autoAlpha: panel ? 1 : 0,
        duration: 0.3,
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: "0%",
      })
      gsap.to(panelIconRef.current, {
        opacity: 0,
      })
    }
  }, [panel])
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehicletypeRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vehicletypeRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }
    , [vehiclePanel])
  useGSAP(() => {
    if (confirmedvehicle) {
      gsap.to(confirmedvehicleRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmedvehicleRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmedvehicle])
  useGSAP(() => {
    if (vehiclefound) {
      gsap.to(vehiclefoundRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclefoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclefound])
  useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])
  return (
    <div className='h-100% relative'>
      <img src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" className='w-24 left-5 top-5 absolute ' />
      <div className='h-screen w-screen'>
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute bottom-0  w-full '>
        <div className="bg-white h-[30%] py-5 px-5 relative">
          <h5 ref={panelIconRef} onClick={() => setpanel(false)} className=' absolute top-2 right-2 opacity-0 cursor-pointer'><i className="ri-arrow-down-s-line"></i></h5>
          <h4 className=" text-2xl font-semibold ">Find a trip</h4>
          <form onSubmit={submithandler}>
            <input
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveInput("pickup");
                setpanel(true);
              }}
              onClick={() => {
                setpanel(true);
                setActiveInput("pickup");
              }}
              className="px-3 py-5 w-full bg-gray-300 my-2 placeholder:text-2xl rounded-xl"
            />

            <input
              type="text"
              placeholder="Enter your drop location"
              value={drop}
              onChange={(e) => {
                setDrop(e.target.value);
                setActiveInput("drop");
                setpanel(true);
              }}
              onClick={() => {
                setpanel(true);
                setActiveInput("drop");
              }}
              className="px-3 py-5 w-full bg-gray-300 my-2 placeholder:text-2xl rounded-xl"
            />
            <button className='w-full bg-amber-400 py-1 rounded-2xl  text-[1.7rem] font-bold my-4' >find rider</button>
          </form>
          
        </div>
       <div ref={panelRef} className="bg-white px-5 max-h-[70vh] overflow-auto">
  {panel && (
    <LocationPanel
      suggestions={locationSuggestions}
      onSuggestionClick={handleSuggestionClick}
      activeInput={activeInput}
      setChooseVehicle={setChooseVehicle}
    />
  )}
</div>

      </div>
      <div ref={vehicletypeRef} className="fixed w-full z-10  bottom-0 translate-y-full bg-white px-3 py-10 pt-12'">
        <Vehicletype
          setvehicletype={setvehiclePanel}
          setConfirmedVehicle={setConfirmedVehicle}
          setChooseVehicle={setChooseVehicle}
          setImage={setImage}
          fare={allFares}
          setfare={setfare}
        />
      </div>
      <div ref={confirmedvehicleRef} className="fixed w-full z-10  bottom-0 translate-y-full bg-white px-3 ">
        <ConfirmedVehicle pickup={pickup} drop={drop} setConfirmedVehicle={setConfirmedVehicle} choosevehicle={choosevehicle} setvehiclefound={setVehicleFound} createRide={createRide} />
      </div>
      <div ref={vehiclefoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <Lookingfordriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={drop}
                    fare={fare}
                    vehicleType={confirmedvehicle}
                    setVehicleFound={setVehicleFound} />
            </div>
      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
    </div>
  )
}

export default Start