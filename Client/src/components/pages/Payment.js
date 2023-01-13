import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";

function Payment() {
  // const [isPlaying, setIsPlaying] = useState(false);

  // const handlePlay = () => {
  //   setIsPlaying(true);
  // };

  return (
    <div className="hero-container">
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
      <h1>Proceed with your Payment</h1>
      <p>සල්ලි දීලා පලයන්</p>
      <div className="hero-btns">
        <>
          <Link to="/">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              Pay
            </Button>
          </Link>

          {/* {isPlaying && (
            <iframe
              src="https://www.youtube.com/embed/2g811Eo7K8U"
              onLoad={() => {
                this.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  "*"
                );
              }}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          )} */}
        </>
      </div>
    </div>
  );
}

export default Payment;
