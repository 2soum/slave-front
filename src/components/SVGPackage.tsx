const BackgroundSVG = () => {
    const fullGlowFilter = () => (
      <>
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="14.985"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="29.97"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="104.895"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="209.79"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect3_dropShadow" result="effect4_dropShadow"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="359.64"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect4_dropShadow" result="effect5_dropShadow"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="629.37"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect5_dropShadow" result="effect6_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow" result="shape"/>
      </>
    );
  
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Sourcil gauche */}
          <div className="absolute -left-4">
            <svg 
              width="1440" 
              height="1024" 
              viewBox="0 0 1440 1024" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dddddd_39_66)">
                <path 
                  d="M425 257L647 317" 
                  stroke="#0066FF" 
                  strokeWidth="30" 
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <filter 
                  id="filter0_dddddd_39_66" 
                  x="-848.744" 
                  y="-1016.74" 
                  width="2769.49" 
                  height="2607.49" 
                  filterUnits="userSpaceOnUse" 
                  colorInterpolationFilters="sRGB"
                >
                  {fullGlowFilter()}
                </filter>
              </defs>
            </svg>
          </div>
  
          {/* Sourcil droit */}
          <div className="absolute right-4">
            <svg 
              width="1440" 
              height="1024" 
              viewBox="0 0 1440 1024" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dddddd_39_67)">
                <line 
                  x1="797.592" 
                  y1="313.62" 
                  x2="1047.62" 
                  y2="246.408" 
                  stroke="#0066FF" 
                  strokeWidth="30" 
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <filter 
                  id="filter0_dddddd_39_67" 
                  x="-476.152" 
                  y="-1027.34" 
                  width="2797.52" 
                  height="2614.7" 
                  filterUnits="userSpaceOnUse" 
                  colorInterpolationFilters="sRGB"
                >
                  {fullGlowFilter()}
                </filter>
              </defs>
            </svg>
          </div>
  
          {/* Les yeux (infinity shape) */}
          <svg 
            width="1440" 
            height="1024" 
            viewBox="0 0 1440 1024" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_dddddd_39_50)">
              <path 
                d="M499.818 556C405.455 556 374 505.75 374 455.5C374 405.25 405.455 355 499.818 355C625.636 355 814.365 556 940.181 556C1034.55 556 1066 505.75 1066 455.5C1066 405.25 1034.55 355 940.181 355C814.365 355 625.636 556 499.818 556Z" 
                stroke="#0066FF" 
                strokeWidth="30" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <filter 
                id="filter0_dddddd_39_50" 
                x="-899.74" 
                y="-918.74" 
                width="3239.48" 
                height="2748.48" 
                filterUnits="userSpaceOnUse" 
                colorInterpolationFilters="sRGB"
              >
                {fullGlowFilter()}
              </filter>
            </defs>
          </svg>
  
          {/* Sourire */}
          <div className="absolute top-2">
            <svg 
              width="1440" 
              height="1024" 
              viewBox="0 0 1440 1024" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dddddd_39_55)">
                <path 
                  d="M460 662C550 723.167 779.8 808.8 979 662" 
                  stroke="#0066FF" 
                  strokeWidth="27" 
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <filter 
                  id="filter0_dddddd_39_55" 
                  x="-812.241" 
                  y="-610.241" 
                  width="3063.48" 
                  height="2625.56" 
                  filterUnits="userSpaceOnUse" 
                  colorInterpolationFilters="sRGB"
                >
                  {fullGlowFilter()}
                </filter>
              </defs>
            </svg>
          </div>
        </div>
  
        {/* Particules d'arrière-plan */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/5 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    );
  };
  
  export default BackgroundSVG;