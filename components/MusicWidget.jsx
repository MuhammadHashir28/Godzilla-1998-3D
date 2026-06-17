import { useEffect, useState } from "react";

export default function MusicWidget() {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const START = 40;
  const END = 230;

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const wait = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(wait);

        const player1 = new window.YT.Player("yt1", {
          height: "0",
          width: "0",
          videoId: "HsaQMepe8OY",
          events: {
            onReady: (event) => {
              const player = event.target;
              setP1(player);

              // AUTO TRY PLAY
              setTimeout(() => {
                try {
                  player.seekTo(START, true);
                  player.playVideo();
                  setIsPlaying(true);
                } catch (e) {
                  console.log("P1 autoplay blocked");
                }
              }, 500);
            },
          },
        });

        const player2 = new window.YT.Player("yt2", {
          height: "0",
          width: "0",
          videoId: "VSsHxLxp9Hw",
          events: {
            onReady: (event) => {
              const player = event.target;
              setP2(player);

              // AUTO TRY PLAY
              setTimeout(() => {
                try {
                  player.seekTo(0, true);
                  player.playVideo();
                  setIsPlaying(true);
                } catch (e) {
                  console.log("P2 autoplay blocked");
                }
              }, 500);
            },
          },
        });
      }
    }, 300);

    return () => clearInterval(wait);
  }, []);

  const toggleAll = () => {
    if (!p1 || !p2) return;

    if (isPlaying) {
      p1.pauseVideo();
      p2.pauseVideo();
      setIsPlaying(false);
    } else {
      p1.seekTo(START, true);
      p2.seekTo(0, true);

      p1.playVideo();
      p2.playVideo();

      setIsPlaying(true);
    }
  };

  // loop first track only
  useEffect(() => {
    if (!p1 || !isPlaying) return;

    const interval = setInterval(() => {
      const t = p1.getCurrentTime();

      if (t >= END) {
        p1.seekTo(START, true);
        p1.playVideo();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [p1, isPlaying]);

  return (
    <>
      {/* hidden players */}
      <div id="yt1" />
      <div id="yt2" />

      {/* button */}
      <button className="music-btn" onClick={toggleAll}>
      <i className={isPlaying ? "ri-volume-up-fill" : "ri-volume-mute-fill"} />      </button>
    </>
  );
}