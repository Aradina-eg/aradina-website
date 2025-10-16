export const SITE = {
  name: "aradina",
  tagline: "Smart irrigation made simple.",
  subTagline:
    "Sensors, insights, and automation to save water, boost yield, and cut costs.",
  ctaPrimary: "Get a quote",
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
    price: "$15",
    unit: "per month",
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
    price: "$13",
    unit: "per month per sensor",
    highlight: true,
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
    price: "Custom",
    unit: "",
    highlight: false,
    features: [
      "All of Grower, plus:",
      "Farm Management System",
      "ERP Integration",
    ],
  },
];

export const CONTACT = {
  email: "ziad@aradina.solutions",
  phone: "+20 109 555 6608",
  address: "Cairo, Egypt",
};
