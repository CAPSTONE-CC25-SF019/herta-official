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
    link: "/#about",
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
      <Navbar srcLogo="../../assets/navbar/logo.png" navItem={nav} />
      <HomeSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
