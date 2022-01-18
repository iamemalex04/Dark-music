import React, { useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[1]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        console.log(animation);

        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
            animationPercentage: animation,
        });
    };
    const songEndHandler = async () => {
        let currentSongIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
    };
    return (
        <div className={`App ${libraryStatus ? "islibrary-active" : ""}`}>
            <Nav
                setLibraryStatus={setLibraryStatus}
                libraryStatus={libraryStatus}
            />
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                currentSong={currentSong}
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
