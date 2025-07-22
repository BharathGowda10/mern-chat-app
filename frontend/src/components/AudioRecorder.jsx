import { useRef, useState } from "react";
import { Mic } from "lucide-react";

const AudioRecorder = ({ onTranscribe }) => {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecognition = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscribe(transcript);
    };
    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
    };
    recognition.onend = () => {
      setRecording(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        className={`p-2 rounded-full transition-colors duration-200 ${
          recording
            ? "bg-red-500 text-white scale-110"
            : "bg-gray-200 text-gray-700"
        }`}
        title={recording ? "Recording..." : "Hold to record"}
        onMouseDown={startRecognition}
        onMouseUp={stopRecognition}
        onTouchStart={startRecognition}
        onTouchEnd={stopRecognition}
      >
        <Mic size={22} />
      </button>
      {recording && (
        <span className="absolute left-full ml-2 text-xs text-red-500 animate-pulse">
          Listening...
        </span>
      )}
    </div>
  );
};

export default AudioRecorder;
