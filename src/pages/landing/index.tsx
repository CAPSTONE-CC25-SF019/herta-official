import Hero from "./hero";
import HomeSection from "./home";
import Footer from "./footer";
import Navbar from "../../components/ui/navbar";

export default function LandingPage() {
  const nav = [{
    name: "Home",
    link: "/"
  },
  {
    name: "About",
    link: "/about"
  },
  {
    name: "Disease",
    link: "/disease"
  }];
  return (
    <>
      <Hero />
      <Navbar srcLogo="../../assets/navbar/logo.png" navItem={nav} />
      <HomeSection />
      <section className="relative bg-herta-200 h-svh"></section>
      <Footer />
    </>
  );
}
