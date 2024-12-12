// src/components/VoiceSig.tsx
import React, { useState, useEffect, useRef } from 'react';
import { sendAudioToAPI } from '../service/apiService';

interface VisualizerOptions {
  smoothing: number;
  fft: number;
  minDecibels: number;
  scale: number;
  glow: number;
  color1: [number, number, number];
  color2: [number, number, number];
  color3: [number, number, number];
  fillOpacity: number;
  lineWidth: number;
  blend: GlobalCompositeOperation;
  shift: number;
  width: number;
  amp: number;
}

interface VoiceSigProps {
  updateColor: (newColor: string) => void;
  updateIntensity: (newIntensity: number) => void;
  updateApiResponseText: (newText: string) => void;
}

const VoiceSig: React.FC<VoiceSigProps> = ({ updateColor, updateIntensity, updateApiResponseText }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const freqsRef = useRef<Uint8Array | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);  // État pour savoir si l'audio est en lecture ou en pause
  const audioRef = useRef<HTMLAudioElement | null>(null);  // Référence pour l'élément audio



  const opts: VisualizerOptions = {
    smoothing: 0.8,
    fft: 8,
    minDecibels: -50,
    scale: 0.2,
    glow: 10,
    color1: [24, 137, 218],
    color2: [41, 200, 255],
    color3: [0, 102, 204],
    fillOpacity: 0.6,
    lineWidth: 1,
    blend: "screen",
    shift: 50,
    width: 60,
    amp: 1
  };

  const startRecording = async (): Promise<void> => {
    try {
      const context = new (window.AudioContext || window.AudioContext)();
      const analyserNode = context.createAnalyser();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const input = context.createMediaStreamSource(stream);
      input.connect(analyserNode);

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();

      setAudioContext(context);
      setAnalyser(analyserNode);
      freqsRef.current = new Uint8Array(analyserNode.frequencyBinCount);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = async (): Promise<void> => {
    setIsRecording(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContext && audioContext.state !== "closed") {
      audioContext.close();
      setAudioContext(null);
    }
    setAnalyser(null);
    freqsRef.current = null;

    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        audioChunks.current = []; // Reset the chunks
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        console.log("Audio recording stopped. Sending to API...");

        try {
          const response = await sendAudioToAPI(audioBlob);
          console.log("API response:", response);

          // Update color and intensity based on the response or any other logic
          updateColor(response.output); // Example color
          updateIntensity(1.5); // Example intensity
          updateApiResponseText(response.output); // Example API response text
        } catch (error) {
          console.error("Error sending audio to API:", error);
        }
      };
    }
  };

  const playAudio = (): void => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = (): void => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const visualize = (): void => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    analyser.smoothingTimeConstant = opts.smoothing;
    analyser.fftSize = 512;
    analyser.minDecibels = opts.minDecibels;

    if (freqsRef.current) {
      analyser.getByteFrequencyData(freqsRef.current);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 6; i++) {
      drawPath(ctx, i);
    }

    animationFrameRef.current = requestAnimationFrame(visualize);
  };

  const drawPath = (ctx: CanvasRenderingContext2D, channel: number): void => {
    const color = opts[`color${(channel % 3) + 1}` as keyof Pick<VisualizerOptions, 'color1' | 'color2' | 'color3'>].map(Math.floor);
    ctx.fillStyle = `rgba(${color}, ${opts.fillOpacity})`;
    ctx.strokeStyle = ctx.shadowColor = `rgb(${color})`;
    ctx.lineWidth = opts.lineWidth;
    ctx.shadowBlur = opts.glow;
    ctx.globalCompositeOperation = opts.blend;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const m = canvas.height / 2;
    const offset = (canvas.width - 15 * opts.width) / 2;
    const x: number[] = Array.from(Array(15).keys()).map(i => offset + channel * opts.shift + i * opts.width);
    const y: number[] = Array.from(Array(5).keys()).map(i => Math.max(0, m - scale(i) * freq(channel, i)));
    const h = 2 * m;

    ctx.beginPath();
    ctx.moveTo(0, m);
    ctx.lineTo(x[0], m + 1);
    ctx.bezierCurveTo(x[1], m + 1, x[2], y[0], x[3], y[0]);
    ctx.bezierCurveTo(x[4], y[0], x[4], y[1], x[5], y[1]);
    ctx.bezierCurveTo(x[6], y[1], x[6], y[2], x[7], y[2]);
    ctx.bezierCurveTo(x[8], y[2], x[8], y[3], x[9], y[3]);
    ctx.bezierCurveTo(x[10], y[3], x[10], y[4], x[11], y[4]);
    ctx.bezierCurveTo(x[12], y[4], x[12], m, x[13], m);
    ctx.lineTo(1000, m + 1);
    ctx.lineTo(x[13], m - 1);
    ctx.bezierCurveTo(x[12], m, x[12], h - y[4], x[11], h - y[4]);
    ctx.bezierCurveTo(x[10], h - y[4], x[10], h - y[3], x[9], h - y[3]);
    ctx.bezierCurveTo(x[8], h - y[3], x[8], h - y[2], x[7], h - y[2]);
    ctx.bezierCurveTo(x[6], h - y[2], x[6], h - y[1], x[5], h - y[1]);
    ctx.bezierCurveTo(x[4], h - y[1], x[4], h - y[0], x[3], h - y[0]);
    ctx.bezierCurveTo(x[2], h - y[0], x[1], m, x[0], m);
    ctx.lineTo(0, m);
    ctx.fill();
    ctx.stroke();
  };

  const freq = (channel: number, i: number): number => {
    const band = (channel * 5 + i * 6);
    return freqsRef.current?.[band] || 0;
  };

  const scale = (i: number): number => {
    const x = Math.abs(2 - i);
    const s = 3 - x;
    return (s / 3) * opts.amp;
  };

  useEffect(() => {
    if (isRecording && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 150;
      visualize();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, [isRecording]);

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 flex justify-center pb-8">
      <div className="flex justify-center items-center">
        {!isRecording ? (
            <div className="relative group">
              <button
                  onClick={startRecording}
                  className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
              <span
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>
                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1">
                    Start Recording
                  </span>
                  <svg
                      className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        clipRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
              </button>
            </div>
        ) : (
            <div className="relative group">
              <button
                  onClick={stopRecording}
                  className="relative inline-block p-px font-semibold leading-6 text-white bg-red-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
              <span
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>
                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1">
                    Stop Recording
                  </span>
                  <svg
                      className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        clipRule="evenodd"
                        d="M5 5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75h-8.5A.75.75 0 0 1 5 13.5V5Z"
                        fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
              </button>
              <canvas ref={canvasRef} className="w-64 h-32"/>
            </div>
        )}
        <div>
          <div
              className="fixed bottom-6 left-6 flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-300 transition-all duration-300">
            <button onClick={toggleAudio} className="w-full h-full flex items-center justify-center">
              {/* Affichage de l'icône */}
              <svg
                  className="w-7 h-7 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
              >
                {isPlaying ? (
                    // Icône Pause (deux barres)
                    <path d="M6 4H8V16H6zM12 4H14V16H12z"/>
                ) : (
                    // Icône Play (triangle)
                    <path d="M6 4.5V15.5a.5.5 0 0 0 .75.43l8.75-5.75a.5.5 0 0 0 0-.86L6.75 4.07A.5.5 0 0 0 6 4.5z"/>
                )}
              </svg>
            </button>
          </div>
        </div>
        {/*{audioURL && (*/}
        {/*    <button*/}
        {/*        onClick={playAudio}*/}
        {/*        className="fixed bottom-8 left-8 flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-300 transition-all duration-300"*/}
        {/*    >*/}
        {/*      <svg*/}
        {/*          className="w-10 h-10 text-white"*/}
        {/*          xmlns="http://www.w3.org/2000/svg"*/}
        {/*          viewBox="0 0 20 20"*/}
        {/*          fill="currentColor"*/}
        {/*          aria-hidden="true"*/}
        {/*      >*/}
        {/*        <path*/}
        {/*            d="M6 4.5V15.5a.5.5 0 0 0 .75.43l8.75-5.75a.5.5 0 0 0 0-.86L6.75 4.07A.5.5 0 0 0 6 4.5z"*/}
        {/*        />*/}
        {/*      </svg>*/}
        {/*    </button>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default VoiceSig;
