import React from "react";

export default function LibrarySong({
    song,
    songs,
    setCurrentSong,
    audioRef,
    isPlaying,
    id,
    setSongs,
}) {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        const selectedSong = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(selectedSong);
        audioRef.current.play();

        if (isPlaying) audioRef.current.play();
    };
    return (
        <div
            onClick={songSelectHandler}
            className={`library-song ${song.active ? "selected" : ""} `}
        >
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}
