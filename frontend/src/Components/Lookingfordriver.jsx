import React from 'react'

const Lookingfordriver = ({setVehicleFound,choosevehicle}) => {
   const [driverfound, setDriverFound] = React.useState(true);
  return (
     
   <div className='  flex flex-col items-center justify-center bottom-0' onClick={() => setVehicleFound(false)}>
      <h2 className='flex justify-center items-center font-bold text-2xl text-center cursor-pointer'><i className="ri-arrow-down-s-line"></i></h2>
    { driverfound &&(<h4 className=' '>
  <img className="h-10 w-full" src="/src/assets/img/Progressbar.gif" alt="Loading..." />
</h4>)}

      <div className="text-2xl font-bold mb-2 text-center py-2">
        Looking for nearby drivers
      </div>
      
        <div className="font-bold text-xl my-4 w-full ">
           <div className={`w-full flex ${driverfound ? 'justify-center': 'justify-between'} items-center px-2`}>  <img className=" h-50 w-50 " src={choosevehicle.image} alt="" />
            {!driverfound &&  (<div>
                <h2 className='text-2xl font-bold'>Shivandre pandey</h2>
                <h2 className='text-xl font-bold'>Mobile No:98888888</h2>
                <h3 className='text-gray-500 text-md'>UP32CD-{choosevehicle.name} Number</h3>
            </div>)}
           </div>
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
   </div>
        
  )
}

export default Lookingfordriver;