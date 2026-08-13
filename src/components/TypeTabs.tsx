import React, { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DownloadModal } from "./DownloadModal";
import { useLanguage } from "../context/LanguageContext";
import brochurePdf from "../../assets/Enre Residence by Imtiaz-Brochure.pdf";
import typeTabLogo1 from "../../assets/about-logo/logo 1.svg";
import typeTabLogo2 from "../../assets/about-logo/The Brooks_0.svg";
import typeTabLogo3 from "../../assets/about-logo/The Greens_0.svg";
import typeTabLogo4 from "../../assets/about-logo/The Grove_0.svg";
import typeTabLogo5 from "../../assets/about-logo/The Willow Property Logo.svg";

import willowGallery1 from "../../assets/the-willow/Gallery-images--DESK2.jpg.webp";
import willowGallery2 from "../../assets/the-willow/Gallery-images--DESK3.jpg.webp";
import willowGallery3 from "../../assets/the-willow/Gallery-images--DESK5.jpg.webp";
import willowGallery4 from "../../assets/the-willow/Gallery-images--DESK6.jpg.webp";
import willowGallery5 from "../../assets/the-willow/Gallery-images--DESK7.jpg.webp";
import willowGallery6 from "../../assets/the-willow/Gallery-images--DESK8.jpg.webp";

import willowFloorA1 from "../../assets/the-willow/floorplan/4 bedroom - Type A - 1st floor.jpg.webp";
import willowFloorA0 from "../../assets/the-willow/floorplan/4 bedroom - Type A - Ground.jpg.webp";
import willowFloorB1 from "../../assets/the-willow/floorplan/4 bedroom - Type B - 1st floor.jpg.webp";
import willowFloorB0 from "../../assets/the-willow/floorplan/4 bedroom - Type B - Ground.jpg.webp";
import willowFloorC1 from "../../assets/the-willow/floorplan/4 bedroom - Type C - 1st floor.jpg.webp";
import willowFloorC0 from "../../assets/the-willow/floorplan/4 bedroom - Type C - Ground.jpg.webp";
import willowFloorD1 from "../../assets/the-willow/floorplan/4 bedroom - Type D - 1st floor.jpg.webp";
import willowFloorD0 from "../../assets/the-willow/floorplan/4 bedroom - Type D - Ground.jpg.webp";

import groveGallery1 from "../../assets/the-grove/18 - Spa Salt lounge_2.jpg.webp";
import groveGallery2 from "../../assets/the-grove/Forest walkway 1_2.jpg.webp";
import groveGallery3 from "../../assets/the-grove/Gallery image Desk_0.jpg.webp";
import groveGallery4 from "../../assets/the-grove/SENSORY_GARDEN_0.jpg.webp";
import groveGallery5 from "../../assets/the-grove/VILLA - 6PLEX-T4B-T4D_Front View_03_4.jpg.webp";
import groveGallery6 from "../../assets/the-grove/VILLA - T5A_Closeup 02_2.jpg.webp";
import groveGallery7 from "../../assets/the-grove/VP05-5Br Type B_Formal Living_2.jpg.webp";

import grove4brGround2 from "../../assets/the-grove/floorplan/4br/ground_2.jpg.webp";
import grove4brGround6 from "../../assets/the-grove/floorplan/4br/ground_6.jpg.webp";
import grove4brGround7 from "../../assets/the-grove/floorplan/4br/ground_7.jpg.webp";
import grove4brFirst4 from "../../assets/the-grove/floorplan/4br/first_4.jpg.webp";
import grove4brFirst7 from "../../assets/the-grove/floorplan/4br/first_7.jpg.webp";
import grove4brFirst8 from "../../assets/the-grove/floorplan/4br/first_8.jpg.webp";

import grove5brGround4 from "../../assets/the-grove/floorplan/5br/ground_4.jpg.webp";
import grove5brGround8 from "../../assets/the-grove/floorplan/5br/ground_8.jpg.webp";
import grove5brFirst5 from "../../assets/the-grove/floorplan/5br/first_5.jpg.webp";
import grove5brFirst9 from "../../assets/the-grove/floorplan/5br/first_9.jpg.webp";

import grove6brGround5 from "../../assets/the-grove/floorplan/6br/ground_5.jpg.webp";
import grove6brFirst6 from "../../assets/the-grove/floorplan/6br/first_6.jpg.webp";
import grove6brSecond from "../../assets/the-grove/floorplan/6br/Second.jpg.webp";

import greensGallery1 from "../../assets/the-green/18 - Spa Salt lounge_2.jpg.webp";
import greensGallery2 from "../../assets/the-green/Forest walkway 1_2.jpg.webp";
import greensGallery3 from "../../assets/the-green/SENSORY_GARDEN_0.jpg.webp";
import greensGallery4 from "../../assets/the-green/VILLA - 6PLEX-T4B-T4D_Front View_03_4.jpg.webp";
import greensGallery5 from "../../assets/the-green/VILLA - T5A_Closeup 02_2.jpg.webp";
import greensGallery6 from "../../assets/the-green/VP05-5Br Type B_Formal Living_2.jpg.webp";

import greens4brGroundA from "../../assets/the-green/4br/Ground_1.jpg (1).webp";
import greens4brFirstA from "../../assets/the-green/4br/First_2.jpg.webp";
import greens4brGroundB from "../../assets/the-green/4br/ground_1.jpg.webp";
import greens4brFirstB from "../../assets/the-green/4br/1st.jpg.webp";
import greens4brGroundC from "../../assets/the-green/4br/ground_9.jpg.webp";
import greens4brFirstC from "../../assets/the-green/4br/First_3.jpg.webp";
import greens4brGroundD from "../../assets/the-green/4br/ground_10.jpg.webp";
import greens4brFirstD from "../../assets/the-green/4br/First_4.jpg.webp";

import greens5brGround from "../../assets/the-green/5br/ground_13.jpg.webp";
import greens5brFirst from "../../assets/the-green/5br/First_7.jpg.webp";
import greens5brSecond from "../../assets/the-green/5br/Second_2.jpg.webp";

import brooksGallery1 from "../../assets/the-brooks/18 - Spa Salt lounge_2.jpg.webp";
import brooksGallery2 from "../../assets/the-brooks/Forest walkway 1_2.jpg.webp";
import brooksGallery3 from "../../assets/the-brooks/SENSORY_GARDEN_0.jpg.webp";
import brooksGallery4 from "../../assets/the-brooks/VILLA - 6PLEX-T4B-T4D_Front View_03_4.jpg.webp";
import brooksGallery5 from "../../assets/the-brooks/VILLA - T5A_Closeup 02_2.jpg.webp";
import brooksGallery6 from "../../assets/the-brooks/VP05-5Br Type B_Formal Living_2.jpg.webp";

import brooks4br1 from "../../assets/the-brooks/4br/1.webp";
import brooks4br2 from "../../assets/the-brooks/4br/2.webp";
import brooks4br3 from "../../assets/the-brooks/4br/3.webp";
import brooks4br4 from "../../assets/the-brooks/4br/4.webp";
import brooks4br5 from "../../assets/the-brooks/4br/5.webp";
import brooks4br6 from "../../assets/the-brooks/4br/6.webp";
import brooks4br7 from "../../assets/the-brooks/4br/7.webp";
import brooks4br8 from "../../assets/the-brooks/4br/8.webp";

import brooks5br1 from "../../assets/the-brooks/5br/1.webp";
import brooks5br2 from "../../assets/the-brooks/5br/2.webp";
import brooks5br3 from "../../assets/the-brooks/5br/3.webp";

import woodsGallery1 from "../../assets/the-woods/Desk Image 1.jpg.webp";
import woodsGallery2 from "../../assets/the-woods/Desk Image 4.jpg.webp";
import woodsGallery3 from "../../assets/the-woods/Desk Image 5.jpg.webp";
import woodsGallery4 from "../../assets/the-woods/Desk Image 6.jpg.webp";
import woodsGallery5 from "../../assets/the-woods/Gallery Image Desk.jpg.webp";
import woodsGallery6 from "../../assets/the-woods/ID-01a.jpg.webp";
import woodsGallery7 from "../../assets/the-woods/L-02 - KIDS PLAY AREA.jpg.webp";
import woodsGallery8 from "../../assets/the-woods/L-04 - FITNESS_AREA.jpg.webp";

interface FloorPlanSlide {
  heading: string;
  unit: string;
  area: string;
  image: string;
}

interface FloorPlanGroup {
  label: string;
  floorPlans: FloorPlanSlide[];
}

interface WoodsTab {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  rangingFrom: string;
  fromSqft: string;
  fromSqm: string;
  toPrice: string;
  toSqft: string;
  toSqm: string;
  handover: string;
  showLearnMore?: boolean;
}

interface TypeTabData {
  id: number;
  logo: string;
  alt: string;
  category: string;
  gallery: string[];
  floorPlans?: FloorPlanSlide[];
  floorPlanGroups?: FloorPlanGroup[];
  woodsTabs?: WoodsTab[];
}

const typeTabs: TypeTabData[] = [
  {
    id: 0,
    logo: typeTabLogo1,
    alt: "The Woods",
    category: "Apartments",
    gallery: [woodsGallery1, woodsGallery2, woodsGallery3, woodsGallery4, woodsGallery5, woodsGallery6, woodsGallery7, woodsGallery8],
    woodsTabs: [
      {
        name: "The Woods Abode",
        subtitle: "1 and 2 Bedroom Apartments",
        description: "More than a residence, The Woods Abode is a space shaped by comfort, connection, and belonging.",
        image: woodsGallery1,
        rangingFrom: "AED 1.00 M* | INR 2.6 CR* | USD 272 K* | EUR 248 K* | GBP 211 K*",
        fromSqft: "546.38 Sq.Ft.",
        fromSqm: "50.76 Sq.M.",
        toPrice: "Price Will Be Available Upon Request",
        toSqft: "826.67 Sq.Ft.",
        toSqm: "76.80 Sq.M.",
        handover: "Handover - 2029",
      },
      {
        name: "The Woods Serenity",
        subtitle: "1 and 2 Bedroom Apartments",
        description: "The Woods Serenity is the second residential release within The Woods, a private woodland enclave at the heart of Sobha Sanctuary.",
        image: woodsGallery5,
        rangingFrom: "AED 1.04 M* | INR 2.7 CR* | USD 285 K* | EUR 260 K* | GBP 221 K*",
        fromSqft: "539.9 Sq.Ft.",
        fromSqm: "50.16 Sq.M.",
        toPrice: "AED 1.85 M* | INR 4.9 CR* | USD 508 K* | EUR 463 K* | GBP 393 K*",
        toSqft: "961.0 Sq.Ft.",
        toSqm: "89.28 Sq.M.",
        handover: "Handover - 2029",
      },
      {
        name: "The Woods Retreat",
        subtitle: "1 and 2 Bedroom Apartments",
        description: "The Woods Retreat is a refined apartment enclave within Sobha Sanctuary, where architecture, landscape, and wellbeing come together in quiet harmony.",
        image: woodsGallery6,
        rangingFrom: "AED 999 K* | INR 2.6 CR* | USD 274 K* | EUR 249 K* | GBP 212 K*",
        fromSqft: "539.8 Sq.Ft.",
        fromSqm: "50.15 Sq.M.",
        toPrice: "AED 1.81 M* | INR 4.8 CR* | USD 495 K* | EUR 451 K* | GBP 383 K*",
        toSqft: "963.7 Sq.Ft.",
        toSqm: "89.53 Sq.M.",
        handover: "Handover - 2029",
        showLearnMore: false,
      },
    ],
  },
  {
    id: 1,
    logo: typeTabLogo2,
    alt: "The Brooks",
    category: "Villas",
    gallery: [brooksGallery1, brooksGallery2, brooksGallery3, brooksGallery4, brooksGallery5, brooksGallery6],
    floorPlanGroups: [
      {
        label: "4 BR",
        floorPlans: [
          {
            heading: "4 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 Bedroom + 1 Store Room + 1 Powder Room + 1 Dining Room + 1 Living Room",
            area: "2,520.91 Sq.Ft.",
            image: brooks4br1,
          },
          {
            heading: "4 Bedroom Villa – Type A (First Floor)",
            unit: "3 Bedrooms + 1 Balcony",
            area: "2,520.91 Sq.Ft.",
            image: brooks4br2,
          },
          {
            heading: "4 Bedroom Villa – Type B (Ground Floor)",
            unit: "1 Bedroom + 1 Powder Room + 1 Dining Room + 1 Living Room",
            area: "2,459.02 Sq.Ft.",
            image: brooks4br3,
          },
          {
            heading: "4 Bedroom Villa – Type B (First Floor)",
            unit: "3 Bedrooms + 1 Balcony",
            area: "2,459.02 Sq.Ft.",
            image: brooks4br4,
          },
          {
            heading: "4 Bedroom Villa – Type C (Ground Floor)",
            unit: "1 Bedroom + 1 Maid Room + 1 Store Room + 1 Dining Room + 1 Living Room",
            area: "3,430.24 Sq.Ft.",
            image: brooks4br5,
          },
          {
            heading: "4 Bedroom Villa – Type C (First Floor)",
            unit: "3 Bedrooms + 1 Living Room + 2 Balconies",
            area: "3,430.24 Sq.Ft.",
            image: brooks4br6,
          },
          {
            heading: "4 Bedroom Villa – Type D (Ground Floor)",
            unit: "1 Bedroom + 1 Maid Room + 1 Store Room + 1 Dining Room + 1 Living Room",
            area: "3,328.74 Sq.Ft.",
            image: brooks4br7,
          },
          {
            heading: "4 Bedroom Villa – Type D (First Floor)",
            unit: "3 Bedrooms + 1 Living Room + 2 Balconies",
            area: "3,328.74 Sq.Ft.",
            image: brooks4br8,
          },
        ],
      },
      {
        label: "5 BR",
        floorPlans: [
          {
            heading: "5 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 Bedroom + 1 Maid Room + 1 Powder Room + 1 Store Room + 1 Dining Room + 1 Living Room",
            area: "4,106.75 Sq.Ft.",
            image: brooks5br1,
          },
          {
            heading: "5 Bedroom Villa – Type A (First Floor)",
            unit: "3 Bedrooms + 1 Living Room + 2 Balconies",
            area: "4,106.75 Sq.Ft.",
            image: brooks5br2,
          },
          {
            heading: "5 Bedroom Villa – Type A (Second Floor)",
            unit: "1 Bedroom + 1 Balcony",
            area: "4,106.75 Sq.Ft.",
            image: brooks5br3,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    logo: typeTabLogo3,
    alt: "The Greens",
    category: "Villas",
    gallery: [greensGallery1, greensGallery2, greensGallery3, greensGallery4, greensGallery5, greensGallery6],
    floorPlanGroups: [
      {
        label: "4 BR",
        floorPlans: [
          {
            heading: "4 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 Bedroom + 1 Living Room + 1 Dining Area + 1 Powder Room + 1 Utility Room + 1 Store Room",
            area: "2,520.91 Sq.Ft.",
            image: greens4brGroundA,
          },
          {
            heading: "4 Bedroom Villa – Type A (First Floor)",
            unit: "3 Bedrooms + 1 Balcony + 1 Store Room",
            area: "2,520.91 Sq.Ft.",
            image: greens4brFirstA,
          },
          {
            heading: "4 Bedroom Villa – Type B (Ground Floor)",
            unit: "1 Bedroom + 1 Living Room + 1 Dining Area + 1 Powder Room + 1 Utility Room",
            area: "2,459.02 Sq.Ft.",
            image: greens4brGroundB,
          },
          {
            heading: "4 Bedroom Villa – Type B (First Floor)",
            unit: "3 Bedrooms + 1 Balcony",
            area: "2,459.02 Sq.Ft.",
            image: greens4brFirstB,
          },
          {
            heading: "4 Bedroom Villa – Type C (Ground Floor)",
            unit: "1 Bedroom + 1 Living Room + 1 Dining Area + 1 Utility Room + 1 Store Room + 1 Maid's Room",
            area: "3,430.24 Sq.Ft.",
            image: greens4brGroundC,
          },
          {
            heading: "4 Bedroom Villa – Type C (First Floor)",
            unit: "3 Bedrooms + 2 Balconies + 1 Living Room + 1 Store Room",
            area: "3,430.24 Sq.Ft.",
            image: greens4brFirstC,
          },
          {
            heading: "4 Bedroom Villa – Type D (Ground Floor)",
            unit: "1 Bedroom + 1 Living Room + 1 Dining Area + 1 Maid's Room + 1 Utility Room + 1 Store Room",
            area: "3,328.74 Sq.Ft.",
            image: greens4brGroundD,
          },
          {
            heading: "4 Bedroom Villa – Type D (First Floor)",
            unit: "3 Bedrooms + 1 Living Area + 2 Balconies",
            area: "3,328.74 Sq.Ft.",
            image: greens4brFirstD,
          },
        ],
      },
      {
        label: "5 BR",
        floorPlans: [
          {
            heading: "5 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 Bedroom + 1 Living Room + 1 Dining Area + 1 Powder Room + 1 Maid's Room + 1 Utility Room + 1 Store Room",
            area: "4,106.75 Sq.Ft.",
            image: greens5brGround,
          },
          {
            heading: "5 Bedroom Villa – Type A (First Floor)",
            unit: "3 Bedrooms + 1 Living Area + 2 Balconies",
            area: "4,106.75 Sq.Ft.",
            image: greens5brFirst,
          },
          {
            heading: "5 Bedroom Villa – Type A (Second Floor)",
            unit: "1 Bedroom + 1 Balcony + 1 Roof Terrace",
            area: "4,106.75 Sq.Ft.",
            image: greens5brSecond,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    logo: typeTabLogo4,
    alt: "The Grove",
    category: "Villas",
    gallery: [groveGallery1, groveGallery2, groveGallery3, groveGallery4, groveGallery5, groveGallery6, groveGallery7],
    floorPlanGroups: [
      {
        label: "4 BR",
        floorPlans: [
          {
            heading: "4 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 GUEST BEDROOM + 1 LIVING ROOM + 1 DINING AREA + 1 POWDER ROOM + 1 STORE ROOM + 1 MAID ROOM",
            area: "4,905.33 SQ.FT.",
            image: grove4brGround2,
          },
          {
            heading: "4 Bedroom Villa – Type A (First Floor)",
            unit: "3 BEDROOMS + 1 LIVING AREA + 3 BALCONIES + 1 STUDY ROOM",
            area: "4,905.33 SQ.FT.",
            image: grove4brFirst4,
          },
          {
            heading: "4 Bedroom Villa – Type B (Ground Floor)",
            unit: "1 GUEST BEDROOM + 1 LIVING ROOM + 1 DINING AREA + 1 POWDER ROOM + 1 STORE ROOM + 1 MAID ROOM",
            area: "4,985.09 SQ.FT.",
            image: grove4brGround6,
          },
          {
            heading: "4 Bedroom Villa – Type B (First Floor)",
            unit: "3 BEDROOMS + 1 LIVING AREA + 3 BALCONIES + 1 STORE ROOM",
            area: "4,985.09 SQ.FT.",
            image: grove4brFirst7,
          },
          {
            heading: "4 Bedroom Villa – Type C (Ground Floor)",
            unit: "1 GUEST BEDROOM + 1 LIVING ROOM + 1 DINING AREA + 1 POWDER ROOM + 1 STORE ROOM + 1 MAID ROOM",
            area: "4,953.55 SQ.FT.",
            image: grove4brGround7,
          },
          {
            heading: "4 Bedroom Villa – Type C (First Floor)",
            unit: "3 BEDROOMS + 1 LIVING AREA + 1 BALCONY + 1 TERRACE",
            area: "4,953.55 SQ.FT.",
            image: grove4brFirst8,
          },
        ],
      },
      {
        label: "5 BR",
        floorPlans: [
          {
            heading: "5 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 GUEST BEDROOM + 1 LIVING ROOM + 1 DINING AREA + 1 POWDER ROOM + 1 STORE ROOM + 1 MAID ROOM",
            area: "5,792.28 SQ.FT.",
            image: grove5brGround4,
          },
          {
            heading: "5 Bedroom Villa – Type A (First Floor)",
            unit: "4 BEDROOMS + 1 LIVING AREA + 1 BALCONY + 1 TERRACE",
            area: "5,792.28 SQ.FT.",
            image: grove5brFirst5,
          },
          {
            heading: "5 Bedroom Villa – Type B (Ground Floor)",
            unit: "1 GUEST BEDROOM + 1 LIVING ROOM + 1 DINING AREA + 1 POWDER ROOM + 1 STORE ROOM + 1 MAID ROOM",
            area: "5,813.80 SQ.FT.",
            image: grove5brGround8,
          },
          {
            heading: "5 Bedroom Villa – Type B (First Floor)",
            unit: "4 BEDROOMS + 1 LIVING AREA + 1 BALCONY + 2 TERRACES",
            area: "5,813.80 SQ.FT.",
            image: grove5brFirst9,
          },
        ],
      },
      {
        label: "6 BR",
        floorPlans: [
          {
            heading: "6 Bedroom Villa – Type A (Ground Floor)",
            unit: "1 GUEST BEDROOM + 1 LIVING ROOM + 1 DINING AREA + 1 POWDER ROOM + 1 STORE ROOM + 1 MAID ROOM",
            area: "7,191.80 SQ.FT.",
            image: grove6brGround5,
          },
          {
            heading: "6 Bedroom Villa – Type A (First Floor)",
            unit: "4 BEDROOMS + 1 LIVING AREA + 2 BALCONIES + 1 STUDY ROOM",
            area: "7,191.80 SQ.FT.",
            image: grove6brFirst6,
          },
          {
            heading: "6 Bedroom Villa – Type A (Second Floor)",
            unit: "1 BEDROOM + 1 BALCONY + 1 TERRACE",
            area: "7,191.80 SQ.FT.",
            image: grove6brSecond,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    logo: typeTabLogo5,
    alt: "The Willow",
    category: "Villas",
    gallery: [willowGallery1, willowGallery2, willowGallery3, willowGallery4, willowGallery5, willowGallery6],
    floorPlans: [
      {
        heading: "4 Bedroom Villa – Type A (Ground Floor)",
        unit: "1 BEDROOM + 1 POWDER ROOM + 1 STORE ROOM + 1 DINING AREA + 1 LIVING AREA",
        area: "2,520.91 SQ.FT.",
        image: willowFloorA0,
      },
      {
        heading: "4 Bedroom Villa – Type A (First Floor)",
        unit: "3 BEDROOMS + 1 STORE ROOM + 1 BALCONY",
        area: "2,520.91 SQ.FT.",
        image: willowFloorA1,
      },
      {
        heading: "4 Bedroom Villa – Type B (Ground Floor)",
        unit: "1 BEDROOM + 1 DINING AREA + 1 LIVING AREA + 1 POWDER ROOM",
        area: "2,459.02 SQ.FT.",
        image: willowFloorB0,
      },
      {
        heading: "4 Bedroom Villa – Type B (First Floor)",
        unit: "3 BEDROOMS + 1 BALCONY",
        area: "2,459.02 SQ.FT.",
        image: willowFloorB1,
      },
      {
        heading: "4 Bedroom Villa – Type C (Ground Floor)",
        unit: "1 BEDROOM + 1 MAID ROOM + 1 POWDER ROOM + 1 STORE ROOM + 1 DINING AREA + 1 LIVING AREA",
        area: "3,430.24 SQ.FT.",
        image: willowFloorC0,
      },
      {
        heading: "4 Bedroom Villa – Type C (First Floor)",
        unit: "3 BEDROOMS + 1 LIVING ROOM + 2 BALCONIES + 1 STORE ROOM",
        area: "3,430.24 SQ.FT.",
        image: willowFloorC1,
      },
      {
        heading: "4 Bedroom Villa – Type D (Ground Floor)",
        unit: "1 BEDROOM + 1 MAID ROOM + 1 STORE ROOM + 1 POWDER ROOM + 1 DINING AREA + 1 LIVING AREA",
        area: "3,328.74 SQ.FT.",
        image: willowFloorD0,
      },
      {
        heading: "4 Bedroom Villa – Type D (First Floor)",
        unit: "3 BEDROOMS + 1 LIVING ROOM + 2 BALCONIES",
        area: "3,328.74 SQ.FT.",
        image: willowFloorD1,
      },
    ],
  },
];

const GallerySlider: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [index, setIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const sw = isMobile ? w : w * 0.34;
    setSlideWidth(sw);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    if (slideWidth === 0) return;
    const gap = 32;
    const centerOffset = (containerRef.current?.clientWidth ?? 0) / 2 - slideWidth / 2;
    setTrackOffset(centerOffset - index * (slideWidth + gap));
  }, [index, slideWidth]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const lightboxPrev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const lightboxNext = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, lightboxPrev, lightboxNext]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ padding: "clamp(3.5rem, 8vw, 4rem) 0", perspective: "1200px" }}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ transform: `translate3d(${trackOffset}px, 0, 0)` }}
        >
          {images.map((img, i) => {
            const isCenter = i === index;
            const isSide = Math.abs(((i - index + images.length) % images.length)) === 1;
            return (
              <div
                key={i}
                className="relative shrink-0"
                style={{ width: `${slideWidth}px`, marginRight: "2rem" }}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label="Open image"
                  className={`relative overflow-hidden block cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${isCenter ? "z-20" : "z-10"}`}
                  style={{
                    opacity: isCenter ? 1 : isSide ? 0.45 : 0.15,
                    transform: isCenter
                      ? "scale(1.12) rotateX(0deg)"
                      : "scale(0.92) rotateX(2deg)",
                  }}
                >
                  <div className="aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden">
                    <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/25 text-[#c9a86a] backdrop-blur hover:bg-[#c9a86a] hover:text-white hover:border-[#c9a86a] transition-all"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/25 text-[#c9a86a] backdrop-blur hover:bg-[#c9a86a] hover:text-white hover:border-[#c9a86a] transition-all"
      >
        <ChevronRight size={26} />
      </button>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            key={lightbox}
            src={images[lightbox]}
            alt={`${alt} gallery image ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain animate-[fadeIn_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/25 text-white hover:bg-[#c9a86a] hover:border-[#c9a86a] transition-all"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/25 text-white hover:bg-[#c9a86a] hover:border-[#c9a86a] transition-all"
          >
            <ChevronRight size={26} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 border border-white/25 text-white hover:bg-[#c9a86a] hover:border-[#c9a86a] transition-all"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

const WoodsSection: React.FC<{ tabs: WoodsTab[]; onDownload: () => void; onLearnMore: () => void }> = ({ tabs, onDownload, onLearnMore }) => {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            type="button"
            onClick={() => setActive(i)}
            className={`px-6 py-3 font-semibold uppercase tracking-[0.2em] border transition-all duration-300 ${active === i ? "bg-[#c9a86a] text-white border-[#c9a86a]" : "bg-transparent text-white/60 border-white/25 hover:border-[#c9a86a]/60 hover:text-white"}`}
            style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div key={`woods-${active}`} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-[slideUpFade_0.5s_ease]">
        <div className="relative bg-[#2a2b2b] border border-white/15 overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#c9a86a]/50 z-10" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#c9a86a]/50 z-10" />
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src={current.image}
              alt={current.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <span className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-2" style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}>
              {current.subtitle}
            </span>
            <h3 className="font-serif-headline text-white leading-tight" style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.5rem)" }}>
              {current.name}
            </h3>
            <div className="w-14 h-0.5 bg-[#c9a86a] mt-4" />
          </div>

          <p className="text-white/75 leading-relaxed font-normal" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
            {current.description}
          </p>

          <div>
            <span className="font-bold text-[#c9a86a] uppercase tracking-[0.15em]" style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}>
              Ranging From
            </span>
            <p className="text-white/85 leading-relaxed font-normal mt-2" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
              {current.rangingFrom}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="border border-white/15 bg-[#262727] p-4">
              <span className="block text-white/50 uppercase tracking-[0.15em] mb-2" style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}>
                From
              </span>
              <span className="block text-white font-semibold" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
                {current.fromSqft}
              </span>
              <span className="block text-white/60 mt-1" style={{ fontSize: "clamp(0.75rem, 0.6875rem + 0.25vw, 0.875rem)" }}>
                {current.fromSqm}
              </span>
            </div>
            <div className="border border-white/15 bg-[#262727] p-4">
              <span className="block text-white/50 uppercase tracking-[0.15em] mb-2" style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}>
                To
              </span>
              <span className="block text-white font-semibold" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
                {current.toSqft}
              </span>
              <span className="block text-white/60 mt-1" style={{ fontSize: "clamp(0.75rem, 0.6875rem + 0.25vw, 0.875rem)" }}>
                {current.toSqm}
              </span>
            </div>
            <div className="border border-white/15 bg-[#262727] p-4 flex flex-col justify-center">
              <span className="block text-white/50 uppercase tracking-[0.15em] mb-2" style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}>
                To
              </span>
              <span className="block text-white/70 font-normal leading-relaxed" style={{ fontSize: "clamp(0.75rem, 0.6875rem + 0.25vw, 0.875rem)" }}>
                {current.toPrice}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="text-white/70 font-normal" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
              {current.handover}
            </span>
            <span className="text-white/40 font-normal" style={{ fontSize: "clamp(0.75rem, 0.6875rem + 0.25vw, 0.875rem)" }}>
              *Subject to Availability
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a86a] text-white font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-[#1b1c1c] transition-all duration-300 cursor-pointer"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              Download Brochure
            </button>
            {current.showLearnMore !== false && (
              <button
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/25 text-white font-semibold uppercase tracking-[0.2em] hover:border-[#c9a86a] hover:text-[#c9a86a] transition-all duration-300 cursor-pointer"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                Learn More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FloorPlanSlider: React.FC<{ floorPlans?: FloorPlanSlide[]; groups?: FloorPlanGroup[]; onDownload: () => void; onLearnMore: () => void }> = ({ floorPlans, groups, onDownload, onLearnMore }) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const list = groups ? groups[activeGroup].floorPlans : floorPlans ?? [];
  const current = list[index];

  const goTo = (groupIdx: number) => {
    setActiveGroup(groupIdx);
    setIndex(0);
    setPrevIndex(null);
  };

  const prev = useCallback(() => {
    setPrevIndex(index);
    setIndex((i) => (i - 1 + list.length) % list.length);
  }, [index, list.length]);

  const next = useCallback(() => {
    setPrevIndex(index);
    setIndex((i) => (i + 1) % list.length);
  }, [index, list.length]);

  return (
    <div className="relative">
      {groups && (
        <div className="flex justify-center gap-2 sm:gap-3 mb-10">
          {groups.map((group, gi) => (
            <button
              key={group.label}
              type="button"
              onClick={() => goTo(gi)}
              className={`px-8 py-3 font-semibold uppercase tracking-[0.2em] border transition-all duration-300 ${activeGroup === gi ? "bg-[#c9a86a] text-white border-[#c9a86a]" : "bg-transparent text-white/60 border-white/25 hover:border-[#c9a86a]/60 hover:text-white"}`}
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              {group.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div key={`text-${activeGroup}-${index}`} className="space-y-6 animate-[slideUpFade_0.5s_ease]">
          <h3 className="font-serif-headline text-white leading-tight" style={{ fontSize: "clamp(1.5rem, 1.125rem + 1.5vw, 2.25rem)" }}>
            {current.heading}
          </h3>
          <div className="w-14 h-0.5 bg-[#c9a86a]" />
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#c9a86a] uppercase tracking-[0.15em]" style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}>
                Unit:
              </span>
              <span className="text-white/75 leading-relaxed font-normal" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
                {current.unit}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#c9a86a] uppercase tracking-[0.15em]" style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}>
                Saleable Area:
              </span>
              <span className="text-white/75 leading-relaxed font-normal" style={{ fontSize: "clamp(0.875rem, 0.8125rem + 0.25vw, 1rem)" }}>
                {current.area}
              </span>
            </div>
          </div>

          {list.length > 1 && (
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous floor plan"
                className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/25 text-[#c9a86a] hover:bg-[#c9a86a] hover:text-white hover:border-[#c9a86a] transition-all"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next floor plan"
                className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/25 text-[#c9a86a] hover:bg-[#c9a86a] hover:text-white hover:border-[#c9a86a] transition-all"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a86a] text-white font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-[#1b1c1c] transition-all duration-300 cursor-pointer"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              Download Brochure
            </button>
            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/25 text-white font-semibold uppercase tracking-[0.2em] hover:border-[#c9a86a] hover:text-[#c9a86a] transition-all duration-300 cursor-pointer"
              style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-[#2a2b2b] border border-white/15 p-3 md:p-5 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#c9a86a]/50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#c9a86a]/50" />
            <div className="relative w-full" style={{ minHeight: "16rem" }}>
              {prevIndex !== null && prevIndex !== index && (
                <img
                  src={list[prevIndex].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain opacity-0 animate-[floorFadeOut_0.6s_ease_forwards]"
                />
              )}
                <img
                key={current.image}
                src={current.image}
                alt={current.heading}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain animate-[floorFadeIn_0.6s_ease]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypeTabs: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [download, setDownload] = useState(false);
  const active = typeTabs[activeTab];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-36 px-2.5 md:px-16 bg-[#1b1c1c] w-full">
      <div className="w-full">
        <div className="text-center mb-12">
          <span
            className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-3"
            style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
          >
            Our Collection
          </span>
          <h2 className="font-serif-headline text-white leading-tight" style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.5rem)" }}>
            Explore Our Residence Types
          </h2>
          <div className="w-14 h-0.5 bg-[#c9a86a] mx-auto mt-5" />
        </div>

        <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-4 px-1 sm:px-8 w-full max-w-full overflow-x-auto overscroll-x-contain scroll-smooth no-scrollbar snap-x snap-proximity sm:overflow-visible">
          {typeTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.alt}
              className={`flex flex-col items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-0 pb-5 sm:pb-6 pt-4 transition-all duration-500 ease-out border-b-[3px] min-w-[140px] sm:min-w-0 flex-shrink-0 snap-center ${activeTab === tab.id ? "bg-[#262727] border-[#c9a86a]" : "bg-transparent border-white/10 hover:border-[#c9a86a]/60"}`}
              style={{ minHeight: "9rem" }}
            >
              <span className={`font-medium uppercase tracking-[0.2em] leading-none transition-colors duration-300 ${activeTab === tab.id ? "text-[#c9a86a]" : "text-white/50"}`} style={{ fontSize: "clamp(0.5rem, 0.4375rem + 0.2vw, 0.5625rem)" }}>
                {tab.category}
              </span>
              <img src={tab.logo} alt="" className="h-12 md:h-20 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              <span className={`font-semibold uppercase tracking-[0.15em] leading-none transition-colors duration-300 ${activeTab === tab.id ? "text-[#c9a86a]" : "text-white/70"}`} style={{ fontSize: "clamp(0.625rem, 0.5625rem + 0.2vw, 0.6875rem)" }}>
                {tab.alt}
              </span>
            </button>
          ))}
        </div>

        <div key={`content-${active.id}`} className="mt-14 md:mt-20 space-y-16 md:space-y-24 animate-[fadeIn_0.5s_ease]">
          <GallerySlider key={`gallery-${active.id}`} images={active.gallery} alt={active.alt} />

          <div>
            <div className="text-center mb-10">
              <span
                className="font-semibold text-[#c9a86a] uppercase tracking-[0.25em] block mb-3"
                style={{ fontSize: "clamp(0.6875rem, 0.625rem + 0.2vw, 0.75rem)" }}
              >
                {active.woodsTabs ? "Residences" : "Floor Plans"}
              </span>
              <h2 className="font-serif-headline text-white leading-tight" style={{ fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.5rem)" }}>
                {active.woodsTabs ? `${active.alt} Residences` : `${active.alt} Layouts`}
              </h2>
            </div>
            {active.woodsTabs ? (
              <WoodsSection key={`woods-${active.id}`} tabs={active.woodsTabs} onDownload={() => setDownload(true)} onLearnMore={scrollToContact} />
            ) : (
              <FloorPlanSlider key={`floorplan-${active.id}`} floorPlans={active.floorPlans} groups={active.floorPlanGroups} onDownload={() => setDownload(true)} onLearnMore={scrollToContact} />
            )}
          </div>
        </div>

        <DownloadModal
          open={download}
          onClose={() => setDownload(false)}
          title={t('download.brochureTitle')}
          subtitle={t('download.brochureSubtitle')}
          fileUrl={brochurePdf}
          fileName="Sobha-Sanctuary-Brochure.pdf"
        />
      </div>
    </section>
  );
};

export default TypeTabs;
