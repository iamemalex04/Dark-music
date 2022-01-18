import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
    songs,
    setCurrentSong,
    audioRef,
    isPlaying,
    currentSong,
    setSongs,
    libraryStatus,
}) {
    return (
        <div>
            <div
                className={`library ${
                    libraryStatus === true ? "library-active" : ""
                }`}
            >
                <h2 className="lib-text">Library</h2>
                <div className="library-songs">
                    {songs.map((song) => (
                        <LibrarySong
                            songs={songs}
                            song={song}
                            key={song.id}
                            id={song.id}
                            setCurrentSong={setCurrentSong}
                            audioRef={audioRef}
                            isPlaying={isPlaying}
                            currentSong={currentSong}
                            setSongs={setSongs}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
