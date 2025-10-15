export const SITE = {
  name: "aradina",
  tagline: "Smart agriculture made simple.",
  subTagline:
    "Sensors, insights, and automation to save water, boost yield, and cut costs.",
  ctaPrimary: "Get a quote",
  ctaSecondary: "View pricing",
};

export const FEATURES = [
  {
    title: "Soil & climate sensing",
    body:
      "Solar-powered field sensors track moisture, salinity, temperature and more.",
  },
  {
    title: "Real-time dashboard",
    body:
      "See live field conditions, set alerts, and track trends over time on web & mobile.",
  },
  {
    title: "Irrigation guidance",
    body:
      "AI-driven recommendations tell you when and how much to irrigate.",
  },
  {
    title: "Easy deployment",
    body:
      "Plug-and-play kits with BLE setup, 4G connectivity, and rugged enclosures.",
  },
];

export const PRICING = [
  {
    name: "Starter",
    price: "$15",
    unit: "per month",
    highlight: false,
    blurb: "For trials and small plots",
    features: [
      "1 sensor kit",
      "Live moisture & temp",
      "Basic analytics",
    ],
  },
  {
    name: "Grower",
    price: "$13",
    unit: "per month per sensor",
    highlight: true,
    blurb: "Best for mid-size farms",
    features: [
      "Live moisture & temp",
      "Irrigation guidance",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    highlight: false,
    blurb: "Large farms & agribusiness",
    features: [
      "Fleet management",
      "API & integrations",
    ],
  },
];

export const CONTACT = {
  email: "ziad@aradina.solutions",
  phone: "+20 109 555 6608",
  address: "Cairo, Egypt",
};
