import Hero from "./hero";
import HomeSection from "./home";
import Footer from "./footer";
import Navbar from "../../components/ui/navbar";
import HowItWorks from "./how-it-works";

const nav = [
  {
    name: "Home",
    link: "/#home",
  },
  {
    name: "Analytic",
    link: "/health-analytic",
  },
  {
    name: "History",
    link: "/history",
  },
];

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Navbar srcLogo="/src/assets/images/logo.png" navItem={nav} />
      <HomeSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
