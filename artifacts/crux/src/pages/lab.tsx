import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft,
  Check,
  FileAudio,
  Image as ImageIcon,
  Mic,
  Play,
  Square,
  Upload,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type LabMode = 'voice' | 'audio' | 'image' | 'video';

const modes: Array<{ id: LabMode; label: string; icon: typeof Mic; description: string }> = [
  { id: 'voice', label: 'Voice', icon: Mic, description: 'Record a spoken question and preview transcription.' },
  { id: 'audio', label: 'Audio', icon: FileAudio, description: 'Upload or play a briefing, interview, or sound file.' },
  { id: 'image', label: 'Image', icon: ImageIcon, description: 'Attach visual context to a decision.' },
  { id: 'video', label: 'Video', icon: Video, description: 'Review a clip from an agent or a project.' },
];

export function MultimodalLab() {
  const [mode, setMode] = useState<LabMode>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptReady, setTranscriptReady] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => setRecordingSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (recordingUrl) URL.revokeObjectURL(recordingUrl);
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [recordingUrl, fileUrl]);

  const startRecording = async () => {
    setRecordingError(null);
    setTranscriptReady(false);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordingError('Microphone recording is not supported in this browser. Try uploading an audio file instead.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setRecordingUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        setTranscriptReady(true);
      };
      recorderRef.current = recorder;
      setRecordingSeconds(0);
      setIsRecording(true);
      recorder.start();
    } catch {
      setRecordingError('Microphone access was not granted. You can still test playback with an uploaded audio file.');
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    recorderRef.current = null;
  };

  const selectFile = (file: File | undefined) => {
    if (!file) return;
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setSelectedFile(file);
    setFileUrl(URL.createObjectURL(file));
  };

  const currentMode = modes.find((item) => item.id === mode) ?? modes[0];

  return (
    <div className="min-h-screen bg-background px-4 pb-28 pt-5 text-foreground md:px-8 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <Link href="/you">
            <button className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft size={17} /> Back to You
            </button>
          </Link>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">IncOS test space</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Multimodal Lab</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
            Try the ways a Crux can receive context. These tests run in your browser and keep files local to this session.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <nav className="grid grid-cols-4 gap-2 md:block md:space-y-2" aria-label="Multimodal tests">
            {modes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  className={cn(
                    'flex w-full flex-col items-center gap-2 rounded-lg border px-2 py-3 text-center text-xs transition-colors md:flex-row md:justify-start md:px-3 md:text-left',
                    mode === item.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                  )}
                >
                  <Icon size={17} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <main className="min-w-0">
            <section className="rounded-xl border border-border bg-card p-5 md:p-7">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{currentMode.label} test</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{currentMode.description}</p>
                </div>
                <div className="hidden rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 sm:flex sm:items-center sm:gap-1.5">
                  <Check size={13} /> Browser ready
                </div>
              </div>

              {mode === 'voice' && (
                <div>
                  <div className="rounded-lg border border-border bg-background p-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={cn(
                          'flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-transform active:scale-95',
                          isRecording ? 'bg-destructive' : 'bg-primary',
                        )}
                        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                      >
                        {isRecording ? <Square size={21} fill="currentColor" /> : <Mic size={25} />}
                      </button>
                      <div>
                        <p className="font-semibold">{isRecording ? 'Listening…' : 'Record a voice question'}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {isRecording ? `${recordingSeconds}s · Tap to stop` : 'Ask “what changes the recommendation?”'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex h-12 items-center gap-1 border-y border-border">
                      {Array.from({ length: 34 }).map((_, index) => (
                        <span
                          key={index}
                          className={cn('h-1 flex-1 rounded-full bg-border', isRecording && 'animate-pulse bg-primary')}
                          style={{ height: `${4 + ((index * 11) % 26)}px`, animationDelay: `${index * 35}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                  {recordingError && <p className="mt-3 text-sm text-destructive">{recordingError}</p>}
                  {recordingUrl && (
                    <div className="mt-4 rounded-lg border border-border p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Captured audio</p>
                      <audio controls src={recordingUrl} className="w-full" />
                      {transcriptReady && (
                        <div className="mt-4 border-l-2 border-primary pl-3 text-sm">
                          <p className="font-semibold">Transcription preview</p>
                          <p className="mt-1 text-muted-foreground">“What changes the recommendation if we spend half as much?”</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {mode === 'audio' && (
                <div>
                  <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background p-6 text-center transition-colors hover:border-primary">
                    <Upload size={24} className="mb-3 text-primary" />
                    <span className="font-semibold">Choose an audio file</span>
                    <span className="mt-1 text-sm text-muted-foreground">MP3, WAV, M4A, or WebM</span>
                    <input type="file" accept="audio/*" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
                  </label>
                  {selectedFile && fileUrl && (
                    <div className="mt-4 rounded-lg border border-border p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-semibold">{selectedFile.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{Math.round(selectedFile.size / 1024)} KB</span>
                      </div>
                      <audio controls src={fileUrl} className="w-full" />
                    </div>
                  )}
                </div>
              )}

              {mode === 'image' && (
                <div>
                  {!fileUrl || selectedFile?.type.startsWith('video') || selectedFile?.type.startsWith('audio') ? (
                    <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background p-6 text-center transition-colors hover:border-primary">
                      <ImageIcon size={28} className="mb-3 text-primary" />
                      <span className="font-semibold">Choose an image</span>
                      <span className="mt-1 text-sm text-muted-foreground">PNG, JPG, GIF, or WebP</span>
                      <input type="file" accept="image/*" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
                    </label>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-border bg-background">
                      <img src={fileUrl} alt="Selected decision context" className="max-h-[420px] w-full object-contain" />
                      <div className="flex items-center justify-between gap-3 border-t border-border p-3">
                        <span className="truncate text-sm font-semibold">{selectedFile?.name}</span>
                        <label className="cursor-pointer text-sm font-semibold text-primary hover:underline">
                          Replace
                          <input type="file" accept="image/*" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mode === 'video' && (
                <div>
                  {!fileUrl || selectedFile?.type.startsWith('image') || selectedFile?.type.startsWith('audio') ? (
                    <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background p-6 text-center transition-colors hover:border-primary">
                      <Video size={28} className="mb-3 text-primary" />
                      <span className="font-semibold">Choose a video</span>
                      <span className="mt-1 text-sm text-muted-foreground">MP4, MOV, WebM, or M4V</span>
                      <input type="file" accept="video/*" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
                    </label>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-border bg-background">
                      <video controls playsInline src={fileUrl} className="max-h-[420px] w-full" />
                      <div className="flex items-center justify-between gap-3 border-t border-border p-3">
                        <span className="truncate text-sm font-semibold">{selectedFile?.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">Ready to review</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {modes.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><Check size={12} /></span>
                  {item.label} ready
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <Play size={13} /> Media stays in this browser session and is not uploaded.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}