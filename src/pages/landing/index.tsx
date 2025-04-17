import Hero from "./hero";
import HomeSection from "./home";
import Footer from "./footer";
import Navbar from "../../components/ui/navbar";
import HowItWorks from "./how-it-works";
import logo from "../../assets/images/logo.png"

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
      <Navbar srcLogo={logo} navItem={nav} />
      <HomeSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
