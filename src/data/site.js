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
      "Solar-powered field sensors track moisture, salinity, temperature and more.",
    icon: "soil",
  },
  {
    title: "Real-time Insights",
    body:
      "See live field conditions, set alerts, and track trends over time on web & mobile.",
    icon: "insights",
  },
  {
    title: "Fleet Automation",
    body:
      "Remotely schedule pumps, valves, and field hardware from one dashboard.",
    icon: "automation",
    comingSoon: true,
  },
  {
    title: "Easy deployment",
    body:
      "Plug-and-play kits with BLE setup, 4G connectivity, and rugged enclosures.",
    icon: "deployment",
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
    highlight: true,
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
