import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Import custom CSS file for additional styles

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const today = new Date().toDateString();
      const localKey = `BMW-${today}`;

      if (localStorage.getItem(localKey)) {
        const cachedData = JSON.parse(localStorage.getItem(localKey));
        setData(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

        if (!apiKey) {
          throw new Error("API Key is not defined");
        }

        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forUsername=BMW&key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedData = await response.json();

        if (fetchedData && fetchedData.items && fetchedData.items.length > 0) {
          const channelInfo = fetchedData.items[0];
          const apiData = {
            title: channelInfo.snippet.title,
            description: channelInfo.snippet.description,
            subscriberCount: channelInfo.statistics.subscriberCount,
            viewCount: channelInfo.statistics.viewCount,
            videoCount: channelInfo.statistics.videoCount,
            hdurl:
              "https://i.pinimg.com/originals/f4/d0/92/f4d0926b86f2c466e4ca6ef4ef199ddc.jpg",
            hdurl2:
              "https://wallpapers.com/images/hd/bmw-logo-pictures-1vpyk0cc3rcxcuyk.jpg",
          };

          localStorage.setItem(localKey, JSON.stringify(apiData));
          setData(apiData);
        } else {
          setData(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAPIData();
  }, []);

  const bmwInfo = `
    <p>
     <h2>${data?.title}</h2> 
     <p><strong>The central part of the BMW logo symbolizes the rotating blades of an airplane which depicts the company's early history of aviation technology.</strong></p>
     <hr/>
      <strong>BMW offers amazing driving performance with high-powered engines and a sleek look.</strong> 
      With ultra-responsive steering and even weight distribution, you can zoom these cars through tight turns. 
      What's even better is how great they look. BMW, in full Bayerische Motoren Werke AG, is a German automaker 
      noted for quality sports sedans and motorcycles. Headquarters are in Munich.
      <strong>It originated in 1916 as Bayerische Flugzeug-Werke,</strong> a builder of aircraft engines, 
      and soon began producing motorcycles and automobiles. In 1928 BMW bought the Eisenach company, 
      which built Austin Sevens under licence, but its own first car, the somewhat unsuccessful Wartburg, 
      did not appear until 1933. In the 1950s BMW’s luxury cars were considered outmoded and uncompetitive, 
      and the company was near bankruptcy until it returned to profitability with the introduction of its 
      700 series of sedans in 1959 and the modern 1500 model in 1962.
    </p>
    <p>
      <strong>BMW has only three colors: Blue, white, and black. </strong> 
      Blue stands for strength and dependability, white represents purity and elegance, and black is used 
      to represent technology and innovation. Together, these colors convey a powerful message about the 
      company’s commitment to excellence.
    </p>
  `;

  return (
    <div className="App">
      <header className="App-header">
        <Main data={data} stopSlideshow={showModal} /> {/* Pass showModal as stopSlideshow */}
      </header>
      <Footer
        handleToggleModal={handleToggleModal}
        data={data}
        sidebarActive={showModal}
      />
      {showModal && (
        <SideBar handleToggleModal={handleToggleModal} content={bmwInfo} />
      )}
    </div>
  );
}

export default App;
