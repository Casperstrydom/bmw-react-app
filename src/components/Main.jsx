import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Main(props) {
  const { data, stopSlideshow } = props; // Add stopSlideshow prop
  const [animationClass, setAnimationClass] = useState("slideshow");

  useEffect(() => {
    if (stopSlideshow) {
      setAnimationClass(""); // Disable slideshow animation when the sidebar is active
    } else {
      setAnimationClass("slideshow"); // Enable animation when the sidebar is inactive
    }
  }, [stopSlideshow]);

  if (!data) {
    return <div className="loadingState text-center py-5">Loading...</div>;
  }

  return (
    <div className="imgContainer">
      <img
        src="https://di-uploads-pod27.dealerinspire.com/bmwofmeridian/uploads/2022/03/2021-BMW-M3-thin-tall.jpg"
        alt="BMW M3"
        className={`bgImage ${animationClass}`} // Dynamically apply animation class
      />
      <img
        src="https://cdn.bmwcca.org/static/join/images/BMW-M2-Coupe_2500x1150.jpg"
        alt="BMW M2 Coupe"
        className={`bgImage2 ${animationClass}`} // Dynamically apply animation class
      />
      <img
        src="https://c4.wallpaperflare.com/wallpaper/392/133/116/car-bmw-bmw-m4-wallpaper-thumb.jpg"
        alt="BMW M4 Wallpaper"
        className={`bgImage3 ${animationClass}`} // Dynamically apply animation class
      />
    </div>
  );
}
