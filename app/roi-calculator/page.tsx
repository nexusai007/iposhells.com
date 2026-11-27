import RoiCalculator from "./calculator";

export const metadata = {
  title: "Business Automation ROI Calculator",
  description: "Estimate the annual cost of repetitive work and the potential value of recovered employee capacity using your own assumptions.",
  alternates: { canonical: "/roi-calculator" }
};

export default function RoiCalculatorPage() {
  return <RoiCalculator />;
}
