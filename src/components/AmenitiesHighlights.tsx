import React, { useRef, useEffect, useState } from "react";
import {
  Landmark,
  PersonStanding,
  Trees,
  Building2,
  Dumbbell,
  Flower2,
  Sparkles,
  Baby,
  Route,
  Car,
  Mountain,
  Sun,
  Bike,
  Sprout,
  Trophy,
  Building,
  HeartPulse,
  Footprints,
  Waves,
  TreePine,
  Laptop,
  Plane,
  PlaneLanding,
  ShoppingBag,
  MapPin,
} from "lucide-react";

const amenities = [
  { icon: Landmark, label: "Mosque" },
  { icon: PersonStanding, label: "Yoga and Pilates Pavilion" },
  { icon: Trees, label: "Forest-Themed Parks" },
  { icon: Building2, label: "Clubhouse" },
  { icon: Dumbbell, label: "Outdoor Calisthenics Zone" },
  { icon: Flower2, label: "Botanical Gardens" },
  { icon: Sparkles, label: "Meditation Sanctuaries" },
  { icon: Baby, label: "Nature-Based Children's Play Areas" },
  { icon: Route, label: "Jogging & Cycling Forest Loops" },
  { icon: Car, label: "Smart Mobility Hubs" },
  { icon: Mountain, label: "Adventure Walk" },
  { icon: Sun, label: "Yoga Zone & Meditation Deck" },
  { icon: Bike, label: "Cycling Networks" },
  { icon: Sprout, label: "Community Garden" },
  { icon: Trophy, label: "Sports Court" },
  { icon: Building, label: "Massive Clubhouse" },
  { icon: HeartPulse, label: "Fitness & Wellness Decks" },
  { icon: Landmark, label: "Community Pavilion" },
  { icon: Footprints, label: "Jogging Loop" },
  { icon: Waves, label: "Beach Lagoon" },
  { icon: TreePine, label: "Forest Play Park" },
  { icon: Laptop, label: "Co-working Space" },
];

const travelTimes = [
  { icon: Trophy, label: "Dubai Rugby Sevens", minutes: "5" },
  { icon: ShoppingBag, label: "Dubai Outlet Mall", minutes: "8" },
  { icon: Building, label: "Downtown Dubai", minutes: "30" },
  { icon: Plane, label: "Dubai International Airport", minutes: "35" },
  { icon: PlaneLanding, label: "Al Maktoum International Airport", minutes: "30" },
];

const AmenitiesHighlights: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [durations, setDurations] = useState<{ row1: number; row2: number } | null>(null);

  useEffect(() => {
    const compute = () => {
      const w1 = row1Ref.current?.scrollWidth ?? 0;
      const w2 = row2Ref.current?.scrollWidth ?? 0;
      if (w1 > 0 && w2 > 0) {
        const speed1 = 32;
        const speed2 = 120;
        setDurations({ row1: w1 / 2 / speed1, row2: w2 / 2 / speed2 });
      }
    };
    compute();
    const t = setTimeout(compute, 300);
    window.addEventListener("resize", compute);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section className="pt-10 md:pt-16 pb-24 md:pb-32 bg-[#1b1c1c] overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-12 md:mb-16 px-6">
          <span
            className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-3"
            style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
          >
            Amenities Highlights
          </span>
          <h2
            className="font-serif-headline text-white leading-tight"
            style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.5rem)" }}
          >
            World-Class Amenities
          </h2>
          <div className="w-14 h-0.5 bg-[#c9a86a] mx-auto mt-5" />
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden group/row1">
            <div
              ref={row1Ref}
              className="flex w-max animate-[marqueeLeft_45s_linear_infinite] group-hover/row1:[animation-play-state:paused]"
              style={{ direction: "ltr", animationDuration: durations ? `${durations.row1}s` : "45s" }}
            >
              {[...amenities, ...amenities].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 mx-2.5 px-8 py-6 bg-[#262727] border border-white/10 hover:border-[#c9a86a]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_25px_rgba(201,168,106,0.15)] transition-all duration-300 whitespace-nowrap"
                >
                  <span className="w-12 h-12 shrink-0 flex items-center justify-center border border-[#c9a86a]/30 bg-[#1b1c1c] text-[#c9a86a] group-hover:bg-[#c9a86a] group-hover:text-[#1b1c1c] group-hover:border-[#c9a86a] transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </span>
                  <span
                    className="text-white/85 font-medium uppercase tracking-[0.12em] leading-snug"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden group/row2">
            <div
              ref={row2Ref}
              className="flex w-max animate-[marqueeRight_45s_linear_infinite] group-hover/row2:[animation-play-state:paused]"
              style={{ direction: "ltr", animationDuration: durations ? `${durations.row2}s` : "45s" }}
            >
              {[...travelTimes, ...travelTimes].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-5 mx-2.5 px-8 py-6 bg-[#262727] border border-[#c9a86a]/20 hover:border-[#c9a86a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(201,168,106,0.2)] transition-all duration-300 whitespace-nowrap"
                >
                  <span className="w-12 h-12 shrink-0 flex items-center justify-center border border-[#c9a86a]/40 bg-[#1b1c1c] text-[#c9a86a] group-hover:bg-[#c9a86a] group-hover:text-[#1b1c1c] group-hover:border-[#c9a86a] transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </span>
                  <span
                    className="text-white/85 font-medium uppercase tracking-[0.12em] leading-snug"
                    style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
                  >
                    {item.label}
                  </span>
                  <span className="flex items-center gap-2 text-[#c9a86a] font-semibold uppercase tracking-[0.12em] leading-none" style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}>
                    <MapPin className="w-4 h-4" />
                    {item.minutes} Minutes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesHighlights;
