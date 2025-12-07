export const SITE = {
  name: "aradina",
  tagline: "Smart irrigation made simple.",
  subTagline:
    "Sensors, insights, and automation to save water, boost yield, and cut costs.",
  ctaPrimary: "Book a demo",
};

export const FEATURES = [
  {
    title: "Soil Sensing",
    body:
      "Solar-powered field sensors track moisture, salinity, and temperature.",
    icon: "soil",
    details: [
      "Deploy probe arrays that measure the moisture profile every 15 minutes so you always know when and where the field needs irrigation.",
      "Data streams automatically sync through 4G and BLE backhaul, even in remote blocks without existing connectivity.",
    ],
    specs: [
      {
        parameter: "Volumetric water content",
        range: "0–100% VWC",
        precision: "±2% after soil calibration",
      },
      {
        parameter: "Soil temperature",
        range: "-40°C to 80°C",
        precision: "±0.5°C",
      },
      {
        parameter: "Soil salinity (EC)",
        range: "0–20000 uS/cm",
        precision: "±3% of reading",
      },
      {
        parameter: "Reporting cadence",
        range: "Defaults every 15 minutes",
        precision: "Can be adjusted per device",
      },
    ],
  },
  {
    title: "Real-time Insights",
    body:
      "See live field conditions, set alerts, and track trends over time on web & mobile.",
    icon: "insights",
    details: [
      "Dashboards highlight anomalies, trend lines, and irrigation set-points at a glance for each block and device.",
      "Configurable alerts let your team know about issues instantly across all your fields.",
    ],
  },
  {
    title: "Fleet Automation",
    body:
      "Remotely schedule pumps, valves, and field hardware from one dashboard.",
    icon: "automation",
    comingSoon: true,
    details: [
      "Integrate pump stations, valves, and fertigation hardware with digital twins so you can trigger sequences without leaving the office.",
      "Automation playbooks help you standardize irrigation programs.",
    ],
  },
  {
    title: "Easy deployment",
    body:
      "Plug-and-play kits with BLE setup, 4G connectivity, and rugged enclosures.",
    icon: "deployment",
    details: [
      "Install kits with simple BLE provisioning workflows that guide crews through mounting, calibration, and connectivity checks.",
      "Rugged IP67 enclosures and solar power keeps the hardware online with minimal maintenance, even through dust and heat.",
    ],
  },
];

export const PRICING = [
  {
    name: "Starter",
    capability: "Insight",
    description:
      "Core field visibility with essential alerts and dashboards for trial deployments.",
    monthlyRate: 13,
    unitMonthly: "per month per device",
    unitYearly: "per year per device",
    highlight: false,
    features: [
      "Live moisture, temperature, and salinity",
      "Platform and App access",
      "BLE support",
      "CSV data export",
    ],
  },
  {
    name: "Grower",
    capability: "Automate",
    description:
      "Advanced irrigation intelligence, collaboration tools, and proactive support.",
    monthlyRate: 15,
    unitMonthly: "per month per device",
    unitYearly: "per year per device",
    highlight: false,
    comingSoon: true,
    features: [
      "All of Starter, plus:",
      "AI-powered Irrigation guidance",
      "Remotely control irrigation",
      "Crop health forecasting",
    ],
  },
  {
    name: "Enterprise",
    capability: "Integrate",
    description:
      "End-to-end orchestration, data federation, and enterprise-grade governance.",
    monthlyRate: null,
    customLabel: "Custom",
    unitMonthly: "",
    unitYearly: "",
    highlight: false,
    features: [
      "All of Grower, plus:",
      "Farm Management System",
      "ERP Integration",
    ],
  },
];

export const SENSOR_PRICING = {
  tiers: [
    { min: 1, max: 10, discount: 0 },
    { min: 11, max: 25, discount: 0.1333 },
    { min: 26, max: null, discount: 0.2667 },
  ],
  yearlyDiscount: 0.1,
};

export const CONTACT = {
  email: "ziad@aradina.solutions",
  phone: "+20 109 555 6608",
  address: "Cairo, Egypt",
};
