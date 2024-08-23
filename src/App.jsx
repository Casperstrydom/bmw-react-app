import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Main from "./components/Main";

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
        setIsLoading(false); // No need to display loader if data is cached
        console.log('Fetched from cache today');
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
            hdurl: "https://i.pinimg.com/originals/f4/d0/92/f4d0926b86f2c466e4ca6ef4ef199ddc.jpg",
            hdurl2: "https://wallpapers.com/images/hd/bmw-logo-pictures-1vpyk0cc3rcxcuyk.jpg",
          };

          localStorage.setItem(localKey, JSON.stringify(apiData));
          setData(apiData);
          console.log('Fetched from API today');
        } else {
          setData(null);
        }
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAPIData();
  }, []);

  const bmwInfo = `
    <p>
     <h2>${data?.title}</h2> 
     <p><strong>The central part of the BMW logo symbolises the rotating blades of an airplane which depicts company's early history of aviation technology.</strong></p>
    
     <hr/>
      <strong>BMW offers amazing driving performance with high-powered engines and a sleek look.</strong> 
      With ultra-responsive steering and even weight distribution, you can zoom these cars through tight turns. 
      What's even better is how great they look. BMW, in full Bayerische Motoren Werke AG, is a German automaker 
      noted for quality sports sedans and motorcycles. Headquarters are in Munich.
      <strong>It originated in 1916 as Bayerische Flugzeug-Werke,</strong> a builder of aircraft engines, but assumed 
      the name Bayerische Motoren Werke in July 1917 and began producing motorcycles in the 1920s. BMW entered the automobile 
      business in 1928. The company’s R32 motorcycle set a world speed record that was not broken until 1937. During World War II, 
      BMW built the world’s first jet airplane engines, used by the Luftwaffe, Germany’s air force. After the war, the company tried 
      to move into the small-car market but found that it could not compete effectively against Volkswagen’s compact, inexpensive autos. 
      By 1959 the company was on the verge of bankruptcy, and its managers were planning to sell the firm to Daimler-Benz.
      <strong>In that year, however, BMW pulled out of its financial slump;</strong> German entrepreneur Herbert Quandt acquired a controlling 
      interest in the firm, and BMW introduced its 700 series, soon followed by the equally successful 1500 model. At about the same time, 
      the company introduced a new series of motorcycles that were particularly popular in the United States.
      <strong>BMW was firmly established as a premium automobile brand by the end of the 20th century.</strong>
    </p> <hr/>
    <p>BMW THANK'S ALL OUR SPONSORS CLIENTS RETAILERS ENGINEERS FAN BASE GLOBAL.</p>
  `;

  return (
    <>
      {isLoading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear fa-spin"></i>
        </div>
      ) : (
        <>
          {data ? (
            <Main data={data} />
          ) : (
            <div className="loadingState">
              <i className="fa-solid fa-gear fa-spin"></i>
            </div>
          )}
          {showModal && <SideBar content={bmwInfo} handleToggleModal={handleToggleModal} />}
          {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
          {error && <p>Error: {error}</p>}
        </>
      )}
    </>
  );
}

export default App;
