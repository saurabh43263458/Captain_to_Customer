import React from 'react';

const ConfirmedVehicle = ({ choosevehicle, setConfirmedVehicle,setvehiclefound }) => {
  return (
    <div className='  flex flex-col items-center justify-center bottom-0' onClick={() => setConfirmedVehicle(false)}>
      <h2 className='flex justify-center items-center font-bold text-2xl text-center  cursor-pointer'><i className="ri-arrow-down-s-line"></i></h2>
      <div className="text-2xl font-bold mb-2 text-center py-2">
        Confirem your vehicle
      </div>
      
        <div className="font-bold text-xl my-4 w-full ">
           <div className='w-full flex justify-center items-center'>  <img className=" h-50 w-50 "src={choosevehicle.image} alt="" /></div>
            <div className='flex items-center gap-5 my-2 py-2 border-b-2 border-t-2 border-gray-500 '>
                        <i className="ri-map-pin-2-fill text-xl text-black"></i>
              <div className=''>
                <h2>
              562/11-A
            </h2>
            <h3 className='text-gray-500 text-xl font-semibold'>
              kaikondrahalli, Bangalore
            </h3>
              </div>
            </div>
           <div className='flex items-center gap-5  py-1  border-gray-500'>
             <i className="ri-map-pin-2-fill text-xl text-black"></i>

              <div>
                <h2>
              tt-rr
            </h2>
            <h3 className='text-gray-500 text-xl font-semibold'>
              kaikondrahalli, Bangalore
            </h3>
              </div>
            </div>

        </div>
        <div className='flex items-center justify-between w-full px-5 py-2'>
          <h2 className='text-2xl font-bold'>Price</h2>
          <h3 className='text-2xl font-bold'>{choosevehicle.price}</h3>
 </div>
  <button onClick={() => {
  setConfirmedVehicle(false);
  setvehiclefound(true);
}}
 className="flex justify-center items-center w-full mb-1 bg-amber-500 text-white  text-2xl font-bold py-5 my-5 rounded-2xl">Confirm</button>
      </div>
        
    
  );
};

export default ConfirmedVehicle;
