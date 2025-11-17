
// Tạo một AudioContext duy nhất để sử dụng lại
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.error("Web Audio API is not supported in this browser.", e);
      return null;
    }
  }
  return audioContext;
};

export const playAudioFromBase64 = async (base64String: string): Promise<void> => {
  const context = getAudioContext();
  if (!context) return;

  // Tiếp tục context nếu nó bị tạm dừng (do chính sách tự động phát của trình duyệt)
  if (context.state === 'suspended') {
    await context.resume();
  }

  try {
    // Tách phần đầu của chuỗi data URL
    const base64Data = base64String.split(',')[1];
    const response = await fetch(`data:audio/wav;base64,${base64Data}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(0);
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};
