import { useEffect, useState } from "react";

const Stats = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const checkApiStatus = async () => {
      try {
        const response = await fetch("https://www.boredapi.com/api/activity");
        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      }
    };
  
    const checkInternetConnection = () => {
      if (navigator.onLine) {
        checkApiStatus();
      } else {
        setIsOnline(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("online", checkInternetConnection);
      window.addEventListener("offline", checkInternetConnection);
  
      return () => {
        window.removeEventListener("online", checkInternetConnection);
        window.removeEventListener("offline", checkInternetConnection);
      };
    }, []);
    return (
        <div className="container">
      <h2>Internet connection status: {isOnline ? "Online" : "Offline"}</h2>
      <p>Turn on/off your internet connection to see what happens</p>
      {isOnline ? (
        <h1 className="online">You are Online</h1>
      ) : (
        <h1 className="offline">You are Offline</h1>
      )}
    </div>
    );
};

export default Stats;