import React from 'react'

const Vehicletype = ({setImage, setvehicletype, setpanel, setChooseVehicle, fare,setConfirmedVehicle,setfare}) => {

    


    const vehicleLink={
        bike:{
            image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
            name:"Bike",
            price:"₹ "+parseInt(fare.Bike),
            capacity:"1",
            time:"3 mins",
            message:"Best for short trips"
        },
        car:{
            image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png",
            name:"Car",
            price:"₹ "+parseInt(fare.Car),
            capacity:"4",
            time:"5 mins",
            message:"Best for short trips and comfort"
        },
        Auto:{
            image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
            name:"Auto",
            price:"₹ "+parseInt(fare.Auto),
            capacity:"3",
            time:"4 mins",  
            message:"Best for short trips"      
        },
        Van:{
            image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png",
            name:"Van",
            price:"₹ "+parseInt(fare.Van),
            capacity:"6",
            time:"6 mins ",
            message:"Best for short trips and comfort"
        }

    }
    return (
        <div className=" ">
          <div className="flex justify-between items-center px-5 " >
            <p className='font-bold text-3xl'>Chooce Vehcile</p>
          <h2 className='cursor-pointer'onClick={()=>{setvehicletype(false); setpanel(true);}} ><i className="ri-arrow-down-s-line"></i></h2>
          </div>
          {
            Object.keys(vehicleLink).map((key, index) => {
              const vehicle = vehicleLink[key];
              return (
                <div key={index} onClick={() => {
    setChooseVehicle(vehicle);
    setvehicletype(false);
    setConfirmedVehicle(true);
    setfare(vehicle.price);
  }}
  className='flex items-center justify-around py-2 px-5 my-5 mx-5 rounded-xl cursor-pointer border-3 border-gray-50 active:border-black'>
                  <img src={vehicle.image} alt={vehicle.name} className='h-12' />
                  <div className="ml-4 flex flex-col w-1/2">
                    <div className='flex justify-between '>
                      <h2 className='font-bold text-xl'>{vehicle.name}</h2>
                      <h3 className="text-gray-500">{vehicle.capacity} seats</h3>
                    </div>
                    <div className="flex justify-between "> 
                      <h2 className='font-bold text-1/2xl'>{vehicle.time}</h2>
                     
                    </div>
                    <h2 className='text-gray-500 text-md'>{vehicle.message}</h2>
                  </div>
                  <div>
                    <h2 className='font-bold text-xl'>{vehicle.price}</h2>
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    }
    
    export default Vehicletype;
    