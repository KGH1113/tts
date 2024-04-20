import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  function populateVoiceList() {
    const availableVoices = window.speechSynthesis.getVoices();
    const koVoices = availableVoices.filter((voice) =>
      voice.lang.includes("ko")
    );
    setVoices(koVoices);
  }

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
  }, []);

  function startTTS() {
    if (!selectedVoice) {
      alert("목소리를 선택해주세요.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <>
      <header
        style={{
          height: "10%",
          width: "100%",
          borderBottom: "solid 1px hsl(217.2 32.6% 17.5%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        TTS Program
      </header>
      <main
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.8em",
          }}
        >
          <div
            style={{
              gap: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label
              style={{
                color: "white",
                fontSize: "1.2rem",
                width: "20rem",
              }}
            >
              Input Text for TTS
            </label>
            <textarea
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "1rem",
                width: "40rem",
                height: "20rem",
                padding: "1.5rem",
                borderRadius: "1rem"
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label
              style={{
                color: "white",
                fontSize: "1.2rem",
                width: "20rem",
              }}
            >
              Select Voice
            </label>
            <select
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
                width: "100%",
              }}
              value={selectedVoice ? selectedVoice.name : ""}
              onChange={(e) =>
                setSelectedVoice(
                  voices.find((voice) => voice.name === e.target.value)
                )
              }
            >
              <option value="">목소리 선택</option>
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", width: "100%", gap: "0.8rem" }}>
            <button
              className="tts-start"
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginTop: "1.5rem",
                width: "50%",
              }}
              onClick={() => startTTS()}
            >
              Start
            </button>
            <button
              className="tts-stop"
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginTop: "1.5rem",
                width: "50%",
              }}
              onClick={() => window.speechSynthesis.cancel()}
            >
              Stop
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
