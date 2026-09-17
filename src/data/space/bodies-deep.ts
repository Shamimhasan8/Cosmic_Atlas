import type { CelestialBody } from "@/lib/space/types";

/**
 * Structural / deep-sky bodies — these objects are not rendered as 3D
 * meshes in the orbital scene. Instead they appear as cards in the
 * "Universe" view (a separate UI mode) and contribute their scientific
 * content to the atlas.
 *
 * Their `render*` fields are placeholders; the scene's universe mode
 * renders them as labeled hotspots or full-bleed info panels.
 */

/* ===================================================================== */
/*  ASTEROID BELT                                                          */
/* ===================================================================== */

export const ASTEROID_BELT: CelestialBody = {
  id: "asteroid-belt",
  name: "Asteroid Belt",
  category: "asteroid-belt",
  tagline: "A ring of rocky debris between Mars and Jupiter.",
  overview:
    "The Asteroid Belt is a torus-shaped region of the Solar System located between the orbits of Mars and Jupiter, roughly 2.2 to 3.2 astronomical units (AU) from the Sun. It contains millions of rocky bodies ranging from dust particles to the dwarf planet Ceres (940 km across). Despite its depiction in science fiction as a dense field of rocks, the Asteroid Belt is mostly empty space: the total mass of all asteroids combined is only ~4% of the Moon's mass, and the average distance between asteroids larger than 1 km is several million kilometers. The belt preserves material from the Solar System's formation that never coalesced into a planet — primarily because Jupiter's gravity prevented it.",
  parentId: "sun",
  order: 10,
  renderOrbitRadius: 19,
  renderRadius: 0.05,
  color: "#7a6a52",
  accentColor: "#3a2a1a",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  data: {
    physical: [
      { label: "Total mass", value: "~2.9 × 10²¹", unit: "kg — 4% of the Moon", source: "NASA" },
      { label: "Largest body (Ceres)", value: "940", unit: "km diameter", source: "NASA" },
      { label: "Bodies > 1 km", value: "~1–2", unit: "million (est.)", source: "NASA" },
      { label: "Bodies observed & numbered", value: ">600,000", unit: "—", source: "IAU Minor Planet Center" },
    ],
    orbital: [
      { label: "Inner edge", value: "~2.2", unit: "AU", source: "NASA" },
      { label: "Outer edge", value: "~3.2", unit: "AU", source: "NASA" },
      { label: "Orbital period (typical)", value: "3–6", unit: "Earth years", source: "NASA" },
    ],
    atmosphere: [
      { label: "Vacuum", value: "—", unit: "—", source: "—", },
    ],
    composition: [
      { label: "C-type (carbonaceous)", value: "~75", unit: "% of observed asteroids", source: "NASA" },
      { label: "S-type (silicate)", value: "~17", unit: "%", source: "NASA" },
      { label: "M-type (metallic, iron–nickel)", value: "~8", unit: "%", source: "NASA" },
    ],
  },
  missions: [
    { name: "Dawn", agency: "NASA/JPL", year: "2011–2018", type: "orbiter", highlight: "First spacecraft to orbit two bodies (Vesta and Ceres); confirmed Ceres has water ice and organic molecules." },
    { name: "OSIRIS-REx", agency: "NASA", year: "2020 sample return", type: "sample-return", highlight: "Returned 121 grams of asteroid Bennu — the largest asteroid sample ever brought to Earth." },
    { name: "Hayabusa2", agency: "JAXA", year: "2020 sample return", type: "sample-return", highlight: "Returned material from carbonaceous asteroid Ryugu for laboratory analysis." },
    { name: "Lucy", agency: "NASA", year: "2021–", type: "flyby", highlight: "12-year mission to visit 8 Trojan asteroids sharing Jupiter's orbit." },
  ],
  facts: [
    { text: "Ceres is the only dwarf planet in the inner Solar System and contains ~25% of the asteroid belt's total mass.", citation: "NASA Dawn" },
    { text: "If you stood on an asteroid in the main belt, you would typically need a telescope to see another asteroid — they are millions of km apart.", citation: "NASA" },
    { text: "The total mass of the entire asteroid belt is less than 5% of the Moon's mass.", citation: "NASA" },
    { text: "Jupiter's gravity prevented the asteroids from ever coalescing into a planet — the belt is 'failed' planetary material.", citation: "NASA" },
  ],
  references: [
    { label: "NASA — Asteroid Belt", publisher: "NASA", url: "https://science.nasa.gov/solar-system/asteroids/asteroid-belt/" },
    { label: "NASA Dawn Mission", publisher: "JPL", url: "https://www.nasa.gov/mission_pages/dawn/main/index.html" },
  ],
  sections: [
    {
      id: "origin",
      title: "A Planet That Never Was",
      body: [
        "When the Solar System formed 4.6 billion years ago, the region between Mars and Jupiter contained enough rocky material to form a planet several times more massive than Earth. But Jupiter — the Solar System's gravitational heavyweight — formed early and quickly, and its immense gravity continually stirred up material in that region, preventing the planetesimals from accreting. Instead, the rocks collided and shattered faster than they could grow. The Asteroid Belt today is the leftover debris of a planet that was never allowed to form.",
        "Most belt asteroids preserve a record of the early Solar System's composition. Carbonaceous C-type asteroids — which dominate the outer belt — contain water-bearing minerals and organic molecules, suggesting they formed beyond the 'snow line' where water ice could survive. Closer-in S-type asteroids formed hotter and drier. By analyzing meteorites that fall to Earth (most of which originate in the asteroid belt), scientists can date the Solar System's formation to within ±1 million years — a precision otherwise impossible for events 4.6 billion years in the past.",
      ],
    },
  ],
  related: ["mars", "jupiter", "ceres"],
};

/* ===================================================================== */
/*  KUIPER BELT                                                            */
/* ===================================================================== */

export const KUIPER_BELT: CelestialBody = {
  id: "kuiper-belt",
  name: "Kuiper Belt",
  category: "kuiper-belt",
  tagline: "A ring of icy worlds beyond Neptune, including Pluto.",
  overview:
    "The Kuiper Belt is a donut-shaped region of icy bodies extending from roughly 30 to 50 AU from the Sun, beyond the orbit of Neptune. It is home to Pluto, Eris, Haumea, Makemake, and at least 100,000 other icy objects larger than 100 km across. The Kuiper Belt is a frozen relic of the Solar System's formation, preserving the composition of the outer solar nebula. It is also the source of most short-period comets — bodies that take less than 200 years to orbit the Sun and visit the inner Solar System repeatedly. The Kuiper Belt was only confirmed in 1992 with the discovery of the first Kuiper Belt Object (other than Pluto) and is now recognized as one of the major structural features of the Solar System.",
  parentId: "sun",
  order: 11,
  renderOrbitRadius: 70,
  renderRadius: 0.1,
  color: "#8fa8c8",
  accentColor: "#3a5478",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  data: {
    physical: [
      { label: "Estimated total mass", value: "0.01–0.1", unit: "Earth masses (est., 10–100× asteroid belt)", source: "NASA" },
      { label: "Objects > 100 km", value: ">100,000", unit: "—", source: "NASA" },
      { label: "Dwarf planets (confirmed)", value: "5+", unit: "—", source: "IAU — Pluto, Eris, Haumea, Makemake, Gonggong" },
    ],
    orbital: [
      { label: "Inner edge", value: "~30", unit: "AU (Neptune's orbit)", source: "NASA" },
      { label: "Outer edge", value: "~50", unit: "AU", source: "NASA" },
      { label: "Orbital period (typical)", value: "200–1,000", unit: "Earth years", source: "NASA" },
    ],
    atmosphere: [],
    composition: [
      { label: "Dominant materials", value: "Water ice, methane, ammonia, rock", unit: "—", source: "NASA" },
      { label: "Color", value: "Many KBOs are reddish, from irradiated methane", unit: "—", source: "NASA" },
    ],
  },
  missions: [
    { name: "New Horizons", agency: "NASA/JHU APL", year: "2019 (Arrokoth flyby)", type: "flyby", highlight: "Flew past Kuiper Belt Object Arrokoth (2014 MU69) — the most distant object ever visited by a spacecraft." },
  ],
  facts: [
    { text: "The Kuiper Belt contains at least five dwarf planets: Pluto, Eris, Haumea, Makemake, and Gonggong.", citation: "IAU" },
    { text: "It is the source of most short-period comets — icy bodies nudged inward by gravitational interactions.", citation: "NASA" },
    { text: "The Kuiper Belt is 20× as wide and 20–200× as massive as the Asteroid Belt.", citation: "NASA" },
    { text: "New Horizons' 2019 flyby of Arrokoth was the most distant object ever explored — 6.5 billion km from Earth.", citation: "NASA" },
  ],
  references: [
    { label: "NASA — Kuiper Belt", publisher: "NASA", url: "https://science.nasa.gov/solar-system/kuiper-belt/" },
    { label: "NASA New Horizons — Kuiper Belt", publisher: "JHU APL", url: "https://www.nasa.gov/mission_pages/newhorizons/main/index.html" },
  ],
  sections: [
    {
      id: "structure",
      title: "Architecture of the Belt",
      body: [
        "The Kuiper Belt is not uniformly filled. It has a sharp inner edge at Neptune's orbit (30 AU), a dense 'classical belt' between 42 and 48 AU, and a complex set of 'resonant' populations where orbital periods with Neptune create stable niches. Pluto is the largest known member of the 3:2 resonance — it completes 2 orbits around the Sun for every 3 of Neptune's, ensuring the two never collide. Other resonances (2:1, 5:3, 7:4) host their own populations of KBOs. Neptune's outward migration early in Solar System history is thought to have sculpted this structure, capturing KBOs into resonances as it moved.",
        "Beyond ~50 AU lies the 'Kuiper Cliff' — a sudden drop-off in the density of objects. This may mark the outer edge of the primordial solar nebula, or it may indicate that a passing star or other perturbation cleared the outer region early in the Solar System's history. The 'scattered disk' — a more extended and eccentric population of objects that includes Eris — extends much farther and is thought to be the source of the long-period comets that fall into the inner Solar System from the Oort Cloud.",
      ],
    },
  ],
  related: ["pluto", "neptune", "oort-cloud", "comet-halley"],
};

/* ===================================================================== */
/*  OORT CLOUD                                                             */
/* ===================================================================== */

export const OORT_CLOUD: CelestialBody = {
  id: "oort-cloud",
  name: "Oort Cloud",
  category: "oort-cloud",
  tagline: "A spherical shell of icy bodies at the edge of the Solar System.",
  overview:
    "The Oort Cloud is a theoretical spherical shell of trillions of icy bodies surrounding the Solar System at distances between roughly 2,000 and 100,000 AU from the Sun. No Oort Cloud object has ever been directly observed — its existence is inferred from the orbits of long-period comets, which appear to fall from all directions toward the inner Solar System. The Oort Cloud marks the gravitational edge of the Solar System: at its outer boundary, the Sun's gravity is so weak that passing stars and the galaxy's tidal field can perturb objects inward, sending them on multimillion-year journeys toward the Sun as new long-period comets.",
  parentId: "sun",
  order: 12,
  renderOrbitRadius: 95,
  renderRadius: 0.15,
  color: "#5b6a8c",
  accentColor: "#2a3450",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  data: {
    physical: [
      { label: "Estimated total mass", value: "2–5", unit: "Earth masses (est.)", source: "NASA" },
      { label: "Number of objects > 1 km", value: "~10¹²", unit: "trillion (est.)", source: "NASA" },
    ],
    orbital: [
      { label: "Inner edge", value: "~2,000", unit: "AU", source: "NASA" },
      { label: "Outer edge", value: "~100,000", unit: "AU (~1.6 light-years)", source: "NASA" },
      { label: "Orbital period", value: "Millions of years", unit: "—", source: "NASA" },
    ],
    atmosphere: [],
    composition: [
      { label: "Composition", value: "Water ice, methane, ammonia, rock", unit: "—", source: "Inferred from comet composition" },
    ],
  },
  missions: [],
  facts: [
    { text: "No Oort Cloud object has ever been directly observed — its existence is inferred from comet orbits.", citation: "NASA" },
    { text: "At its outer edge (~100,000 AU), the Sun's gravity is barely stronger than that of passing stars.", citation: "NASA" },
    { text: "Long-period comets like Hale–Bopp are believed to originate in the Oort Cloud.", citation: "NASA" },
    { text: "Light from the Sun takes about a month to reach the inner Oort Cloud and over a year to reach the outer edge.", citation: "NASA" },
  ],
  references: [
    { label: "NASA — Oort Cloud", publisher: "NASA", url: "https://science.nasa.gov/solar-system/oort-cloud/" },
  ],
  sections: [
    {
      id: "comets",
      title: "Source of the Long-Period Comets",
      body: [
        "Long-period comets — those that take more than 200 years to orbit the Sun — appear to fall toward the inner Solar System from essentially every direction in the sky. This isotropy is the strongest evidence for the Oort Cloud's existence: only a spherical shell of source bodies could produce comets arriving from all directions, including high above the plane of the planets. When a passing star, a giant molecular cloud, or the galaxy's tidal field perturbs an Oort Cloud object's orbit, the object can drop into the inner Solar System, where solar heat vaporizes its ices and creates the glowing coma and tails we recognize as a comet.",
        "Once a comet enters the inner Solar System, its fate varies. Some are flung back out to the Oort Cloud on a long elliptical orbit. Some are captured into shorter orbits by planetary gravity and become 'Halley-type' comets with periods of 20–200 years. Others — perhaps 1% — collide with the Sun or a planet. The Oort Cloud is therefore a slow but steady source of impact risk to the inner Solar System, and studying its dynamics informs estimates of the long-term impact hazard on Earth.",
      ],
    },
  ],
  related: ["kuiper-belt", "comet-halley", "pluto"],
};

/* ===================================================================== */
/*  HALLEY'S COMET                                                         */
/* ===================================================================== */

export const HALLEYS_COMET: CelestialBody = {
  id: "comet-halley",
  name: "Halley's Comet",
  category: "comet",
  tagline: "The most famous comet — visible from Earth every 76 years.",
  overview:
    "Halley's Comet (officially 1P/Halley) is the best-known of all comets and the first to be recognized as periodic. English astronomer Edmond Halley predicted in 1705 that a comet seen in 1682 would return in 1758 — it did, and was named in his honor, though he did not live to see it. Halley's Comet orbits the Sun roughly every 76 years, swinging between the orbit of Venus at perihelion and beyond the orbit of Neptune at aphelion. Its most recent appearance was in 1986; its next will be in July 2061. The 1986 apparition was the first to be observed by an international fleet of spacecraft, including ESA's Giotto probe, which returned the first close-up images of a comet nucleus.",
  parentId: "sun",
  order: 13,
  renderOrbitRadius: 28,
  renderRadius: 0.08,
  color: "#c8d8e8",
  accentColor: "#5a7898",
  renderOrbitalPeriod: 200,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  orbitalInclination: 162.26, // retrograde
  initialPhase: 1.2,
  data: {
    physical: [
      { label: "Nucleus dimensions", value: "~15 × 8 × 8", unit: "km", source: "ESA Giotto" },
      { label: "Nucleus mass", value: "~2.2 × 10¹⁴", unit: "kg", source: "ESA" },
      { label: "Nucleus density", value: "~0.6", unit: "g/cm³ — fluffy, porous", source: "ESA" },
    ],
    orbital: [
      { label: "Semi-major axis", value: "17.8", unit: "AU", source: "NASA JPL" },
      { label: "Orbital period", value: "~75–76", unit: "Earth years", source: "NASA" },
      { label: "Perihelion", value: "0.586", unit: "AU (inside Venus's orbit)", source: "NASA" },
      { label: "Aphelion", value: "35.1", unit: "AU (beyond Neptune)", source: "NASA" },
      { label: "Inclination", value: "162.26", unit: "degrees (retrograde)", source: "NASA" },
    ],
    atmosphere: [
      { label: "Coma composition", value: "H₂O, CO, CO₂, CH₄, NH₃, dust", unit: "—", source: "ESA Giotto" },
      { label: "Tail length (1986)", value: "Up to ~50", unit: "million km", source: "ESA" },
    ],
    composition: [
      { label: "Nucleus composition", value: "80% water ice, plus CO, CO₂, CH₄, NH₃, silicate dust, organic compounds", unit: "—", source: "ESA Giotto" },
    ],
  },
  missions: [
    { name: "Giotto", agency: "ESA", year: "1986", type: "flyby", highlight: "First close-up images of a comet nucleus; passed within 596 km of Halley's nucleus." },
    { name: "International Cometary Explorer (ICE)", agency: "NASA", year: "1985–1986", type: "flyby", highlight: "First spacecraft to intercept a comet's tail (Giacobini–Zinner, 1985); observed Halley from upstream of the solar wind." },
    { name: "Sakigake & Suisei", agency: "ISAS (Japan)", year: "1986", type: "flyby", highlight: "Japan's first interplanetary spacecraft; measured solar wind interaction with Halley's coma." },
    { name: "Vega 1 & 2", agency: "USSR", year: "1986", type: "flyby", highlight: "Soviet probes that flew past Venus (deploying landers & balloons) before continuing to Halley." },
  ],
  facts: [
    { text: "Halley's Comet orbits backwards relative to the planets — it has a retrograde, highly inclined orbit.", citation: "NASA" },
    { text: "Halley's Comet has been recorded at every apparition since 240 BC — including the famous depiction on the Bayeux Tapestry (1066).", citation: "NASA" },
    { text: "The Orionid meteor shower in October and the Eta Aquariid shower in May are both caused by Earth passing through debris from Halley's Comet.", citation: "NASA" },
    { text: "Mark Twain was born in 1835 (a Halley year) and predicted he would die at the comet's next return — he did, in April 1910.", citation: "Historical record" },
  ],
  references: [
    { label: "NASA JPL — 1P/Halley", publisher: "JPL", url: "https://ssd.jpl.nasa.gov/tools/jdb/#/rec/?sstr=1P" },
    { label: "ESA — Giotto mission", publisher: "ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/Giotto" },
  ],
  sections: [
    {
      id: "history",
      title: "Humanity's Oldest Recorded Comet",
      body: [
        "Halley's Comet has been observed and recorded at every one of its apparitions since at least 240 BC, when Chinese astronomers noted a 'broom star' in the constellation Gemini. The Bayeux Tapestry famously depicts the comet's 1066 apparition, which was interpreted as an omen of King Harold's defeat at Hastings later that year. Medieval and Renaissance astronomers typically viewed comets as atmospheric phenomena or supernatural portents; it was not until Tycho Brahe's 1577 parallax measurements that comets were shown to be distant astronomical objects rather than weather.",
        "Edmond Halley's 1705 insight was to recognize that comets observed in 1531, 1607, and 1682 shared very similar orbital elements and that they were in fact the same object returning periodically. He predicted the next return for 1758. When the comet reappeared on schedule — confirmed by German amateur astronomer Johann Georg Palitzsch on Christmas Day 1758 — it became the first object ever shown to be periodic, and a powerful confirmation of Newtonian mechanics. Halley's Comet remains one of the most accessible test beds for understanding the formation and evolution of the Solar System.",
      ],
    },
  ],
  related: ["oort-cloud", "kuiper-belt", "pluto"],
};

/* ===================================================================== */
/*  SAGITTARIUS A* — THE BLACK HOLE AT THE CENTER OF THE MILKY WAY         */
/* ===================================================================== */

export const SAGITTARIUS_A: CelestialBody = {
  id: "sgr-a",
  name: "Sagittarius A*",
  category: "black-hole",
  tagline: "The supermassive black hole at the center of our galaxy.",
  overview:
    "Sagittarius A* (pronounced 'A-star') is the supermassive black hole at the center of the Milky Way galaxy, located about 27,000 light-years from Earth in the direction of the constellation Sagittarius. With a mass of approximately 4.3 million times that of the Sun, it is the gravitational anchor around which the entire galaxy rotates. In May 2022, the Event Horizon Telescope (EHT) collaboration released the first image of Sgr A* — only the second direct image of a black hole ever made, after M87* in 2019. Stars orbiting Sgr A* (notably the star S2) have been tracked for decades, providing the strongest evidence yet for the existence of supermassive black holes and a stringent test of general relativity in strong gravitational fields.",
  parentId: null,
  order: 14,
  renderOrbitRadius: 0,
  renderRadius: 1.0,
  color: "#0a0a18",
  accentColor: "#ff7a1a",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  data: {
    physical: [
      { label: "Mass", value: "~4.297 × 10⁶", unit: "Solar masses", source: "EHT Collaboration / UCLA Galactic Center Group" },
      { label: "Schwarzschild radius (event horizon)", value: "~12.7", unit: "million km (~0.085 AU)", source: "EHT" },
      { label: "Distance from Earth", value: "~27,000", unit: "light-years", source: "EHT" },
    ],
    orbital: [
      { label: "Position", value: "Galactic center", unit: "—", source: "—" },
      { label: "Orbits what?", value: "Orbits within the Milky Way's halo", unit: "—", source: "—" },
    ],
    atmosphere: [],
    composition: [
      { label: "Singularity", value: "Spacetime curvature", unit: "—", source: "—" },
      { label: "Accretion flow", value: "Hot plasma ~10⁹ K", unit: "—", source: "EHT" },
    ],
  },
  missions: [
    { name: "Event Horizon Telescope", agency: "International (EHT Collaboration)", year: "2017–", type: "orbiter", highlight: "Global network of radio telescopes that produced the first image of Sgr A*'s shadow in 2022." },
    { name: "Chandra X-ray Observatory", agency: "NASA", year: "1999–", type: "orbiter", highlight: "Provides continuous X-ray monitoring of Sgr A* flares from low Earth orbit." },
    { name: "GRAVITY (VLTI)", agency: "ESO", year: "2016–", type: "orbiter", highlight: "Tracked the star S2's closest approach to Sgr A* in 2018, confirming gravitational redshift predicted by general relativity." },
  ],
  facts: [
    { text: "Sgr A*'s event horizon is about 17× the diameter of the Sun — yet contains the mass of 4.3 million Suns.", citation: "EHT Collaboration" },
    { text: "If you replaced the Sun with Sgr A*, Earth would still orbit at the same speed — only the gravity matters, not the size.", citation: "NASA" },
    { text: "Material falling into Sgr A* takes days to spiral through the accretion flow; the EHT image is an average over many hours.", citation: "EHT Collaboration" },
    { text: "The star S2 orbits Sgr A* every 16 years; at closest approach it moves at 7,650 km/s — 2.5% of the speed of light.", citation: "ESO GRAVITY" },
  ],
  references: [
    { label: "EHT Collaboration — First Image of Sgr A*", publisher: "Peer-reviewed", url: "https://iopscience.iop.org/article/10.3847/2041-8213/ac6674" },
    { label: "NASA — Sagittarius A*", publisher: "NASA", url: "https://science.nasa.gov/universe/black-holes/" },
    { label: "UCLA Galactic Center Group", publisher: "Peer-reviewed", url: "https://galacticcenter.astro.ucla.edu/" },
  ],
  sections: [
    {
      id: "image",
      title: "Imaging the Invisible",
      body: [
        "Black holes are, by definition, invisible — their gravity is so strong that not even light can escape. The Event Horizon Telescope does not image the black hole itself, but rather the shadow it casts against the glowing ring of plasma swirling around it. To resolve something as small as Sgr A*'s event horizon from Earth required combining data from eight radio telescopes across the planet into a single Earth-sized virtual telescope, achieving an angular resolution of about 20 microarcseconds — equivalent to reading a newspaper headline in New York from a café in Paris.",
        "Sgr A* turned out to be far harder to image than the first EHT target, M87*, despite being closer. M87* is a thousand times more massive but also a thousand times farther away, so the two black holes appear about the same size in the sky. The difference is variability: M87*'s accretion flow changes over days, while Sgr A*'s changes over minutes, requiring the EHT team to develop entirely new analysis tools to produce a stable image. The result, released in May 2022, matched the predictions of general relativity to within experimental error — another confirmation that Einstein's theory holds even in the most extreme gravitational environments in the universe.",
      ],
    },
  ],
  related: ["milky-way", "andromeda", "sun"],
};

/* ===================================================================== */
/*  MILKY WAY GALAXY                                                       */
/* ===================================================================== */

export const MILKY_WAY: CelestialBody = {
  id: "milky-way",
  name: "The Milky Way",
  category: "galaxy",
  tagline: "Our home galaxy — a barred spiral of ~200 billion stars.",
  overview:
    "The Milky Way is the barred spiral galaxy that contains the Solar System. It has a diameter of approximately 100,000 light-years and is estimated to contain between 100 and 400 billion stars, along with a comparable number of planets and at least 10 billion white dwarfs, neutron stars, and black holes. The Solar System is located about 27,000 light-years from the Galactic Center, on the inner edge of the Orion Arm — a minor spiral arm between the larger Sagittarius and Perseus arms. The Milky Way is part of the Local Group of ~80 galaxies, which is itself part of the larger Laniakea Supercluster. The galaxy is on a collision course with the Andromeda Galaxy and will merge with it in roughly 4.5 billion years, forming a single elliptical galaxy nicknamed 'Milkomeda'.",
  parentId: null,
  order: 15,
  renderOrbitRadius: 0,
  renderRadius: 2.0,
  color: "#fff4d8",
  accentColor: "#a87dc8",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  data: {
    physical: [
      { label: "Diameter", value: "~100,000", unit: "light-years (visible disk)", source: "ESA Gaia" },
      { label: "Dark matter halo diameter", value: "~1.9", unit: "million light-years (est.)", source: "Peer-reviewed" },
      { label: "Stellar mass", value: "~6 × 10¹⁰", unit: "Solar masses", source: "ESA Gaia" },
      { label: "Total mass (incl. dark matter)", value: "~1.5 × 10¹²", unit: "Solar masses (est.)", source: "Peer-reviewed" },
    ],
    orbital: [
      { label: "Sun's distance from galactic center", value: "~27,000", unit: "light-years (~8,300 pc)", source: "ESA Gaia" },
      { label: "Sun's orbital period around galaxy", value: "~225–250", unit: "million years ('galactic year')", source: "ESA" },
      { label: "Sun's orbital velocity", value: "~220", unit: "km/s", source: "ESA" },
    ],
    atmosphere: [],
    composition: [
      { label: "Stars", value: "~100–400", unit: "billion", source: "ESA Gaia" },
      { label: "Interstellar gas + dust", value: "~10–15", unit: "% of baryonic mass", source: "ESA" },
      { label: "Dark matter", value: "~90", unit: "% of total mass (est.)", source: "Peer-reviewed" },
      { label: "Central black hole (Sgr A*)", value: "4.3 × 10⁶", unit: "Solar masses", source: "EHT Collaboration" },
    ],
  },
  missions: [
    { name: "Gaia", agency: "ESA", year: "2013–2025", type: "orbiter", highlight: "Mapped the positions and motions of >1 billion stars — the most precise 3D map of the Milky Way ever made." },
    { name: "Hubble Space Telescope", agency: "NASA/ESA", year: "1990–", type: "orbiter", highlight: "Provided decades of resolved imagery of Milky Way star clusters, nebulae, and the galactic center." },
    { name: "James Webb Space Telescope", agency: "NASA/ESA/CSA", year: "2022–", type: "orbiter", highlight: "Infrared observations pierce dust clouds to reveal star formation in the galactic plane." },
    { name: "Spitzer Space Telescope", agency: "NASA/JPL", year: "2003–2020", type: "orbiter", highlight: "Produced the 'GLIMPSE' infrared mosaic of the entire Milky Way plane." },
  ],
  facts: [
    { text: "The Milky Way is a barred spiral — its central bar of stars is about 27,000 light-years long.", citation: "ESA Gaia" },
    { text: "It is on a collision course with the Andromeda Galaxy; the two will merge in ~4.5 billion years.", citation: "NASA Hubble" },
    { text: "The Sun has orbited the Milky Way roughly 20 times since it formed — about 20 'galactic years'.", citation: "ESA" },
    { text: "~90% of the Milky Way's mass is dark matter — invisible matter detected only through its gravity.", citation: "Peer-reviewed" },
  ],
  references: [
    { label: "ESA — Gaia mission", publisher: "ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/Gaia" },
    { label: "NASA — The Milky Way", publisher: "NASA", url: "https://science.nasa.gov/resource/the-milky-way-galaxy/" },
  ],
  sections: [
    {
      id: "structure",
      title: "Anatomy of the Galaxy",
      body: [
        "The Milky Way has four major structural components. The thin disk is the flattened disk (~1,000 light-years thick) where most of the galaxy's gas, dust, and young stars reside, including the Sun. The thick disk is an older, more extended (~3,000 light-year thick) population of stars with lower heavy-element content. The central bulge — a roughly ellipsoidal region of old stars surrounding the galactic center — is crossed by a stellar bar about 27,000 light-years long. The dark matter halo is a vast, roughly spherical envelope of dark matter that extends far beyond the visible disk and provides most of the galaxy's gravitational mass.",
        "Spiral structure within the disk is a wave phenomenon: spiral arms are not fixed groups of stars but density waves that stars pass through as they orbit. When gas clouds encounter a spiral arm, they are compressed and triggered into forming new stars, which is why the arms glow with the blue light of massive young stars. The Sun lies in a small spur called the Orion Arm, between the larger Sagittarius and Perseus arms. Gaia's data has allowed astronomers to map the local spiral structure in unprecedented detail, revealing that the Milky Way is probably a four-armed spiral, at least in its outer regions.",
      ],
    },
    {
      id: "future",
      title: "The Great Collision",
      body: [
        "The Milky Way and the Andromeda Galaxy (M31) are falling toward each other at about 110 km/s and are expected to collide in roughly 4.5 billion years. The two galaxies are similar in mass, so the merger will be a major event: their spiral structures will be torn apart by tidal forces, and over the course of a few hundred million years they will settle into a single large elliptical galaxy nicknamed 'Milkomeda'. Despite the dramatic-sounding collision, individual stars are so far apart that direct stellar collisions will be exceedingly rare — the Sun (if it has not already been consumed as a red giant) is unlikely to hit another star.",
        "Recent work using Gaia data has refined the merger timeline and even suggested that a smaller galaxy, the Large Magellanic Cloud, may merge with the Milky Way first — about 2.4 billion years from now — and may slightly delay the Andromeda encounter. Regardless of the exact sequence, the long-term future of the Local Group is consolidation: over the next 10–100 billion years, all of its galaxies will likely merge into a single large elliptical system, while galaxies beyond our Local Group will recede forever as the universe expands.",
      ],
    },
  ],
  related: ["sgr-a", "andromeda", "sun"],
};

/* ===================================================================== */
/*  ANDROMEDA GALAXY                                                       */
/* ===================================================================== */

export const ANDROMEDA: CelestialBody = {
  id: "andromeda",
  name: "Andromeda Galaxy (M31)",
  category: "galaxy",
  tagline: "The nearest major galaxy — and the Milky Way's future merger partner.",
  overview:
    "The Andromeda Galaxy (Messier 31, or M31) is a barred spiral galaxy approximately 2.5 million light-years from Earth in the constellation Andromeda. It is the nearest large galaxy to the Milky Way, the largest galaxy in the Local Group (~1.5× the Milky Way's stellar mass), and is visible to the naked eye as a faint smudge in dark skies. Andromeda is on a collision course with the Milky Way and will merge with our galaxy in approximately 4.5 billion years. It hosts a supermassive black hole (M31*) at its center with a mass of roughly 100 million Suns, and is surrounded by a system of smaller satellite galaxies including M32 and M110.",
  parentId: null,
  order: 16,
  renderOrbitRadius: 0,
  renderRadius: 2.2,
  color: "#f0e0ff",
  accentColor: "#7050b0",
  renderOrbitalPeriod: 0,
  renderRotationPeriod: 0,
  axialTiltDeg: 0,
  data: {
    physical: [
      { label: "Diameter", value: "~152,000", unit: "light-years", source: "NASA" },
      { label: "Stellar mass", value: "~10¹¹", unit: "Solar masses (~1.5× Milky Way)", source: "ESA" },
      { label: "Number of stars", value: "~1", unit: "trillion (est.)", source: "NASA Hubble" },
    ],
    orbital: [
      { label: "Distance from Milky Way", value: "~2.5", unit: "million light-years", source: "ESA Hubble" },
      { label: "Approach velocity", value: "~110", unit: "km/s toward Milky Way", source: "NASA Hubble" },
      { label: "Merger with Milky Way", value: "~4.5", unit: "billion years from now (est.)", source: "NASA Hubble" },
    ],
    atmosphere: [],
    composition: [
      { label: "Stars", value: "~10¹²", unit: "(est.)", source: "NASA Hubble" },
      { label: "Central black hole (M31*)", value: "~10⁸", unit: "Solar masses (est.)", source: "Hubble" },
    ],
  },
  missions: [
    { name: "Hubble Space Telescope", agency: "NASA/ESA", year: "1990–", type: "orbiter", highlight: "Resolved Andromeda's stars individually, constraining the galaxy's mass and merger timeline with the Milky Way." },
    { name: "James Webb Space Telescope", agency: "NASA/ESA/CSA", year: "2022–", type: "orbiter", highlight: "Infrared observations of Andromeda's star-forming regions and dust structure." },
  ],
  facts: [
    { text: "Andromeda is the most distant object visible to the naked eye — 2.5 million light-years away.", citation: "NASA" },
    { text: "It contains roughly twice as many stars as the Milky Way — perhaps 1 trillion vs ~200–400 billion.", citation: "NASA Hubble" },
    { text: "Andromeda and the Milky Way will merge into a single elliptical galaxy ('Milkomeda') in ~4.5 billion years.", citation: "NASA Hubble" },
    { text: "Light we see from Andromeda today left the galaxy when early hominids were evolving on Earth.", citation: "—" },
  ],
  references: [
    { label: "NASA — Andromeda Galaxy (M31)", publisher: "NASA", url: "https://science.nasa.gov/galaxy/andromeda-galaxy-m31/" },
    { label: "HubbleSite — M31", publisher: "Hubble", url: "https://hubblesite.org/contents/news-releases/2012/news-2012-20" },
  ],
  sections: [
    {
      id: "merger",
      title: "The Future Collision",
      body: [
        "Hubble Space Telescope measurements of Andromeda's radial velocity — its motion toward or away from us — show that the galaxy is approaching the Milky Way at about 110 km/s. Combined with transverse motion measurements from Gaia, this implies that Andromeda and the Milky Way will have their first close pass in about 4 billion years and will fully merge into a single elliptical galaxy over the following few hundred million years. The result will be 'Milkomeda' — a large, smooth, roughly ellipsoidal galaxy with little gas and no spiral structure, populated mostly by old red stars.",
        "Despite the violent-sounding collision, the chance that our Sun will directly collide with another star during the merger is essentially zero — stars are simply too small and too far apart. The bigger effects are gravitational: the Sun will likely be scattered into a new, more eccentric orbit around the merged galaxy, possibly much farther from the center than it is today. By the time the merger completes, however, the Sun will have already become a red giant and likely consumed Earth — so the question of where the Sun ends up is mainly of academic interest.",
      ],
    },
  ],
  related: ["milky-way", "sgr-a", "sun"],
};
