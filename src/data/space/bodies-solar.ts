import type { CelestialBody, BodyCategoryMeta } from "@/lib/space/types";

/**
 * Cosmic Atlas — Celestial Body Database
 * ---------------------------------------
 * All scientific values are sourced from NASA / JPL / IAU fact sheets
 * (see `references` field on each record for the citation trail).
 *
 * Visualization values (renderOrbitRadius, renderRadius, renderOrbitalPeriod)
 * are NOT to scale — true scale would make planets invisible next to their
 * orbits. Instead we apply a logarithmic compression and clearly disclose
 * this in the UI (see ScaleLegend component).
 */

export const BODY_CATEGORIES: BodyCategoryMeta[] = [
  {
    id: "star",
    label: "Stars",
    description:
      "Plasma spheres powered by nuclear fusion, ranging from cool red dwarfs to brilliant blue supergiants.",
    icon: "Sun",
  },
  {
    id: "planet",
    label: "Planets",
    description:
      "Bodies orbiting a star, massive enough to be rounded by gravity and to have cleared their orbit.",
    icon: "Globe",
  },
  {
    id: "dwarf-planet",
    label: "Dwarf Planets",
    description:
      "Round bodies that orbit the Sun but have not cleared their orbital neighborhood of other debris.",
    icon: "CircleDot",
  },
  {
    id: "moon",
    label: "Moons",
    description:
      "Natural satellites gravitationally bound to a planet or dwarf planet.",
    icon: "Moon",
  },
  {
    id: "asteroid-belt",
    label: "Asteroid Belt",
    description:
      "Ring of rocky debris between Mars and Jupiter — leftover material from the solar system's formation.",
    icon: "CircleDashed",
  },
  {
    id: "kuiper-belt",
    label: "Kuiper Belt",
    description:
      "Donut-shaped region of icy bodies beyond Neptune, home to Pluto and most short-period comets.",
    icon: "Donut",
  },
  {
    id: "oort-cloud",
    label: "Oort Cloud",
    description:
      "Spherical shell of trillions of icy bodies at the edge of the solar system — source of long-period comets.",
    icon: "Cloud",
  },
  {
    id: "comet",
    label: "Comets",
    description:
      "Icy bodies that develop glowing comae and tails when they approach the Sun.",
    icon: "Sparkles",
  },
  {
    id: "nebula",
    label: "Nebulae",
    description:
      "Vast clouds of gas and dust — the birthplaces of stars and the remnants of dying ones.",
    icon: "CloudFog",
  },
  {
    id: "black-hole",
    label: "Black Holes",
    description:
      "Regions where gravity is so strong that nothing — not even light — can escape.",
    icon: "Circle",
  },
  {
    id: "galaxy",
    label: "Galaxies",
    description:
      "Gravitationally bound systems of stars, gas, dust, and dark matter — the building blocks of the universe.",
    icon: "RotateCw",
  },
];

/* ===================================================================== */
/*  THE SUN                                                               */
/* ===================================================================== */

export const SUN: CelestialBody = {
  id: "sun",
  name: "The Sun",
  category: "star",
  tagline: "A G-type main-sequence star — the heart of our Solar System.",
  overview:
    "The Sun is a 4.6-billion-year-old G-type main-sequence star (spectral type G2V) that contains 99.86% of the Solar System's total mass. Its core fuses about 600 million tonnes of hydrogen into helium every second, releasing energy that takes roughly 170,000 years to diffuse outward and just over eight minutes to travel to Earth as sunlight. Without the Sun's radiation, photosynthesis — and nearly every food chain on Earth — would collapse within weeks. It also drives the heliosphere, a vast magnetic bubble that shields the Solar System from much of the incoming cosmic radiation.",
  parentId: null,
  order: 0,
  renderOrbitRadius: 0,
  renderRadius: 3.2,
  color: "#fdb813",
  accentColor: "#ff7b00",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 60,
  axialTiltDeg: 7.25,
  emissive: true,
  data: {
    physical: [
      { label: "Radius", value: "695,700", unit: "km", source: "NASA Sun Fact Sheet" },
      { label: "Mass", value: "1.989 × 10³⁰", unit: "kg", source: "NASA Sun Fact Sheet" },
      { label: "Volume", value: "1.41 × 10¹⁸", unit: "km³", source: "NASA" },
      { label: "Surface gravity", value: "274", unit: "m/s²", source: "NASA Sun Fact Sheet" },
      { label: "Escape velocity", value: "617.5", unit: "km/s", source: "NASA" },
      { label: "Mean density", value: "1.408", unit: "g/cm³", source: "NASA Sun Fact Sheet" },
    ],
    orbital: [
      { label: "Distance from galactic center", value: "~26,000", unit: "light-years", source: "ESA Gaia" },
      { label: "Orbital period around Milky Way", value: "~225–250", unit: "million years", source: "ESA" },
      { label: "Orbital velocity", value: "~220", unit: "km/s", source: "ESA" },
    ],
    atmosphere: [
      { label: "Surface (photosphere) temperature", value: "5,500", unit: "°C", source: "NASA" },
      { label: "Corona temperature", value: "1–3", unit: "million °C", source: "NASA" },
      { label: "Core temperature", value: "~15", unit: "million °C", source: "NASA" },
      { label: "Luminosity", value: "3.828 × 10²⁶", unit: "W", source: "NASA" },
    ],
    composition: [
      { label: "Hydrogen", value: "~73.5", unit: "% (by mass)", source: "NASA" },
      { label: "Helium", value: "~24.9", unit: "% (by mass)", source: "NASA" },
      { label: "Oxygen, carbon, neon, iron, etc.", value: "~1.6", unit: "% (by mass)", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "~0–175,000 km radius", composition: "Hydrogen–helium plasma at 15M °C", temperature: "~15,000,000 °C" },
    { name: "Radiative zone", thickness: "~175,000–490,000 km radius", composition: "Plasma; energy transported by radiation", temperature: "2M–7M °C" },
    { name: "Convective zone", thickness: "~490,000–695,700 km radius", composition: "Plasma; energy transported by convection", temperature: "~2,000,000 °C at inner edge" },
    { name: "Photosphere", thickness: "~500 km thick", composition: "Visible 'surface', opaque plasma", temperature: "~5,500 °C" },
    { name: "Chromosphere", thickness: "~2,500", composition: "Thin layer above photosphere", temperature: "~4,500–25,000 °C" },
    { name: "Corona", thickness: "Millions of km", composition: "Tenuous plasma, extends past Earth", temperature: "1–3 million °C" },
  ],
  missions: [
    { name: "Parker Solar Probe", agency: "NASA", year: "2018–", type: "orbiter", highlight: "First spacecraft to 'touch' the Sun, sampling the corona in situ." },
    { name: "Solar Orbiter", agency: "ESA/NASA", year: "2020–", type: "orbiter", highlight: "Returning the closest-ever images of the Sun's polar regions." },
    { name: "SOHO", agency: "ESA/NASA", year: "1995–", type: "orbiter", highlight: "Continuous solar observation from the L1 Lagrange point for 30+ years." },
  ],
  facts: [
    { text: "Light from the Sun takes about 8 minutes 20 seconds to reach Earth.", citation: "NASA" },
    { text: "The Sun loses ~4 million tonnes of mass every second through fusion and solar wind.", citation: "NASA" },
    { text: "Over 1.3 million Earths could fit inside the Sun by volume.", citation: "NASA" },
    { text: "The Sun is about halfway through its main-sequence lifetime; it will become a red giant in ~5 billion years.", citation: "ESA" },
  ],
  references: [
    { label: "NASA Sun Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html" },
    { label: "NASA — The Sun", publisher: "NASA", url: "https://science.nasa.gov/sun/" },
    { label: "ESA — Our Star, the Sun", publisher: "ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/Sun" },
  ],
  sections: [
    {
      id: "structure",
      title: "Internal Structure",
      body: [
        "The Sun is not solid — it is a giant sphere of hot plasma held together by its own gravity. Energy generated by hydrogen fusion in the core travels outward first through the radiative zone, where photons random-walk through dense plasma for tens of thousands of years, and then through the convective zone, where hot plasma rises, cools, and sinks in enormous convection cells. Above the photosphere — the visible 'surface' of the Sun — lie the chromosphere and the corona, two layers of tenuous gas that paradoxically become much hotter than the surface below them.",
        "The corona's multi-million-degree temperature is one of the longest-standing puzzles in solar physics. Current theory, supported by Parker Solar Probe data, suggests that magnetic reconnection events and Alfvén waves deposit energy in the corona, heating it far above the photosphere's 5,500 °C. Understanding this mechanism matters directly for Earth: the corona is the source of the solar wind, which drives space weather that can damage satellites, disrupt power grids, and endanger astronauts.",
      ],
    },
    {
      id: "lifecycle",
      title: "Birth, Life, and Death",
      body: [
        "The Sun formed about 4.6 billion years ago from the gravitational collapse of a giant molecular cloud. As the cloud compressed, it spun into a disk; most of the material fell to the center and ignited fusion once core pressure and temperature reached the threshold for hydrogen burning, while the remainder coalesced into the planets. The Sun is currently about halfway through its main-sequence phase, stably fusing hydrogen into helium for a total of roughly 10 billion years.",
        "Once the core hydrogen is exhausted — in approximately 5 billion years — the Sun will expand into a red giant, likely engulfing Mercury and Venus and rendering Earth uninhabitable. After shedding its outer layers as a planetary nebula, the remnant core will collapse into a white dwarf about the size of Earth, which will slowly cool over trillions of years. The Sun is not massive enough to end its life as a supernova or black hole.",
      ],
    },
    {
      id: "influence",
      title: "Influence on the Solar System",
      body: [
        "The Sun's gravity dominates the Solar System out to the Oort Cloud, more than a light-year away. Its radiation defines the habitable zone — the region where liquid water can exist on a planet's surface — and its ultraviolet output drives atmospheric chemistry on every planet that has an atmosphere. The solar wind inflates the heliosphere, a magnetic bubble that shields the planets from much of the galaxy's cosmic radiation.",
        "Solar activity follows an approximately 11-year cycle driven by the tangling and reconnection of magnetic field lines. At solar maximum, sunspots, flares, and coronal mass ejections become frequent; these events can produce auroras on Earth but also threaten spacecraft, astronauts, and ground-based infrastructure. NASA and NOAA continuously monitor the Sun through a fleet of observatories so that space-weather warnings can be issued hours in advance.",
      ],
    },
  ],
  related: ["mercury", "venus", "earth", "jupiter"],
};

/* ===================================================================== */
/*  MERCURY                                                                */
/* ===================================================================== */

export const MERCURY: CelestialBody = {
  id: "mercury",
  name: "Mercury",
  category: "planet",
  tagline: "The smallest planet — and the closest to the Sun.",
  overview:
    "Mercury is the innermost and smallest planet of the Solar System, just slightly larger than Earth's Moon. It is a cratered, airless world that swings from blistering dayside temperatures of 430 °C to nightside chills of −180 °C — the most extreme day–night swing of any planet. Despite being closest to the Sun, Mercury is not the hottest planet overall; Venus's thick atmosphere traps more heat. Mercury's eccentric orbit and slow rotation make a single solar day on Mercury last 176 Earth days, even though its sidereal rotation is just under 59 Earth days.",
  parentId: "sun",
  order: 1,
  renderOrbitRadius: 6,
  renderRadius: 0.38,
  color: "#a6a2a0",
  accentColor: "#5c5650",
  renderOrbitalPeriod: 24,
  renderRotationPeriod: 36,
  axialTiltDeg: 0.034,
  orbitalInclination: 7,
  initialPhase: 0.5,
  data: {
    physical: [
      { label: "Radius (mean)", value: "2,439.7", unit: "km", source: "NASA Mercury Fact Sheet" },
      { label: "Mass", value: "3.301 × 10²³", unit: "kg", source: "NASA" },
      { label: "Surface gravity", value: "3.7", unit: "m/s²", source: "NASA" },
      { label: "Mean density", value: "5.427", unit: "g/cm³", source: "NASA — second highest of any planet" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "57.91", unit: "million km", source: "NASA" },
      { label: "Orbital period", value: "87.97", unit: "Earth days", source: "NASA" },
      { label: "Rotation period (sidereal)", value: "58.65", unit: "Earth days", source: "NASA" },
      { label: "Solar day (noon-to-noon)", value: "176", unit: "Earth days", source: "NASA" },
      { label: "Orbital eccentricity", value: "0.2056", unit: "—", source: "Highest of any planet" },
    ],
    atmosphere: [
      { label: "Surface pressure", value: "~5 × 10⁻¹⁵", unit: "bar", source: "NASA — exosphere, not a true atmosphere" },
      { label: "Daytime high", value: "430", unit: "°C", source: "NASA" },
      { label: "Nighttime low", value: "−180", unit: "°C", source: "NASA" },
    ],
    composition: [
      { label: "Core (iron)", value: "~55", unit: "% of volume (est.)", source: "NASA" },
      { label: "Mantle (silicate)", value: "~35", unit: "% (est.)", source: "NASA" },
      { label: "Crust", value: "~10", unit: "% (est.)", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "~3,600 km diameter (huge for the planet's size)", composition: "Iron–nickel, partially molten", temperature: "~1,727 °C (est.)" },
    { name: "Mantle", thickness: "~500–600 km", composition: "Silicate rock" },
    { name: "Crust", thickness: "~100–300 km", composition: "Silicate crust, heavily cratered" },
  ],
  missions: [
    { name: "Mariner 10", agency: "NASA", year: "1974–1975", type: "flyby", highlight: "First spacecraft to visit Mercury; imaged ~45% of the surface." },
    { name: "MESSENGER", agency: "NASA", year: "2011–2015", type: "orbiter", highlight: "First spacecraft to orbit Mercury; mapped the entire globe and confirmed water ice in polar craters." },
    { name: "BepiColombo", agency: "ESA/JAXA", year: "2018–", type: "orbiter", highlight: "Two-spacecraft mission arriving at Mercury in 2025–2026 to study its magnetic field and interior." },
  ],
  facts: [
    { text: "Mercury has water ice in permanently shadowed polar craters, despite being closest to the Sun.", citation: "NASA MESSENGER" },
    { text: "A year on Mercury is just 88 Earth days, but a single day–night cycle lasts 176 Earth days.", citation: "NASA" },
    { text: "Mercury is shrinking as its iron core cools — 'lobate scarps' across its surface are cliffs from crustal compression.", citation: "NASA" },
    { text: "Despite having no atmosphere, Mercury has a comet-like tail of sodium atoms pushed off its surface by solar radiation.", citation: "NASA" },
  ],
  references: [
    { label: "NASA Mercury Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html" },
    { label: "NASA — Mercury", publisher: "NASA", url: "https://science.nasa.gov/mercury/" },
    { label: "ESA — BepiColombo", publisher: "ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/BepiColombo" },
  ],
  sections: [
    {
      id: "geology",
      title: "Surface and Geology",
      body: [
        "Mercury's surface resembles the Moon's — heavily cratered, ancient, and airless. The largest impact feature is the Caloris Basin, a 1,550-km-wide crater formed roughly 3.8 billion years ago during the Late Heavy Bombardment. The impact was so violent that it produced jumbled 'weird terrain' on the exact opposite side of the planet — shockwaves focused through Mercury's interior fractured the crust antipodal to the impact site.",
        "Unlike the Moon, Mercury shows extensive 'lobate scarps': giant cliff-like ridges up to 1,000 km long and 3 km high. These formed as the planet's interior cooled and contracted, wrinkling the crust like the skin of a drying apple. MESSENGER imagery revealed that Mercury has continued to contract geologically recently — within the last few hundred million years — making it tectonically active on a slow timescale, even though it has no plate tectonics.",
      ],
    },
    {
      id: "interior",
      title: "An Oversized Core",
      body: [
        "Mercury's iron core takes up roughly 55% of the planet's volume — an enormous fraction compared to Earth's ~17%. This explains Mercury's high mean density (5.43 g/cm³), second only to Earth's. The leading hypothesis for the oversized core is that Mercury was struck by a giant impact early in its history, stripping away much of its silicate mantle and crust. An alternative theory holds that the young Sun's intense radiation vaporized the outer layers of Mercury before they could condense.",
        "Despite its small size, Mercury has a global magnetic field — about 1% as strong as Earth's. This was a surprise: scientists had thought small planets cooled too quickly to sustain the liquid-metal convection needed to generate a magnetic dynamo. MESSENGER data suggest Mercury's core is still partially molten, and that a layer of liquid iron sulfide may surround the inner solid core, allowing the dynamo to persist.",
      ],
    },
  ],
  related: ["venus", "earth", "sun"],
};

/* ===================================================================== */
/*  VENUS                                                                  */
/* ===================================================================== */

export const VENUS: CelestialBody = {
  id: "venus",
  name: "Venus",
  category: "planet",
  tagline: "Earth's sister in size — and a runaway greenhouse hellscape.",
  overview:
    "Venus is nearly Earth's twin in size and mass, yet it has evolved into one of the most hostile environments in the Solar System. A thick carbon-dioxide atmosphere 90 times denser than Earth's traps heat through a runaway greenhouse effect, producing a surface temperature of ~465 °C — hotter than Mercury, despite Venus being farther from the Sun. Surface pressure is comparable to being 900 meters underwater on Earth. High-altitude clouds of sulfuric acid blanket the planet, and it rains sulfuric acid that evaporates before reaching the surface. Venus also rotates backwards relative to most planets and so slowly that a Venusian day is longer than its year.",
  parentId: "sun",
  order: 2,
  renderOrbitRadius: 9,
  renderRadius: 0.55,
  color: "#e8c987",
  accentColor: "#a37c3a",
  renderOrbitalPeriod: 38,
  renderRotationPeriod: -100,
  axialTiltDeg: 177.4,
  orbitalInclination: 3.4,
  initialPhase: 1.8,
  data: {
    physical: [
      { label: "Radius (mean)", value: "6,051.8", unit: "km", source: "NASA Venus Fact Sheet" },
      { label: "Mass", value: "4.867 × 10²⁴", unit: "kg", source: "NASA" },
      { label: "Surface gravity", value: "8.87", unit: "m/s²", source: "NASA" },
      { label: "Mean density", value: "5.243", unit: "g/cm³", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "108.21", unit: "million km", source: "NASA" },
      { label: "Orbital period", value: "224.7", unit: "Earth days", source: "NASA" },
      { label: "Rotation period (sidereal)", value: "−243.02", unit: "Earth days (retrograde)", source: "NASA" },
      { label: "Solar day", value: "116.75", unit: "Earth days", source: "NASA" },
    ],
    atmosphere: [
      { label: "Surface pressure", value: "92", unit: "bar", source: "NASA" },
      { label: "Surface temperature", value: "~465", unit: "°C", source: "NASA — runaway greenhouse" },
      { label: "Composition", value: "96.5% CO₂, 3.5% N₂", unit: "—", source: "NASA" },
      { label: "Clouds", value: "Sulfuric acid droplets", unit: "—", source: "NASA" },
    ],
    composition: [
      { label: "Core (iron–nickel)", value: "~3,000", unit: "km radius (est.)", source: "NASA" },
      { label: "Mantle (silicate rock)", value: "~3,100", unit: "km thick (est.)", source: "NASA" },
      { label: "Crust", value: "~50", unit: "km thick (est.)", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "~6,000 km diameter (est.)", composition: "Iron–nickel, possibly partially molten", temperature: "Unknown" },
    { name: "Mantle", thickness: "~3,100 km", composition: "Silicate rock; likely hot enough to flow slowly", temperature: "~3,000–4,000 °C (est.)" },
    { name: "Crust", thickness: "~10–50 km", composition: "Basaltic silicate crust", temperature: "~465 °C at surface" },
  ],
  missions: [
    { name: "Venera 7", agency: "USSR", year: "1970", type: "lander", highlight: "First successful soft landing on another planet; survived 23 minutes." },
    { name: "Magellan", agency: "NASA", year: "1990–1994", type: "orbiter", highlight: "Radar-mapped 98% of Venus's surface at high resolution, revealing volcanoes and impact craters." },
    { name: "Akatsuki", agency: "JAXA", year: "2015–", type: "orbiter", highlight: "Studying Venus's atmospheric dynamics and super-rotation." },
    { name: "Parker Solar Probe (flybys)", agency: "NASA", year: "2020–", type: "flyby", highlight: "Surprisingly imaged Venus's surface in visible light through its cloud gaps." },
  ],
  facts: [
    { text: "Venus spins backwards: the Sun rises in the west and sets in the east.", citation: "NASA" },
    { text: "A day on Venus (243 Earth days) is longer than its year (225 Earth days).", citation: "NASA" },
    { text: "Venus's atmosphere super-rotates: clouds circle the planet in just 4 Earth days, far faster than the surface rotates.", citation: "ESA" },
    { text: "Pressure at the surface is equivalent to ~900 m underwater on Earth — enough to crush early Soviet landers within minutes.", citation: "NASA" },
  ],
  references: [
    { label: "NASA Venus Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html" },
    { label: "NASA — Venus", publisher: "NASA", url: "https://science.nasa.gov/venus/" },
    { label: "ESA — Venus Express archive", publisher: "ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/Venus_Express" },
  ],
  sections: [
    {
      id: "greenhouse",
      title: "The Runaway Greenhouse",
      body: [
        "Billions of years ago, Venus may have had oceans of liquid water and conditions broadly similar to early Earth. Models suggest that as the young Sun brightened — or as volcanic outgassing pushed carbon dioxide levels past a critical threshold — the planet's oceans evaporated. Water vapor is itself a potent greenhouse gas, so evaporation warmed the surface further, accelerating evaporation in a positive feedback loop until the oceans were gone. Without water to dissolve CO₂ and lock it into carbonate rocks (as happens on Earth), carbon dioxide accumulated in the atmosphere until surface pressure reached 92 bars and temperatures climbed to 465 °C.",
        "Venus is a stark natural experiment in what happens when the greenhouse effect runs away. Studying it sharpens our understanding of climate tipping points on Earth and informs the search for habitable exoplanets: a planet in the 'habitable zone' of its star is not guaranteed to stay habitable, and Venus — sometimes called Earth's 'evil twin' — is the cautionary counterexample.",
      ],
    },
    {
      id: "surface",
      title: "A Volcanic World",
      body: [
        "Radar imaging from Magellan revealed that Venus's surface is dominated by volcanism: vast volcanic plains cover ~80% of the planet, dotted with more than 1,600 major volcanoes and tens of thousands of smaller vents. There are towering 'pancake' domes, kidney-shaped 'coronae' up to 2,000 km across formed by mantle upwelling, and mountain ranges thrust up by tectonic compression. Unlike Earth, Venus has no plate tectonics; instead, its outer shell appears to be a single rigid lid that periodically cracks and resurfaces the planet in catastrophic episodes.",
        "A major open question is whether Venus is volcanically active today. In 2023, scientists analyzing Magellan radar images taken months apart identified a volcanic vent that changed shape between observations — the strongest direct evidence yet of recent eruptions on Venus. Upcoming missions (DAVINCI, VERITAS, EnVision) aim to settle the question and search for present-day seismicity.",
      ],
    },
  ],
  related: ["mercury", "earth", "mars"],
};

/* ===================================================================== */
/*  EARTH                                                                  */
/* ===================================================================== */

export const EARTH: CelestialBody = {
  id: "earth",
  name: "Earth",
  category: "planet",
  tagline: "The only known world with life — and with liquid water oceans.",
  overview:
    "Earth is the third planet from the Sun and the only place in the universe confirmed to host life. Its surface is 71% covered by liquid water — a unique feature among the Solar System's planets — sustained by an atmosphere rich in nitrogen and oxygen and by a magnetic field that shields the surface from harmful solar radiation. Earth's axial tilt of 23.4° produces seasons, and its active plate tectonics continually recycle the crust, regulating long-term climate through the carbon-silicate cycle. The planet formed ~4.54 billion years ago; evidence for life appears in rocks at least 3.5 billion years old, and possibly as early as 3.8–4.1 billion years ago.",
  parentId: "sun",
  order: 3,
  renderOrbitRadius: 12,
  renderRadius: 0.6,
  color: "#3a82c4",
  accentColor: "#2d6b3d",
  renderOrbitalPeriod: 50,
  renderRotationPeriod: 16,
  axialTiltDeg: 23.44,
  orbitalInclination: 0,
  initialPhase: 2.6,
  data: {
    physical: [
      { label: "Radius (mean)", value: "6,371.0", unit: "km", source: "NASA Earth Fact Sheet" },
      { label: "Mass", value: "5.972 × 10²⁴", unit: "kg", source: "NASA" },
      { label: "Surface gravity", value: "9.807", unit: "m/s²", source: "NASA" },
      { label: "Mean density", value: "5.514", unit: "g/cm³", source: "Highest of any planet" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "149.60", unit: "million km (1 AU)", source: "NASA" },
      { label: "Orbital period (sidereal year)", value: "365.256", unit: "days", source: "NASA" },
      { label: "Rotation period (sidereal day)", value: "23.934", unit: "hours", source: "NASA" },
      { label: "Axial tilt", value: "23.44", unit: "degrees", source: "NASA" },
      { label: "Orbital velocity", value: "29.78", unit: "km/s", source: "NASA" },
    ],
    atmosphere: [
      { label: "Surface pressure", value: "1.013", unit: "bar", source: "NASA" },
      { label: "Composition", value: "78% N₂, 21% O₂, 1% Ar + CO₂ + others", unit: "—", source: "NASA" },
      { label: "Mean surface temperature", value: "15", unit: "°C", source: "NASA" },
    ],
    composition: [
      { label: "Core (iron–nickel)", value: "~3,480", unit: "km radius", source: "NASA" },
      { label: "Mantle (silicate)", value: "~2,900", unit: "km thick", source: "NASA" },
      { label: "Crust", value: "5–70", unit: "km thick", source: "NASA" },
      { label: "Hydrosphere", value: "1.4 × 10⁹", unit: "km³ of water", source: "USGS" },
    ],
  },
  internalStructure: [
    { name: "Inner core", thickness: "~1,220 km radius", composition: "Solid iron–nickel alloy", temperature: "~5,200 °C" },
    { name: "Outer core", thickness: "~2,260 km thick", composition: "Liquid iron–nickel; generates the magnetic field", temperature: "~4,000–5,000 °C" },
    { name: "Mantle", thickness: "~2,900 km thick", composition: "Silicate rock; flows slowly over geological time", temperature: "500–4,000 °C" },
    { name: "Crust", thickness: "5 (oceanic)–70 (continental) km", composition: "Granite & basalt; divided into tectonic plates", temperature: "Varies" },
  ],
  missions: [
    { name: "ISS", agency: "NASA/Roscosmos/ESA/JAXA/CSA", year: "1998–", type: "crewed", highlight: "Continuously crewed orbital laboratory since 2000; humanity's longest off-Earth outpost." },
    { name: "Landsat 9", agency: "NASA/USGS", year: "2021–", type: "orbiter", highlight: "Latest in a 50+ year Landsat series providing continuous Earth surface imaging." },
    { name: "Apollo 11", agency: "NASA", year: "1969", type: "crewed", highlight: "First crewed landing on another world; 12 humans walked on the Moon 1969–1972." },
  ],
  facts: [
    { text: "Earth is the densest planet in the Solar System (5.514 g/cm³).", citation: "NASA" },
    { text: "The Moon is gradually moving away from Earth at ~3.8 cm per year.", citation: "NASA Lunar Laser Ranging" },
    { text: "Earth's magnetic field has reversed polarity hundreds of times; the last full reversal was ~780,000 years ago.", citation: "USGS" },
    { text: "Roughly 71% of Earth's surface is covered by oceans, which contain 97% of the planet's water.", citation: "USGS" },
  ],
  references: [
    { label: "NASA Earth Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
    { label: "NASA — Earth", publisher: "NASA", url: "https://science.nasa.gov/earth/" },
    { label: "USGS Water Science School", publisher: "USGS", url: "https://www.usgs.gov/special-topics/water-science-school" },
  ],
  sections: [
    {
      id: "habitability",
      title: "Why Earth Is Habitable",
      body: [
        "Earth sits inside the Sun's habitable zone — the orbital range where a planet can host liquid water on its surface — but habitability depends on much more than distance from a star. Earth's magnetic field, generated by convection in its liquid outer core, deflects most of the solar wind and prevents the atmosphere from being stripped away. Plate tectonics continually recycle carbon between the atmosphere, oceans, and mantle, stabilizing global temperature over geological timescales through the carbon-silicate cycle. The Moon, surprisingly, also plays a role: its gravitational influence stabilizes Earth's axial tilt, preventing wild climate swings that would otherwise occur over millions of years.",
        "Even with all of these advantages, Earth has gone through periods of near-uninhabitability. 'Snowball Earth' episodes before the Cambrian explosion may have covered the planet in ice from pole to pole, while end-Permian volcanism ~252 million years ago wiped out an estimated 96% of marine species. Yet life persisted. The fact that life rebounded from such extremes is one reason astrobiologists are optimistic about finding life on worlds with conditions very different from our own.",
      ],
    },
    {
      id: "atmosphere",
      title: "The Atmosphere That Made Complex Life Possible",
      body: [
        "Earth's atmosphere is exceptional in the Solar System for its 21% oxygen content. Oxygen is highly reactive and would gradually disappear without continuous replenishment — a fact first recognized by James Lovelock as evidence that life was present on Earth (and absent on Mars) before any spacecraft confirmed it. The oxygen was produced over ~2 billion years by cyanobacteria performing photosynthesis, eventually leading to the Great Oxidation Event ~2.4 billion years ago that made animal life possible.",
        "Above the troposphere — where weather happens — lie the stratosphere (home to the ozone layer that shields the surface from UV radiation), the mesosphere (where meteors burn up), and the thermosphere (where the International Space Station orbits and auroras form). Human activity now influences atmospheric composition at a rate measurable in real time: CO₂ has risen from ~280 ppm in pre-industrial times to over 420 ppm today, monitored continuously by NOAA's Mauna Loa Observatory.",
      ],
    },
  ],
  related: ["moon", "mars", "venus", "sun"],
};

/* ===================================================================== */
/*  THE MOON                                                               */
/* ===================================================================== */

export const MOON: CelestialBody = {
  id: "moon",
  name: "The Moon",
  category: "moon",
  tagline: "Earth's only natural satellite — and the gateway to deep space.",
  overview:
    "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System. It formed ~4.5 billion years ago, most likely after a Mars-sized body called Theia collided with the young Earth, ejecting a ring of debris that coalesced into the Moon. The Moon is in synchronous rotation, so it always shows the same face to Earth — the 'near side' — while the 'far side', unseen until the Space Age, has a thicker crust and far fewer dark maria. The Moon's gravity drives Earth's ocean tides and has slowed Earth's rotation from a 6-hour day at formation to our current 24-hour day.",
  parentId: "earth",
  order: 1,
  renderOrbitRadius: 1.6,
  renderRadius: 0.18,
  color: "#c8c8c8",
  accentColor: "#7a7a7a",
  renderOrbitalPeriod: 8,
  renderRotationPeriod: 8, // synchronous
  axialTiltDeg: 6.68,
  orbitalInclination: 5.14,
  initialPhase: 0,
  data: {
    physical: [
      { label: "Radius (mean)", value: "1,737.4", unit: "km", source: "NASA Moon Fact Sheet" },
      { label: "Mass", value: "7.342 × 10²²", unit: "kg", source: "NASA — 1.2% of Earth's mass" },
      { label: "Surface gravity", value: "1.62", unit: "m/s² — 1/6 of Earth's", source: "NASA" },
      { label: "Mean density", value: "3.344", unit: "g/cm³", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis from Earth", value: "384,400", unit: "km", source: "NASA" },
      { label: "Orbital period", value: "27.32", unit: "Earth days (sidereal)", source: "NASA" },
      { label: "Phase period (lunar month)", value: "29.53", unit: "Earth days (synodic)", source: "NASA" },
      { label: "Recession rate", value: "3.8", unit: "cm/year away from Earth", source: "NASA Lunar Laser Ranging" },
    ],
    atmosphere: [
      { label: "Surface pressure (day)", value: "~10⁻¹⁰", unit: "bar", source: "NASA — exosphere only" },
      { label: "Daytime high", value: "120", unit: "°C", source: "NASA" },
      { label: "Nighttime low", value: "−130", unit: "°C", source: "NASA" },
      { label: "Polar permanently shadowed craters", value: "−246", unit: "°C", source: "NASA — water ice preserved" },
    ],
    composition: [
      { label: "Crust (highlands)", value: "Anorthosite", unit: "—", source: "NASA Apollo samples" },
      { label: "Maria (dark plains)", value: "Basalt", unit: "—", source: "NASA" },
      { label: "Core (iron)", value: "~330", unit: "km radius (small)", source: "NASA GRAIL" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "~330 km radius (inner solid + outer fluid)", composition: "Iron with sulfur and nickel", temperature: "~1,400–1,600 °C (est.)" },
    { name: "Mantle", thickness: "~1,350 km", composition: "Silicate rock (olivine, pyroxene)", temperature: "Varies with depth" },
    { name: "Crust", thickness: "60–100 km (thicker on far side)", composition: "Anorthosite highlands + basaltic maria", temperature: "Varies" },
  ],
  missions: [
    { name: "Apollo 11", agency: "NASA", year: "1969", type: "crewed", highlight: "First crewed landing on another world; Armstrong and Aldrin collected 21.5 kg of samples." },
    { name: "Chang'e 5", agency: "CNSA", year: "2020", type: "sample-return", highlight: "Returned 1.7 kg of young lunar basalt, confirming volcanic activity as recently as ~2 billion years ago." },
    { name: "Artemis III", agency: "NASA", year: "Planned 2027", type: "crewed", highlight: "First crewed lunar landing since 1972; targets the lunar South Pole water-ice deposits." },
    { name: "Chandrayaan-3", agency: "ISRO", year: "2023", type: "lander", highlight: "First spacecraft to soft-land on the lunar south pole region; confirmed sulfur and other elements." },
  ],
  facts: [
    { text: "The Moon is slowly drifting away from Earth at ~3.8 cm/year — about the rate your fingernails grow.", citation: "NASA" },
    { text: "A day on the Moon lasts 29.5 Earth days — the same as its phase cycle, because it's tidally locked to Earth.", citation: "NASA" },
    { text: "The Moon has water ice in permanently shadowed polar craters — a key resource for future crewed bases.", citation: "NASA" },
    { text: "From Earth, we always see the same face of the Moon. The far side, often misnamed the 'dark side', gets just as much sunlight.", citation: "NASA" },
  ],
  references: [
    { label: "NASA Moon Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html" },
    { label: "NASA — Earth's Moon", publisher: "NASA", url: "https://science.nasa.gov/moon/" },
    { label: "NASA Artemis Program", publisher: "NASA", url: "https://www.nasa.gov/artemisprogram" },
  ],
  sections: [
    {
      id: "origin",
      title: "The Giant Impact Hypothesis",
      body: [
        "The dominant model for the Moon's origin is the Giant Impact (or 'Theia') hypothesis: roughly 4.5 billion years ago, a Mars-sized body struck the early Earth at an oblique angle. The impactor's metal core sank into Earth's mantle and merged with Earth's core, while much of the silicate mantles of both bodies was flung into orbit, forming a debris ring that coalesced into the Moon within decades to centuries. This model explains why the Moon has a much smaller iron core than Earth, why Earth and Moon share nearly identical oxygen-isotope ratios, and why the Moon's crust was once molten (forming the magma ocean that crystallized into the anorthosite highlands).",
        "Open questions remain — for example, isotopic similarities are almost too perfect for a random impactor. Variants such as the 'synestia' model and multiple-impact scenarios have been proposed to better match the geochemical data. Samples returned by Artemis from the lunar South Pole–Aitken basin, the oldest and largest impact crater on the Moon, are expected to refine the timeline substantially.",
      ],
    },
    {
      id: "exploration",
      title: "Humanity's First World Beyond Earth",
      body: [
        "The Moon is the only other world humans have walked on. Between 1969 and 1972, six Apollo missions landed 12 astronauts on the lunar surface, who collectively collected 382 kg of rock and soil that fundamentally rewrote our understanding of Solar System history. The Soviet Luna program (1959–1976) achieved the first lunar flyby, first impact, first far-side image, first soft landing, and first robotic sample return. Since 2000, a new wave of missions from China (Chang'e), India (Chandrayaan), Japan (SELENE), and the US (LRO, GRAIL, ARTEMIS) has reshaped lunar science.",
        "The Moon is now widely seen as a stepping stone for human exploration of the Solar System. Water ice at the lunar poles can be split into hydrogen and oxygen to fuel rockets, and the Moon's low gravity and slow rotation make it an ideal base for astronomical observatories. NASA's Artemis program aims to establish a sustained human presence on the Moon by the late 2020s, with the explicit goal of using the Moon as a proving ground for crewed missions to Mars.",
      ],
    },
  ],
  related: ["earth", "mars", "sun"],
};

/* ===================================================================== */
/*  MARS                                                                   */
/* ===================================================================== */

export const MARS: CelestialBody = {
  id: "mars",
  name: "Mars",
  category: "planet",
  tagline: "The Red Planet — humanity's next destination, and a frozen ocean world in its youth.",
  overview:
    "Mars is the fourth planet from the Sun and the most extensively explored body in the Solar System after Earth. Its reddish color comes from iron oxide (rust) on its surface. Mars is about half Earth's diameter and has a thin CO₂ atmosphere only 0.6% as thick as Earth's, yet it hosts the Solar System's largest volcano (Olympus Mons, 22 km tall), its longest canyon (Valles Marineris, 4,000 km long), and seasons very similar to Earth's thanks to a comparable 25° axial tilt. Geological evidence shows that ~3.5 billion years ago Mars had rivers, lakes, and possibly an ocean — making it a prime target in the search for past or present life.",
  parentId: "sun",
  order: 4,
  renderOrbitRadius: 16,
  renderRadius: 0.42,
  color: "#c1440e",
  accentColor: "#f4e3c1",
  renderOrbitalPeriod: 80,
  renderRotationPeriod: 17,
  axialTiltDeg: 25.19,
  orbitalInclination: 1.85,
  initialPhase: 4.2,
  data: {
    physical: [
      { label: "Radius (mean)", value: "3,389.5", unit: "km", source: "NASA Mars Fact Sheet" },
      { label: "Mass", value: "6.417 × 10²³", unit: "kg — 0.107 of Earth's", source: "NASA" },
      { label: "Surface gravity", value: "3.71", unit: "m/s² — 0.38 g", source: "NASA" },
      { label: "Mean density", value: "3.933", unit: "g/cm³", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "227.92", unit: "million km (1.52 AU)", source: "NASA" },
      { label: "Orbital period", value: "686.98", unit: "Earth days (1.88 Earth years)", source: "NASA" },
      { label: "Rotation period", value: "24.62", unit: "hours (24h 37m, 'sol')", source: "NASA" },
      { label: "Axial tilt", value: "25.19", unit: "degrees", source: "NASA — Earth-like seasons" },
    ],
    atmosphere: [
      { label: "Surface pressure", value: "6.36", unit: "mbar — 0.6% of Earth's", source: "NASA" },
      { label: "Composition", value: "95.3% CO₂, 2.7% N₂, 1.6% Ar", unit: "—", source: "NASA" },
      { label: "Mean surface temperature", value: "−63", unit: "°C", source: "NASA" },
    ],
    composition: [
      { label: "Core (iron–nickel–sulfur)", value: "~1,800", unit: "km radius (est.)", source: "NASA InSight" },
      { label: "Mantle (silicate)", value: "~1,600", unit: "km thick (est.)", source: "NASA" },
      { label: "Crust", value: "24–72", unit: "km thick", source: "NASA InSight — thicker than Earth's on average" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "~1,830 km radius (est.)", composition: "Iron–nickel–sulfur, likely partially liquid", temperature: "~1,500 °C (est.)" },
    { name: "Mantle", thickness: "~1,560 km", composition: "Silicate rock (olivine, pyroxene); cold and rigid", temperature: "~1,000–1,400 °C" },
    { name: "Crust", thickness: "24–72 km", composition: "Basaltic crust enriched in iron; no plate tectonics today", temperature: "Varies" },
  ],
  missions: [
    { name: "Viking 1 & 2", agency: "NASA", year: "1976", type: "lander", highlight: "First successful long-duration Mars landers; ran biology experiments whose results remain debated." },
    { name: "Curiosity (MSL)", agency: "NASA/JPL", year: "2012–", type: "rover", highlight: "Confirmed that Mars once had environments habitable to microbial life; exploring Gale Crater." },
    { name: "Perseverance", agency: "NASA/JPL", year: "2021–", type: "rover", highlight: "Caching samples for Mars Sample Return; deployed the Ingenuity helicopter — first powered flight on another planet." },
    { name: "Tianwen-1 / Zhurong", agency: "CNSA", year: "2021–2022", type: "rover", highlight: "China's first Mars rover; studied Utopia Planitia's surface composition." },
    { name: "InSight", agency: "NASA/JPL", year: "2018–2022", type: "lander", highlight: "First seismometer on Mars; detected a magnitude 5 'marsquake' and constrained the core size." },
  ],
  facts: [
    { text: "Olympus Mons on Mars is the tallest volcano in the Solar System — 22 km high, nearly 3× the height of Everest.", citation: "NASA" },
    { text: "A Martian year is 687 Earth days; seasons last about twice as long as on Earth.", citation: "NASA" },
    { text: "Mars has two tiny moons, Phobos and Deimos — likely captured asteroids.", citation: "NASA" },
    { text: "Mars's atmosphere is so thin that liquid water cannot persist on its surface today — it would either freeze or sublime.", citation: "NASA" },
  ],
  references: [
    { label: "NASA Mars Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html" },
    { label: "NASA — Mars", publisher: "NASA", url: "https://science.nasa.gov/mars/" },
    { label: "NASA Perseverance Rover", publisher: "JPL", url: "https://mars.nasa.gov/mars2020/" },
  ],
  sections: [
    {
      id: "water",
      title: "A Once-Watery World",
      body: [
        "Orbital imagery and rover data together make an overwhelming case that liquid water once flowed freely on Mars. Satellite photos show dried river valleys, deltas, and lakebeds numbering in the tens of thousands. The Curiosity rover found rounded pebbles in Gale Crater that could only have formed in a sustained river, while Perseverance is currently exploring Jezero Crater — a 45-km-wide paleolake with a well-preserved delta — explicitly to cache rocks that may preserve biosignatures. Mineralogical evidence (clays, sulfates, hydrated silica) suggests that between ~3.5 and 3.0 billion years ago, Mars underwent a global climate transition in which its atmosphere thinned and surface water retreated underground or was lost to space.",
        "Today, water on Mars exists primarily as ice in the polar caps and in subsurface glaciers, with small amounts of hydrated salts in some equatorial regions. In 2018, the Mars Express orbiter's radar instrument reported a 20-km-wide subglacial lake beneath the south polar ice cap — a finding still under active investigation. If confirmed, it would be the first known stable body of liquid water on present-day Mars and a high-priority target in the search for extant microbial life.",
      ],
    },
    {
      id: "life",
      title: "The Search for Life",
      body: [
        "Mars is the single best place in the Solar System to search for evidence of past microbial life beyond Earth. Three billion years ago, when Earth was already inhabited but not yet oxygenated, Mars and Earth had surprisingly similar surface environments: rivers, lakes, hydrothermal systems, organic chemistry delivered by meteorites and comets, and the same raw ingredients from which life arose on Earth. If life arose independently on Mars, fossils of microbial mats (stromatolites) or chemical biosignatures might be preserved in sedimentary rocks dating to that era.",
        "NASA's Perseverance rover is the first step in a multi-mission Mars Sample Return campaign: Perseverance is currently collecting the most astrobiologically interesting rocks it can find and sealing them in titanium tubes for later retrieval. If those samples reach Earth intact in the 2030s, they will be examined in laboratories with instruments far too large, delicate, and power-hungry to fly on a rover — potentially answering one of the deepest questions in science: whether life arises easily wherever conditions allow, or whether Earth is genuinely unique.",
      ],
    },
  ],
  related: ["earth", "moon", "jupiter"],
};

/* ===================================================================== */
/*  JUPITER                                                                */
/* ===================================================================== */

export const JUPITER: CelestialBody = {
  id: "jupiter",
  name: "Jupiter",
  category: "planet",
  tagline: "The Solar System's giant — a failed star with 95 known moons.",
  overview:
    "Jupiter is the largest planet in the Solar System — more massive than all other planets combined by a factor of 2.5. It is a gas giant composed mostly of hydrogen and helium, with no solid surface to land on. Its iconic banded appearance comes from atmospheric jet streams moving in opposite directions, with turbulence and storms churning at the boundaries. The Great Red Spot is a high-pressure storm that has been observed for at least 350 years and is currently about 1.3 times the diameter of Earth, though it has been shrinking for decades. Jupiter's gravity acts as a 'cosmic vacuum cleaner', deflecting many comets and asteroids that would otherwise threaten the inner planets — a role dramatically demonstrated in 1994 when comet Shoemaker–Levy 9 broke apart and slammed into Jupiter.",
  parentId: "sun",
  order: 5,
  renderOrbitRadius: 22,
  renderRadius: 1.6,
  color: "#d8a878",
  accentColor: "#7e5230",
  renderOrbitalPeriod: 130,
  renderRotationPeriod: 6,
  axialTiltDeg: 3.13,
  orbitalInclination: 1.3,
  initialPhase: 5.8,
  data: {
    physical: [
      { label: "Radius (equatorial)", value: "71,492", unit: "km — 11.2× Earth's", source: "NASA Jupiter Fact Sheet" },
      { label: "Mass", value: "1.898 × 10²⁷", unit: "kg — 318× Earth's; 2.5× all other planets combined", source: "NASA" },
      { label: "Surface gravity (at 1 bar)", value: "24.79", unit: "m/s² — 2.53 g", source: "NASA" },
      { label: "Mean density", value: "1.326", unit: "g/cm³", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "778.5", unit: "million km (5.20 AU)", source: "NASA" },
      { label: "Orbital period", value: "4,332.59", unit: "Earth days (~11.86 Earth years)", source: "NASA" },
      { label: "Rotation period", value: "9.93", unit: "hours — fastest rotating planet", source: "NASA" },
      { label: "Axial tilt", value: "3.13", unit: "degrees", source: "NASA" },
    ],
    atmosphere: [
      { label: "Composition", value: "~90% H₂, ~10% He", unit: "by volume", source: "NASA" },
      { label: "Cloud-top temperature", value: "−145", unit: "°C", source: "NASA" },
      { label: "Core temperature (est.)", value: "~24,000", unit: "°C", source: "NASA Juno" },
    ],
    composition: [
      { label: "Hydrogen (by mass)", value: "~75", unit: "%", source: "NASA" },
      { label: "Helium (by mass)", value: "~24", unit: "%", source: "NASA" },
      { label: "Heavier elements (rock, ice, metals)", value: "~1", unit: "%", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core (suspected)", thickness: "Uncertain; up to ~20,000 km radius", composition: "Possibly rock/ice/metal, possibly 'diluted' or 'fuzzy' (Juno data)", temperature: "~24,000–35,000 °C (est.)" },
    { name: "Metallic hydrogen mantle", thickness: "Tens of thousands of km", composition: "Hydrogen compressed into a liquid metal — source of Jupiter's magnetic field", temperature: "~10,000 °C" },
    { name: "Molecular hydrogen envelope", thickness: "Outer ~20,000 km", composition: "Liquid then gaseous H₂ + He with NH₃, CH₄, H₂O clouds", temperature: "−145 °C at cloud tops" },
  ],
  missions: [
    { name: "Pioneer 10 & 11", agency: "NASA", year: "1973–1974", type: "flyby", highlight: "First spacecraft to cross the asteroid belt and visit Jupiter." },
    { name: "Voyager 1 & 2", agency: "NASA", year: "1979", type: "flyby", highlight: "Discovered Jupiter's ring system, active volcanism on Io, and detailed the Galilean moons." },
    { name: "Galileo", agency: "NASA/JPL", year: "1995–2003", type: "orbiter", highlight: "First spacecraft to orbit Jupiter; deployed an atmospheric probe that descended 150 km into the clouds." },
    { name: "Juno", agency: "NASA/JPL", year: "2016–", type: "orbiter", highlight: "Polar orbiter mapping Jupiter's gravity and magnetic fields; revealed a 'fuzzy' core and cyclone clusters at the poles." },
    { name: "JUICE (Jupiter Icy Moons Explorer)", agency: "ESA", year: "2023–", type: "orbiter", highlight: "ESA mission to study Ganymede, Europa, and Callisto; will become the first spacecraft to orbit another planet's moon (Ganymede)." },
  ],
  facts: [
    { text: "Jupiter's magnetic field is the strongest of any planet — ~20,000× stronger than Earth's.", citation: "NASA Juno" },
    { text: "The Great Red Spot has been observed for at least 350 years but has shrunk dramatically since the 1970s.", citation: "NASA" },
    { text: "If Jupiter had been ~80× more massive, it could have fused hydrogen and become a star.", citation: "NASA" },
    { text: "Jupiter rotates so fast (under 10 hours) that it is visibly flattened at the poles — an effect you can see through a small telescope.", citation: "NASA" },
  ],
  references: [
    { label: "NASA Jupiter Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html" },
    { label: "NASA — Jupiter", publisher: "NASA", url: "https://science.nasa.gov/jupiter/" },
    { label: "NASA Juno Mission", publisher: "JPL", url: "https://www.nasa.gov/mission_pages/juno/main/index.html" },
  ],
  sections: [
    {
      id: "interior",
      title: "Inside the Giant",
      body: [
        "Deep inside Jupiter, pressures and temperatures become so extreme that hydrogen transitions from a molecular gas into a fluid that conducts electricity — 'metallic hydrogen'. Convection in this vast conducting layer, spinning with Jupiter's rapid 10-hour rotation, generates the largest planetary magnetic field in the Solar System. Juno's gravity measurements, which detect tiny irregularities in Jupiter's gravitational field as the spacecraft flies overhead, suggest that Jupiter's core is not the compact ball of rock and ice that scientists expected but rather a 'fuzzy' region where heavy elements are dispersed throughout a large volume — possibly the result of a colossal early impact that diluted the original core.",
        "Jupiter's deep interior also generates enormous internal heat: the planet radiates roughly 1.6× as much energy as it receives from the Sun. This heat is thought to be primordial — the slow release of gravitational energy from Jupiter's formation — and it drives much of the violent atmospheric dynamics that we see at cloud-top level, including the jet streams and the long-lived storm systems.",
      ],
    },
    {
      id: "moons",
      title: "A Miniature Solar System",
      body: [
        "Jupiter has at least 95 confirmed moons — a system so large that it functions as a miniature solar system in its own right. The four largest — Io, Europa, Ganymede, and Callisto, collectively the 'Galilean moons' — were discovered by Galileo Galilei in 1610 and were the first moons found orbiting another planet. Ganymede, at 5,268 km across, is larger than the planet Mercury and is the only moon known to generate its own magnetic field. Europa harbors a global ocean of liquid water beneath an icy crust, making it one of the most promising places in the Solar System to search for extant life. Io is the most volcanically active body in the Solar System, with hundreds of active volcanoes driven by tidal heating from Jupiter's gravity.",
        "NASA's Europa Clipper mission, launched in October 2024, will conduct dozens of close flybys of Europa beginning in 2030 to assess whether its subsurface ocean could support life. ESA's JUICE mission, en route to arrive at Jupiter in 2031, will characterize the icy moons with a focus on Ganymede, eventually becoming the first spacecraft to orbit a moon other than Earth's. Together these missions will rewrite our understanding of habitability in the outer Solar System.",
      ],
    },
  ],
  related: ["saturn", "mars", "sun"],
};

/* ===================================================================== */
/*  SATURN                                                                 */
/* ===================================================================== */

export const SATURN: CelestialBody = {
  id: "saturn",
  name: "Saturn",
  category: "planet",
  tagline: "The jewel of the Solar System — famous for its spectacular rings.",
  overview:
    "Saturn is the second-largest planet and, like Jupiter, a gas giant composed mostly of hydrogen and helium. Its most iconic feature is its ring system — a vast, mostly icy disk that stretches 280,000 km across but is often only 10 meters thick. Despite the rings' apparent solidity from Earth, they are made of countless separate particles ranging from dust grains to chunks the size of a house. Saturn is the least dense planet in the Solar System (0.69 g/cm³) — less dense than water — meaning (in principle) it would float in a sufficiently large ocean. Saturn also has 146 confirmed moons, including Titan, the second-largest moon in the Solar System and the only one with a substantial atmosphere.",
  parentId: "sun",
  order: 6,
  renderOrbitRadius: 30,
  renderRadius: 1.35,
  color: "#e3c992",
  accentColor: "#b8893f",
  renderOrbitalPeriod: 180,
  renderRotationPeriod: 7,
  axialTiltDeg: 26.73,
  orbitalInclination: 2.49,
  initialPhase: 0.4,
  hasRings: true,
  data: {
    physical: [
      { label: "Radius (equatorial)", value: "60,268", unit: "km — 9.45× Earth's", source: "NASA Saturn Fact Sheet" },
      { label: "Mass", value: "5.683 × 10²⁶", unit: "kg — 95.2× Earth's", source: "NASA" },
      { label: "Surface gravity (at 1 bar)", value: "10.44", unit: "m/s² — 1.07 g", source: "NASA" },
      { label: "Mean density", value: "0.687", unit: "g/cm³ — less dense than water", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "1,433.5", unit: "million km (9.58 AU)", source: "NASA" },
      { label: "Orbital period", value: "10,759", unit: "Earth days (~29.4 Earth years)", source: "NASA" },
      { label: "Rotation period", value: "~10.7", unit: "hours (varies by latitude)", source: "NASA Cassini" },
      { label: "Axial tilt", value: "26.73", unit: "degrees", source: "NASA" },
    ],
    atmosphere: [
      { label: "Composition", value: "~96% H₂, ~3% He, traces of CH₄, NH₃", unit: "—", source: "NASA" },
      { label: "Cloud-top temperature", value: "−178", unit: "°C", source: "NASA" },
      { label: "Internal heat flux", value: "~2.3×", unit: "absorbed solar energy", source: "NASA" },
    ],
    composition: [
      { label: "Hydrogen (by mass)", value: "~96", unit: "%", source: "NASA" },
      { label: "Helium (by mass)", value: "~3", unit: "%", source: "NASA" },
      { label: "Heavier elements", value: "~1", unit: "%", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "Uncertain; estimated 9–22× Earth mass", composition: "Rock and ice, possibly diluted into metallic hydrogen", temperature: "~11,700 °C (est.)" },
    { name: "Metallic hydrogen layer", thickness: "Most of interior", composition: "Liquid metallic hydrogen + helium", temperature: "~5,000–9,000 °C" },
    { name: "Molecular hydrogen envelope", thickness: "Outer ~30,000 km", composition: "Gaseous then liquid H₂ + He; ammonia ice clouds at top", temperature: "−178 °C at cloud tops" },
  ],
  missions: [
    { name: "Pioneer 11", agency: "NASA", year: "1979", type: "flyby", highlight: "First spacecraft to visit Saturn; returned the first close-up images of the rings." },
    { name: "Voyager 1 & 2", agency: "NASA", year: "1980–1981", type: "flyby", highlight: "Detailed imaging of the rings and moons; revealed Titan's thick atmosphere." },
    { name: "Cassini–Huygens", agency: "NASA/ESA/ASI", year: "2004–2017", type: "orbiter", highlight: "13 years at Saturn; Huygens probe landed on Titan in 2005 — first landing in the outer Solar System. Discovered geysers on Enceladus." },
    { name: "Dragonfly (planned)", agency: "NASA", year: "Launch 2028", type: "rover", highlight: "A nuclear-powered rotorcraft that will fly across Titan's atmosphere, sampling diverse environments for prebiotic chemistry." },
  ],
  facts: [
    { text: "Saturn's rings are huge (280,000 km across) but astonishingly thin — often just ~10 meters thick.", citation: "NASA Cassini" },
    { text: "Saturn is so low-density (0.69 g/cm³) that it would float in a (sufficiently large) ocean.", citation: "NASA" },
    { text: "A hexagonal jet stream surrounds Saturn's north pole — a stable six-sided wave first imaged by Voyager and persisting today.", citation: "NASA Cassini" },
    { text: "Saturn's moon Titan has lakes and rivers of liquid methane — the only place besides Earth with stable surface liquids.", citation: "NASA Cassini–Huygens" },
  ],
  references: [
    { label: "NASA Saturn Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html" },
    { label: "NASA — Saturn", publisher: "NASA", url: "https://science.nasa.gov/saturn/" },
    { label: "NASA Cassini Mission", publisher: "JPL", url: "https://solarsystem.nasa.gov/missions/cassini/overview/" },
  ],
  sections: [
    {
      id: "rings",
      title: "The Rings of Saturn",
      body: [
        "Saturn's rings span 280,000 km in diameter but average only about 10 meters in thickness — a ratio that, if scaled to the size of a football field, would be thinner than a sheet of paper. They are not solid: they consist of countless individual particles, ranging from microscopic dust to house-sized boulders, almost entirely of water ice with traces of rocky material. The rings are divided into distinct bands — lettered A through G — separated by gaps, the largest of which is the Cassini Division. Cassini spacecraft data showed that the rings are surprisingly young geologically — probably between 10 and 100 million years old, meaning they likely formed during the age of the dinosaurs on Earth.",
        "How the rings formed remains an open question. The leading hypothesis is that a moon or passing icy body was torn apart by Saturn's tidal forces, with the debris spreading into a disk. Alternatively, the rings may be the result of a collision between two icy moons. Whatever their origin, the rings are slowly raining material onto Saturn ('ring rain') and may largely disappear within ~100–300 million years — a brief flicker on geological timescales.",
      ],
    },
    {
      id: "titan",
      title: "Titan — A Moon With Weather",
      body: [
        "Saturn's largest moon, Titan, is the only moon in the Solar System with a substantial atmosphere — denser than Earth's — and the only world besides Earth with stable liquid on its surface. But Titan's liquids are not water: at Titan's surface temperature of −179 °C, methane and ethane play the role that water does on Earth, forming clouds, raining down, filling lakes and rivers, and evaporating back into the atmosphere in a complete methane cycle analogous to Earth's water cycle. The Huygens probe, which landed on Titan in 2005, returned images of a landscape carved by liquid flows, with pebbles of water-ice rounded into river-cobble shapes.",
        "Titan is also a prime target for astrobiology. Its atmosphere is rich in organic molecules, and energy from the Sun drives complex chemistry that produces tholins — complex organic compounds that drift down to the surface. Some models suggest that Titan may harbor a subsurface ocean of liquid water and ammonia, raising the possibility of two distinct habitable environments in one body. NASA's Dragonfly mission, scheduled to launch in 2028, will send a nuclear-powered rotorcraft to fly across Titan's atmosphere and sample its surface chemistry directly.",
      ],
    },
  ],
  related: ["jupiter", "uranus", "sun"],
};

/* ===================================================================== */
/*  URANUS                                                                 */
/* ===================================================================== */

export const URANUS: CelestialBody = {
  id: "uranus",
  name: "Uranus",
  category: "planet",
  tagline: "The sideways ice giant — tilted 98° on its axis.",
  overview:
    "Uranus is the seventh planet from the Sun and the first 'ice giant' — a class of planet composed largely of water, methane, and ammonia 'ices' under high pressure, rather than the hydrogen and helium that dominate Jupiter and Saturn. Its most distinctive feature is its axial tilt of 98° — Uranus essentially rolls along its orbit on its side, probably the result of a colossal impact early in its history. This tilt produces extreme seasons: each pole spends 42 Earth years in continuous sunlight followed by 42 Earth years of darkness. Methane in Uranus's atmosphere absorbs red light, giving the planet its pale blue-green color. Uranus has 28 known moons and a faint, dark ring system.",
  parentId: "sun",
  order: 7,
  renderOrbitRadius: 38,
  renderRadius: 0.95,
  color: "#a8d5d8",
  accentColor: "#4f8a9a",
  renderOrbitalPeriod: 240,
  renderRotationPeriod: -9,
  axialTiltDeg: 97.77,
  orbitalInclination: 0.77,
  initialPhase: 2.1,
  hasRings: true,
  data: {
    physical: [
      { label: "Radius (mean)", value: "25,362", unit: "km — 3.98× Earth's", source: "NASA Uranus Fact Sheet" },
      { label: "Mass", value: "8.681 × 10²⁵", unit: "kg — 14.5× Earth's", source: "NASA" },
      { label: "Surface gravity (at 1 bar)", value: "8.69", unit: "m/s² — 0.89 g", source: "NASA" },
      { label: "Mean density", value: "1.270", unit: "g/cm³", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "2,872.5", unit: "million km (19.2 AU)", source: "NASA" },
      { label: "Orbital period", value: "30,687", unit: "Earth days (~84 Earth years)", source: "NASA" },
      { label: "Rotation period (retrograde)", value: "−17.24", unit: "hours", source: "NASA" },
      { label: "Axial tilt", value: "97.77", unit: "degrees", source: "NASA — rotates on its side" },
    ],
    atmosphere: [
      { label: "Composition", value: "~83% H₂, ~15% He, ~2% CH₄", unit: "—", source: "NASA" },
      { label: "Cloud-top temperature", value: "−224", unit: "°C", source: "NASA — coldest atmosphere in the Solar System" },
    ],
    composition: [
      { label: "Hydrogen/helium envelope", value: "Outer ~20%", unit: "—", source: "NASA" },
      { label: "Ices (water, methane, ammonia)", value: "~50–70%", unit: "% of mass (est.)", source: "NASA" },
      { label: "Rock/metal core", value: "~0.5–3.7", unit: "Earth masses (est.)", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "Uncertain; ~0.5–3.7 Earth masses", composition: "Rock and metal", temperature: "~5,000 °C (est.)" },
    { name: "Icy mantle", thickness: "Most of interior", composition: "Hot, dense fluid of water, methane, ammonia 'ices' under extreme pressure", temperature: "Up to ~5,000 °C" },
    { name: "Atmosphere", thickness: "Outer ~5,000 km", composition: "H₂, He, CH₄ — methane gives blue-green color", temperature: "−224 °C at cloud tops" },
  ],
  missions: [
    { name: "Voyager 2", agency: "NASA", year: "1986", type: "flyby", highlight: "Only spacecraft to visit Uranus; discovered 10 new moons, 2 new rings, and imaged the planet's bland blue-green atmosphere." },
  ],
  facts: [
    { text: "Uranus rotates on its side — axial tilt of 98°, likely from a giant impact during formation.", citation: "NASA" },
    { text: "Uranus is the coldest planet in the Solar System, with cloud-top temperatures of −224 °C.", citation: "NASA" },
    { text: "Like Neptune, Uranus is an 'ice giant' — most of its mass is water, methane, and ammonia ices, not hydrogen gas.", citation: "NASA" },
    { text: "Uranus has 28 known moons, all named after characters from the works of Shakespeare and Alexander Pope.", citation: "IAU" },
  ],
  references: [
    { label: "NASA Uranus Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html" },
    { label: "NASA — Uranus", publisher: "NASA", url: "https://science.nasa.gov/uranus/" },
  ],
  sections: [
    {
      id: "tilt",
      title: "A World on Its Side",
      body: [
        "Of all the planets in the Solar System, Uranus has by far the most extreme axial tilt: 97.77°. Rather than spinning upright like the other planets, Uranus essentially rolls along its orbit, with its rotational axis almost in the plane of its orbit. The leading explanation is that Uranus was struck by an Earth-sized body (or several large bodies) late in its formation, knocking it onto its side. The tilt has dramatic consequences: each pole experiences 42 years of continuous daylight followed by 42 years of darkness, and the planet's magnetic field — itself tilted ~60° from the rotation axis — is dragged through truly bizarre geometries over each Uranian year.",
        "The extreme tilt also explains why Uranus's atmosphere appears so featureless compared to Neptune's: internal heat has difficulty escaping evenly, dampening the convection that drives visible storms on other giants. Infrared observations have nonetheless revealed seasonal changes — bright cloud bands and occasional large storms as the planet approaches its equinox, which last occurred in 2007 and will not recur until 2050.",
      ],
    },
  ],
  related: ["neptune", "saturn", "sun"],
};

/* ===================================================================== */
/*  NEPTUNE                                                                */
/* ===================================================================== */

export const NEPTUNE: CelestialBody = {
  id: "neptune",
  name: "Neptune",
  category: "planet",
  tagline: "The windiest world — supersonic storms on the edge of the Solar System.",
  overview:
    "Neptune is the eighth and outermost planet from the Sun and, like Uranus, an ice giant. Its deep blue color comes from methane in its atmosphere, which absorbs red light. Despite receiving only 1/900th of the sunlight Earth gets, Neptune hosts the fastest winds in the Solar System — up to 2,100 km/h, faster than the speed of sound on Earth. Neptune was the first planet discovered through mathematical prediction rather than direct observation: irregularities in Uranus's orbit led astronomers to compute where an unseen planet must be, and Neptune was found within a degree of that prediction in 1846. It has 16 known moons, the largest of which — Triton — orbits backwards and is almost certainly a captured Kuiper Belt object.",
  parentId: "sun",
  order: 8,
  renderOrbitRadius: 46,
  renderRadius: 0.92,
  color: "#3b6bd4",
  accentColor: "#1a3a8f",
  renderOrbitalPeriod: 320,
  renderRotationPeriod: 9,
  axialTiltDeg: 28.32,
  orbitalInclination: 1.77,
  initialPhase: 3.7,
  data: {
    physical: [
      { label: "Radius (mean)", value: "24,622", unit: "km — 3.86× Earth's", source: "NASA Neptune Fact Sheet" },
      { label: "Mass", value: "1.024 × 10²⁶", unit: "kg — 17.1× Earth's", source: "NASA" },
      { label: "Surface gravity (at 1 bar)", value: "11.15", unit: "m/s² — 1.14 g", source: "NASA" },
      { label: "Mean density", value: "1.638", unit: "g/cm³", source: "NASA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "4,495.1", unit: "million km (30.07 AU)", source: "NASA" },
      { label: "Orbital period", value: "60,190", unit: "Earth days (~164.8 Earth years)", source: "NASA" },
      { label: "Rotation period", value: "16.11", unit: "hours", source: "NASA" },
      { label: "Axial tilt", value: "28.32", unit: "degrees", source: "NASA" },
    ],
    atmosphere: [
      { label: "Composition", value: "~80% H₂, ~19% He, ~1.5% CH₄", unit: "—", source: "NASA" },
      { label: "Cloud-top temperature", value: "−214", unit: "°C", source: "NASA" },
      { label: "Maximum wind speed", value: "2,100", unit: "km/h — fastest in the Solar System", source: "NASA" },
    ],
    composition: [
      { label: "Hydrogen/helium envelope", value: "Outer ~5–15%", unit: "—", source: "NASA" },
      { label: "Ices (water, methane, ammonia)", value: "Bulk of interior", composition: "Hot dense fluid", source: "NASA" },
      { label: "Rock/metal core", value: "~1", unit: "Earth mass (est.)", source: "NASA" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "Uncertain; ~1 Earth mass", composition: "Rock and metal", temperature: "~5,000 °C (est.)" },
    { name: "Icy mantle", thickness: "Most of interior", composition: "Water, methane, ammonia ices under extreme pressure; conducts electricity", temperature: "Up to ~5,000 °C" },
    { name: "Atmosphere", thickness: "Outer ~5,000 km", composition: "H₂, He, CH₄ — methane gives deep blue color", temperature: "−214 °C at cloud tops" },
  ],
  missions: [
    { name: "Voyager 2", agency: "NASA", year: "1989", type: "flyby", highlight: "Only spacecraft to visit Neptune; imaged the Great Dark Spot and confirmed Triton's geysers." },
  ],
  facts: [
    { text: "Neptune has the fastest winds in the Solar System — up to 2,100 km/h, faster than the speed of sound on Earth.", citation: "NASA" },
    { text: "Neptune was discovered in 1846 by prediction — astronomers calculated where it must be before anyone saw it.", citation: "NASA" },
    { text: "Neptune's largest moon Triton orbits backwards — likely a captured Kuiper Belt object.", citation: "NASA" },
    { text: "One Neptune year lasts 165 Earth years. It completed its first full orbit since discovery in 2011.", citation: "NASA" },
  ],
  references: [
    { label: "NASA Neptune Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html" },
    { label: "NASA — Neptune", publisher: "NASA", url: "https://science.nasa.gov/neptune/" },
  ],
  sections: [
    {
      id: "winds",
      title: "The Windiest Planet",
      body: [
        "Despite being the farthest planet from the Sun and receiving only about 1/900th of Earth's sunlight, Neptune has the most violent atmosphere in the Solar System. Wind speeds at the cloud tops reach 2,100 km/h — supersonic on Earth — blowing predominantly eastward against the planet's rotation. This is one of the deepest puzzles in planetary science: how does a planet with so little solar energy drive such enormous storms? The leading explanation is that Neptune radiates about 2.6× as much energy as it receives from the Sun — internal heat left over from the planet's formation and still slowly leaking outward. This internal heat source, combined with Neptune's rapid 16-hour rotation, provides enough energy to drive the powerful convection that produces the winds.",
        "Voyager 2's 1989 flyby revealed a 'Great Dark Spot' — an Earth-sized high-pressure system analogous to Jupiter's Great Red Spot — and smaller bright clouds of methane ice. Unlike the Great Red Spot, however, the Great Dark Spot was not a long-lived feature: Hubble observations in the 1990s showed it had disappeared, only for similar dark spots to appear elsewhere on the planet. Neptune's atmosphere is therefore highly dynamic, with storms forming and dissipating on timescales of years rather than centuries.",
      ],
    },
  ],
  related: ["uranus", "saturn", "pluto"],
};

/* ===================================================================== */
/*  PLUTO                                                                  */
/* ===================================================================== */

export const PLUTO: CelestialBody = {
  id: "pluto",
  name: "Pluto",
  category: "dwarf-planet",
  tagline: "The famous dwarf planet at the edge of the planetary realm.",
  overview:
    "Pluto is a dwarf planet in the Kuiper Belt, an icy region beyond Neptune. Discovered in 1930 by Clyde Tombaugh, Pluto was considered the ninth planet until 2006, when the International Astronomical Union redefined 'planet' and reclassified Pluto as a dwarf planet — a move that remains scientifically justified but emotionally controversial. NASA's New Horizons spacecraft flew past Pluto in July 2015, transforming it from a fuzzy blob into a complex world with mountains of water ice, vast nitrogen-ice plains, a multi-layered haze atmosphere, and a giant heart-shaped feature (Tombaugh Regio). Pluto has five known moons; the largest, Charon, is so big relative to Pluto that the two are sometimes considered a binary dwarf-planet system.",
  parentId: "sun",
  order: 9,
  renderOrbitRadius: 56,
  renderRadius: 0.28,
  color: "#d6b896",
  accentColor: "#8c6a4c",
  renderOrbitalPeriod: 480,
  renderRotationPeriod: 30,
  axialTiltDeg: 122.53,
  orbitalInclination: 17.16,
  initialPhase: 5.5,
  data: {
    physical: [
      { label: "Radius (mean)", value: "1,188.3", unit: "km — 0.186× Earth's", source: "NASA Pluto Fact Sheet" },
      { label: "Mass", value: "1.303 × 10²²", unit: "kg — 0.0022× Earth's", source: "NASA" },
      { label: "Surface gravity", value: "0.62", unit: "m/s² — 0.063 g", source: "NASA" },
      { label: "Mean density", value: "1.860", unit: "g/cm³", source: "NASA — implies rock–ice mixture" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "5,906.4", unit: "million km (39.48 AU)", source: "NASA" },
      { label: "Orbital period", value: "90,560", unit: "Earth days (~248 Earth years)", source: "NASA" },
      { label: "Rotation period (retrograde)", value: "−6.39", unit: "Earth days", source: "NASA" },
      { label: "Axial tilt", value: "122.53", unit: "degrees", source: "NASA" },
      { label: "Orbital eccentricity", value: "0.2488", unit: "—", source: "NASA — sometimes closer to Sun than Neptune" },
    ],
    atmosphere: [
      { label: "Surface pressure", value: "~1 × 10⁻⁵", unit: "bar (2015; varies with orbit)", source: "NASA New Horizons" },
      { label: "Composition", value: "N₂, CH₄, CO", unit: "—", source: "NASA" },
      { label: "Surface temperature", value: "−229", unit: "°C", source: "NASA" },
    ],
    composition: [
      { label: "Rock", value: "~60–70", unit: "% (est.)", source: "NASA" },
      { label: "Water ice", value: "~30–40", unit: "% (est.)", source: "NASA" },
      { label: "Surface ices", value: "N₂, CH₄, CO ices", unit: "—", source: "NASA New Horizons" },
    ],
  },
  internalStructure: [
    { name: "Core", thickness: "~850 km radius (est.)", composition: "Hydrated rock", temperature: "Unknown" },
    { name: "Mantle (water-ice)", thickness: "~280 km (est.)", composition: "Solid water ice, possibly with subsurface ocean", temperature: "Unknown" },
    { name: "Surface ice", thickness: "Thin layer", composition: "N₂, CH₄, CO ices", temperature: "−229 °C" },
  ],
  missions: [
    { name: "New Horizons", agency: "NASA/JHU APL", year: "2015 flyby", type: "flyby", highlight: "First and so far only spacecraft to visit Pluto; revealed mountains, glaciers, and a multi-layer haze atmosphere." },
  ],
  facts: [
    { text: "Pluto's largest moon Charon is so large that Pluto and Charon orbit a common point in space between them — a 'binary' system.", citation: "NASA" },
    { text: "Pluto has a heart-shaped feature (Tombaugh Regio) made of nitrogen ice, visible in New Horizons imagery.", citation: "NASA New Horizons" },
    { text: "From 1979 to 1999, Pluto was actually closer to the Sun than Neptune due to its eccentric orbit.", citation: "NASA" },
    { text: "Pluto was reclassified as a dwarf planet in 2006 because it has not 'cleared its neighborhood' of other Kuiper Belt objects.", citation: "IAU" },
  ],
  references: [
    { label: "NASA Pluto Fact Sheet", publisher: "NASA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/plutofact.html" },
    { label: "NASA — Pluto", publisher: "NASA", url: "https://science.nasa.gov/dwarf-planets/pluto/" },
    { label: "NASA New Horizons", publisher: "JHU APL", url: "https://www.nasa.gov/mission_pages/newhorizons/main/index.html" },
  ],
  sections: [
    {
      id: "reclassification",
      title: "Why Pluto Is a Dwarf Planet",
      body: [
        "When Pluto was discovered in 1930, astronomers had no other examples of small icy worlds beyond Neptune, so Pluto was naturally classified as the ninth planet. Beginning in the 1990s, however, astronomers began finding many similar objects in the same region — the Kuiper Belt — including some (notably Eris, discovered in 2005) that are comparable to or even more massive than Pluto. Faced with the prospect of dozens of new 'planets', the International Astronomical Union in 2006 adopted a formal definition requiring that a planet (1) orbit the Sun, (2) be massive enough to be round, and (3) have 'cleared its neighborhood' of other debris. Pluto fails the third criterion and was reclassified as a dwarf planet.",
        "The reclassification was scientifically sound but culturally painful — Pluto had been a 'planet' for 76 years, featured in textbooks, mnemonic devices, and popular culture. The debate highlighted the fact that classification systems in science evolve as our understanding improves, and that the Solar System is messier and more interesting than the simple list of nine planets most of us learned in school. NASA's New Horizons flyby in 2015 gave Pluto a popular redemption arc: it turned out to be far more geologically active and visually striking than anyone had predicted.",
      ],
    },
  ],
  related: ["neptune", "kuiper-belt", "comet-halley"],
};
