import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../ContextApi/SocketContext';
import LiveTracking from '../Components/LiveTracking';
import axios from 'axios';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false); // ✅ track payment state

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate('/start-home');
    });
  }, [socket, navigate]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-order`, {
        amount: Math.round(ride.fare),
        userId: ride.userId,
        rideId: ride._id
      });

      const { orderId, amount } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Ride Payment",
        description: "Fare for completed ride",
        order_id: orderId,
        handler: async function (response) {
            console.log('Payment response:', response);
    
            
         await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/verify`, {
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,
  userId: ride.user._id, // ✅ Add this line
  rideId: ride._id,
  amount: Math.round(ride.fare)
});

          setPaymentSuccess(true); // ✅ Set payment success
        },
        prefill: {
          name: ride?.userName || "Customer",
          email: "sm427878@gmail.com",
          contact: "7985165277"
        },
        theme: {
          color: "#28a745"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      <div className='h-1/2'>
        <LiveTracking />
      </div>

      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Conditional rendering after payment */}
        {!paymentSuccess ? (
          <button
            className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
            onClick={handlePayment}
          >
            Make a Payment
          </button>
        ) : (
          <div className='mt-5 text-center'>
            <h2 className='text-green-600 font-bold text-lg mb-3'>✅ Payment Successful</h2>
            <button
              onClick={() => navigate('/start-home')}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold'
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Riding;
