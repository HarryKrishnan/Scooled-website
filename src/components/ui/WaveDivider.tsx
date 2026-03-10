interface WaveDividerProps {
  color?: string;
  flip?: boolean;
}

export default function WaveDivider({ color = "hsl(var(--background))", flip }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-[50px] md:h-[80px]">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}
