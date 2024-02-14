import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import MagicMouse from 'magic-mouse'
function App() {
  const standart = {
    cursor: "auto",
  };
  const custom = {
    cursor:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill-opacity="0.4" /></svg>\'), auto',
  };

  

  const [button, setButton] = useState(false);
  const [cursor, setReverse] = useState(standart);
  const [YMaps, setYMaps] = useState(<div />);
  const map = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const ymaps3 = window.ymaps3;
        const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
        const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
          reactify.module(ymaps3);
        console.log(ymaps3);

        setYMaps(() => (
          <YMap
            location={{
              center: [37.623082, 55.75254],
              zoom: 9,
            }}
            camera={{ tilt: 0, azimuth: 0, duration: 0 }}
            instanceRef={map}
          >
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
          </YMap>
        ));
      } catch (e) {
        setYMaps(<div />);
      }
    })();
  }, []);

  const reverseHandler = () => {
    if (cursor.cursor === "auto") {
      setReverse(custom);
    } else {
      setReverse(standart);
    }
  };

  return (
    <>
      {!button ? (
        <>
          <button
            className="absolute-button"
            onClick={() => setButton(!button)}
          >
            Show Button on Map
          </button>
          <div
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            {YMaps}
          </div>
        </>
      ) : (
        <>
          <button
            className="absolute-button"
            onClick={() => setButton(!button)}
          >
            Show Button on Map
          </button>
          <div className="twoMaps">
            <div
              style={{
                width: "50vw",
                height: "100vh",
                ...cursor,
              }}
            >
              {YMaps}
            </div>
            <button className="reverse-cursor" onClick={reverseHandler}>
              Cursor
            </button>
            <div
              style={{
                width: "50vw",
                height: "100vh",
                ...cursor,
              }}
            >
              {YMaps}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
