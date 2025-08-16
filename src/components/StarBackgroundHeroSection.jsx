import { useEffect, useState } from "react";

export const StarBackgroundHeroSection = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  // Tunables
  const STARS_AREA_PER_STAR = 10000; // bigger = fewer stars
  const STAR_SIZE_MIN = 1.2;
  const STAR_SIZE_MAX = 4.0;
  const STAR_ANIM_MIN = 3;
  const STAR_ANIM_MAX = 7;
  const MIN_STAR_SPACING_PX = 12; // natural, non-grid spacing

  const METEOR_COUNT = 8; // more meteors
  const METEOR_SIZE_MIN = 1;
  const METEOR_SIZE_MAX = 3;
  const METEOR_WIDTH_MULT = 80; // px per size unit
  const METEOR_HEIGHT_MULT = 2;
  const METEOR_DURATION_MIN = 4;
  const METEOR_DURATION_MAX = 7;
  const METEOR_MAX_DELAY = 14; // used as negative delay to desync

  useEffect(() => {
    const regenerate = () => {
      generateStars();
      generateMeteors();
    };
    regenerate();
    window.addEventListener("resize", regenerate);
    return () => window.removeEventListener("resize", regenerate);
  }, []);

  const rand = (min, max) => min + Math.random() * (max - min);

  // Natural (poisson-ish) star placement: random with a minimum distance
  const generateStars = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const target = Math.max(25, Math.floor((w * h) / STARS_AREA_PER_STAR));

    const placed = [];
    const triesLimit = target * 25; // safety to avoid long loops
    let tries = 0;

    while (placed.length < target && tries < triesLimit) {
      tries++;
      const px = Math.random() * w;
      const py = Math.random() * h;

      let ok = true;
      for (let i = 0; i < placed.length; i++) {
        const dx = px - placed[i].px;
        const dy = py - placed[i].py;
        if (dx * dx + dy * dy < MIN_STAR_SPACING_PX * MIN_STAR_SPACING_PX) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      placed.push({
        id: placed.length,
        px,
        py,
        size: rand(STAR_SIZE_MIN, STAR_SIZE_MAX),
        opacity: rand(0.5, 1),
        animationDuration: rand(STAR_ANIM_MIN, STAR_ANIM_MAX),
      });
    }

    setStars(
      placed.map((s) => ({
        id: s.id,
        size: s.size,
        x: (s.px / w) * 100, // %
        y: (s.py / h) * 100, // %
        opacity: s.opacity,
        animationDuration: s.animationDuration,
      }))
    );
  };

  const generateMeteors = () => {
    const list = [];
    for (let i = 0; i < METEOR_COUNT; i++) {
      list.push({
        id: i,
        size: rand(METEOR_SIZE_MIN, METEOR_SIZE_MAX),
        x: Math.random() * 100,  // anywhere across width
        y: Math.random() * 100,  // anywhere across height (not just top)
        delay: rand(0, METEOR_MAX_DELAY),
        animationDuration: rand(METEOR_DURATION_MIN, METEOR_DURATION_MAX),
      });
    }
    setMeteors(list);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-r from-card via-about to-about-primary">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * METEOR_WIDTH_MULT}px`,
            height: `${Math.max(2, meteor.size * METEOR_HEIGHT_MULT)}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            // negative delay = start mid-animation -> no "stuck" meteors
            animationDelay: `-${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};