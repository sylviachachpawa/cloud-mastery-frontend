export const AreaChartSkeleton = () => (
  <div className="w-full h-[260px] relative overflow-hidden rounded-md bg-white">
    <svg className="absolute top-0 left-0 w-full h-full animate-pulse">
      <line x1="10" y1="220" x2="95%" y2="220" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="10" y1="20" x2="15" y2="20" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="10" y1="80" x2="15" y2="80" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="10" y1="140" x2="15" y2="140" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="10" y1="200" x2="15" y2="200" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="30" y1="215" x2="30" y2="220" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="70" y1="215" x2="70" y2="220" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="110" y1="215" x2="110" y2="220" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="150" y1="215" x2="150" y2="220" stroke="#dcdcdc" strokeWidth="1" />
      <line x1="190" y1="215" x2="190" y2="220" stroke="#dcdcdc" strokeWidth="1" />
      <path
        d="M10,20 C 40,60 60,30 90,80 120,50 150,90 180,60 200,100 L 200,220 L 10,220 Z"
        fill="#f0f0f0"
        opacity="0.7"
      />
      <path
        d="M10,20 C 40,60 60,30 90,80 120,50 150,90 180,60 200,100"
        fill="none"
        stroke="#dcdcdc"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  </div>
);