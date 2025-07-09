import React from 'react'

const LocationPanel = (prop) => {
    const locationList = [
        { type: "Home", address: "2/123 Street, New York, NY 10001" },
        { type: "Office", address: "3/123 Street, New York, NY 10001" },
        { type: "Warehouse", address: "4/123 Street, New York, NY 10001" },
        { type: "Store", address: "5/123 Street, New York, NY 10001" },
        { type: "Branch", address: "6/123 Street, New York, NY 10001" }
      ];
 return (
<div className='mt-10'>
    {
        locationList.map((location,index)=>(
            <div key={index} onClick={()=>{prop.setvehicletype(true); prop.setpanel(false);}}  className= 'flex  items-center justify-start py-1 px-5 my-3 rounded-xl cursor-pointer border-3 border-gray-50 active:border-black '>
                <h2 className="bg-[#eee] h-12 flex items-center justify-center w-12 rounded-full"><i class="ri-map-pin-line"></i></h2>
                <div className='flex flex-col ml-4'>
                    <h5 className='font-bold text-xl'>{location.type}</h5>
                    <h3 className="text-gray-500">{location.address}</h3>
                </div>
                </div>

        ))
    }
</div>
 )

 }


export default LocationPanel