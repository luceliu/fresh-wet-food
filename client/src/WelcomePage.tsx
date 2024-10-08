import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NextDeliveryMessage } from '../../common/types';

const WelcomePage = () => {
  const { id } = useParams();
  const [deliveryMessage, setDeliveryMessage] =
    useState<NextDeliveryMessage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/comms/your-next-delivery/${id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeliveryMessage(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message); // TODO: actually handle this for the user
        } else {
          console.log('unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryMessage();
  }, [id]);

  if (loading || !deliveryMessage) return <div>Loading...</div>;

  return (
    <div className="flex justify-center">
      <div className="bg-white border border-slate-300 rounded w-[90%] my-8 relative md:flex md:w-5/6 lg:max-w-[854px]">
        <img
          src="https://d2zp5xs5cp8zlg.cloudfront.net/image-53908-340.jpg"
          alt="Cat mugshot"
          className="rounded-full h-12 w-12 border border-slate-300 object-cover absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 md:max-w-[250px] md:static md:h-full md:w-auto md:rounded-none md:left-0 md:translate-x-0 md:translate-y-0"
        />
        <div className="px-2 py-8 md:flex md:flex-col md:justify-center md:ml-4">
          <h1 className="text-lg text-center font-bold text-green-600 md:text-left md:w-5/6">
            {deliveryMessage.title}
          </h1>
          <p className="text-xs text-center text-slate-600 my-2 md:text-left md:w-5/6">
            {deliveryMessage.message}
          </p>
          <p className="text-sm text-center text-slate-600 font-bold md:text-left md:w-5/6">
            Total price: £{deliveryMessage.totalPrice.toFixed(2)}
          </p>
          <div className="flex justify-center space-x-6 mt-4 md:justify-start">
            <button className="bg-green-600 text-xs text-white uppercase rounded w-36 px-6 py-1">
              See Details
            </button>
            <button className="text-green-600 text-xs border border-green-600 uppercase rounded w-36 px-6 py-1">
              Edit Delivery
            </button>
          </div>
          {deliveryMessage.freeGift && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-pink-300 border border-pink-500 w-24 flex justify-center -rotate-6 md:top-0 md:right-0 md:bottom-auto md:left-auto md:rotate-6 md:translate-x-1/2 md:-translate-y-1/2">
              <span className="text-sm font-bold uppercase text-pink-900">
                Free Gift
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
