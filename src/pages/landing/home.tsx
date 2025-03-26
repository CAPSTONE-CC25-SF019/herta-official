import nurse from "../../assets/images/home-section/nurse.png";
import particle1 from "../../assets/images/home-section/Particle Round 1.svg";
import particle2 from "../../assets/images/home-section/Particle Round 2.svg";
import CardFeature from "../../components/general/landing/home/card-feature";
import GradientRadial from "../../components/ui/particles/gradient-radial";

export default function HomeSection() {
  return (
    <section className="bg-herta-100 relative max-w-screen overflow-hidden">
      <div className="mx-auto flex h-[69rem] w-full max-w-[600px] flex-col lg:h-[58rem]">
        <div className="relative mx-auto h-full w-full max-w-[600px]">
          <div className="absolute top-0 right-0 bottom-0 left-0 mt-1 w-full space-y-2 p-4 lg:hidden">
            <CardFeature
              title="AI Health Check"
              description="Get instant health assessments with our trusted AI technology. Try it
            now!"
              callToActionText="Try now"
              callToActionLink="/"
            />

            <CardFeature
              title="Research Diseases Securely"
              description="Explore detailed information about diseases and symptoms. Search now!"
              callToActionText="Search now"
              callToActionLink="/"
            />

            <CardFeature
              title="Discover How It Works"
              description="Learn how our AI-driven platform can help you stay healthy. Check it out!"
              callToActionText="Check now"
              callToActionLink="/"
            />
          </div>
        </div>
        <div className="pointer-events-none relative h-full lg:pointer-events-auto">
          <div className="pointer-events-none mx-auto w-full max-w-[400px] md:max-w-[450px] lg:max-w-[550px]">
            <div className="relative size-full">
              <div>
                <img
                  src={nurse}
                  alt="Home"
                  className="relative z-10 size-full object-contain object-center"
                />
                <GradientRadial className="lg:20 absolute top-0 -right-20 -z-10" />
                <GradientRadial className="lg:60 absolute top-44 -left-20 -z-10" />
                <img
                  src={particle1}
                  alt="particle"
                  className="absolute -right-5 -bottom-8 z-10 size-52"
                />
                <img
                  src={particle2}
                  alt="particle"
                  className="absolute -bottom-10 -left-10 z-10 size-64"
                />
              </div>

              <div className="lg:hidden">
                <span className="bg-herta-400 absolute top-72 left-0 z-20 m-2 inline-block rounded-full px-6 py-2 text-sm text-white">
                  Instant Result
                </span>
                <span className="bg-herta-300 absolute top-56 right-0 z-20 m-2 inline-block rounded-full px-6 py-2 text-sm text-white">
                  Trusted Information
                </span>
                <span className="bg-herta-200 absolute -right-7 bottom-16 z-20 m-2 inline-block rounded-full px-6 py-2 text-sm text-white">
                  Easy to Use
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="absolute top-52 -left-52">
              <div className="relative w-90">
                <CardFeature
                  title="AI Health Check"
                  description="Get instant health assessments with our trusted AI technology. Try it
              now!"
                  callToActionText="Try now"
                  callToActionLink="/"
                />
                <span className="bg-herta-400 absolute right-10 -bottom-5 z-10 inline-block rounded-full px-6 py-2 text-sm text-white">
                  Instant Result
                </span>
              </div>
            </div>
            <div className="absolute top-36 -right-44">
              <div className="relative w-[24rem]">
                <CardFeature
                  title="Research Diseases Securely"
                  description="Explore detailed information about diseases and symptoms. Search now!"
                  callToActionText="Search now"
                  callToActionLink="/"
                  className="!pb-10"
                />

                <span className="bg-herta-400 absolute -bottom-4 left-10 z-10 inline-block rounded-full px-6 py-2 text-sm text-white">
                  Trusted Information
                </span>
              </div>
            </div>
            <div className="absolute -right-50 bottom-20 z-10">
              <div className="relative w-[22rem]">
                <CardFeature
                  title="Discover How It Works"
                  description="Learn how our AI-driven platform can help you stay healthy. Check it out!"
                  callToActionText="Check now"
                  callToActionLink="/"
                />

                <span className="bg-herta-400 absolute right-10 -bottom-5 z-10 inline-block rounded-full px-6 py-2 text-sm text-white">
                  Easy to Use
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
