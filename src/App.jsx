import "./App.css";
import { useEffect, useState } from "react";

const soundGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function DrumKey({ playAudio, sound: { key, url, id, keyCode } }) {
  const [buttonStyle, setButtonStyle] = useState({});

  const handleKeyDown = (event) => {
    if (event.keyCode === keyCode) {
      playAudio(key, id);
      setButtonStyle({
        backgroundColor: "#ffc700", // Updated to a bright color
        transform: "translateY(-3px)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      });
    }
  };

  const handleKeyUp = () => {
    setButtonStyle({});
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <button
      className="drum-pad"
      id={id}
      onClick={() => playAudio(key, id)}
      style={buttonStyle}
    >
      <audio className="clip" src={url} id={key} />
      {key}
    </button>
  );
}

function DrumMachine({ playAudio }) {
  return soundGroup.map((sound) => (
    <DrumKey key={sound.id} playAudio={playAudio} sound={sound} />
  ));
}

function App() {
  const [displayText, setdisplayText] = useState("");
  const playAudio = (key, id) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    setdisplayText(id);
  };
  return (
    <div className="App">
      <div id="drum-machine">
        <p id="display">{displayText || "\u00A0"}</p>
        <div className="drum-pad-wrapper">
          <DrumMachine playAudio={playAudio} />
        </div>
      </div>
    </div>
  );
}

export default App;
