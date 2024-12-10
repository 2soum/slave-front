import React, { useState, useEffect } from 'react';

interface SVGFilterProps {
  id: string;
  color: string;
  intensity: number;
}

const FullGlowFilter: React.FC<SVGFilterProps> = ({ color, intensity }): JSX.Element => {
  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  };
  
  const [r, g, b] = hex2rgb(color);
  
  return (
    <>
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation={14.985 * intensity}/>
      <feColorMatrix type="matrix" values={`0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 1 0`}/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation={29.97 * intensity}/>
      <feColorMatrix type="matrix" values={`0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 1 0`}/>
      <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation={104.895 * intensity}/>
      <feColorMatrix type="matrix" values={`0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 1 0`}/>
      <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape"/>
    </>
  );
};

interface BackgroundSVGProps {
  color?: string;
  baseIntensity?: number;
}

type MoodState = 'happy' | 'neutral' | 'sad';

const BackgroundSVG: React.FC<BackgroundSVGProps> = ({ 
  color = '#0066FF',
  baseIntensity = 1
}): JSX.Element => {
  const [intensity, setIntensity] = useState(baseIntensity);
  const [isWinking, setIsWinking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [moodState, setMoodState] = useState<MoodState>('happy');
  
  // Configuration des yeux
  const openEyeLeft = "M474 450C474 500.25 505.45 550.5 599.82 550.5C662.73 550.5 741.36 500.25 820 450C741.36 399.75 662.73 349.5 599.82 349.5C505.45 349.5 474 399.75 474 450Z";
  const closedEyeLeft = "M474 450C474 450 505.45 450 599.82 450C662.73 450 741.36 450 820 450C741.36 450 662.73 450 599.82 450C505.45 450 474 450 474 450Z";
  
  const openEyeRight = "M820 450C820 500.25 788.55 550.5 694.18 550.5C631.27 550.5 552.64 500.25 474 450C552.64 399.75 631.27 349.5 694.18 349.5C788.55 349.5 820 399.75 820 450Z";
  const closedEyeRight = "M820 450C820 450 788.55 450 694.18 450C631.27 450 552.64 450 474 450C552.64 450 631.27 450 694.18 450C788.55 450 820 450 820 450Z";

  // Configuration des sourcils
  const normalBrowLeft = "M425 257L647 317";
  const winkBrowLeft = "M425 277L647 297";
  const normalBrowRight = "M797 314L1048 246";
  const winkBrowRight = "M797 294L1048 266";
  
  // Configuration du sourire
  const happySmile = "M460 662C550 723.167 779.8 808.8 979 662";
  const neutralSmile = "M460 712C550 712 779.8 712 979 712";
  const sadSmile = "M460 762C550 700.833 779.8 615.2 979 762";

  // Fonction pour obtenir une humeur aléatoire
  const getRandomMood = (): MoodState => {
    const moods: MoodState[] = ['happy', 'neutral', 'sad'];
    const randomIndex = Math.floor(Math.random() * moods.length);
    return moods[randomIndex];
  };

  useEffect(() => {
    // Animation de respiration
    const breathingAnimation = () => {
      const breathingCycle = (t: number) => {
        return baseIntensity * (1 + 0.6 * Math.sin(t));
      };

      let startTime = Date.now();
      
      const animate = () => {
        const t = (Date.now() - startTime) / 1000;
        setIntensity(breathingCycle(t));
        requestAnimationFrame(animate);
      };

      const animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    };

    const cleanup = breathingAnimation();
    return cleanup;
  }, [baseIntensity]);

  // Gestion des clignements
  useEffect(() => {
    const eyeAnimationInterval = setInterval(() => {
      const random = Math.random();
      
      if (random < 0.4) { // 40% de chance de cligner des deux yeux
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      } else if (random < 0.6) { // 10% supplémentaires de faire un clin d'œil
        setIsWinking(true);
        setTimeout(() => setIsWinking(false), 200);
      }
    }, 1000);

    return () => clearInterval(eyeAnimationInterval);
  }, []);

  // Changement d'humeur aléatoire
  useEffect(() => {
    const moodInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.6) { // 30% de chance de changer d'humeur
        const newMood = getRandomMood();
        if (newMood !== moodState) { // Change seulement si c'est une humeur différente
          setMoodState(newMood);
        }
      }
    }, 2000);

    return () => clearInterval(moodInterval);
  }, [moodState]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-20">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Sourcil gauche */}
        <div className="absolute -left-4 transition-transform duration-300">
          <svg
            width="1440"
            height="1024"
            viewBox="0 0 1440 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_dddddd_39_66)">
              <path
                d={isWinking ? winkBrowLeft : normalBrowLeft}
                stroke={color}
                strokeWidth="30"
                strokeLinecap="round"
                className="transition-all duration-300"
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
                <FullGlowFilter id="glow1" color={color} intensity={intensity} />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Sourcil droit */}
        <div className="absolute right-4 transition-transform duration-300">
          <svg
            width="1440"
            height="1024"
            viewBox="0 0 1440 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_dddddd_39_67)">
              <path
                d={isWinking ? winkBrowRight : normalBrowRight}
                stroke={color}
                strokeWidth="30"
                strokeLinecap="round"
                className="transition-all duration-300"
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
                <FullGlowFilter id="glow2" color={color} intensity={intensity} />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Yeux */}
        <svg
          width="1440"
          height="1024"
          viewBox="0 0 1440 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_dddddd_39_68)">
            <path
              d={isBlinking || isWinking ? closedEyeLeft : openEyeLeft}
              stroke={color}
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-100, 0)"
              className="transition-all duration-300"
            />
            <path
              d={isBlinking ? closedEyeRight : openEyeRight}
              stroke={color}
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(250, 0)"
              className="transition-all duration-300"
            />
          </g>
          <defs>
            <filter
              id="filter0_dddddd_39_68"
              x="-500"
              y="-650"
              width="2000"
              height="2000"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <FullGlowFilter id="glow3" color={color} intensity={intensity} />
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
                d={moodState === 'happy' ? happySmile : (moodState === 'neutral' ? neutralSmile : sadSmile)}
                stroke={color}
                strokeWidth="27"
                strokeLinecap="round"
                className="transition-all duration-500"
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
                <FullGlowFilter id="glow4" color={color} intensity={intensity} />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSVG;