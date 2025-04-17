import { Link } from "react-router-dom";
import { GithubLogo, YoutubeLogo, InstagramLogo } from "@phosphor-icons/react";
import unlogo from "../../assets/images/unlogo.png"

export default function Footer() {
    return (
      <footer className="-mt-[4.5rem] text-white relative overflow-hidden">
        <div className="relative w-full overflow-hidden leading-none">
          <svg className="relative w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 220" preserveAspectRatio="none">
            <path fill="#009DF9" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,208C384,224,480,224,576,208C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192V320H0Z"></path>
            <path fill="#008FFB" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,181.3C672,171,768,181,864,197.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160V320H0Z"></path>
            <path fill="#037ffa" fillOpacity="1" d="M 0 262 L 74 243 C 203 220 166 221 287 255 C 380 282 487 285 565 273 C 658 258 678 236 729 221 C 837 193 1014 254 1083 259 C 1157 257 1191 255 1251 246 C 1309 234 1389 224 1440 182 V 320 H 0 Z"></path>
          </svg>
        </div>
        <div className="bg-herta-400 flex flex-col items-center sm:items-start space-y-3 p-10">
          <Link to="/">
            <img src={unlogo} alt="Logo" className="max-w-38 sm:-ml-4" />
          </Link>
          <p className="text-lg">Health Prediction & Analytic</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="GitHub">
              <GithubLogo size={34} weight="regular" />
            </a>
            <a href="#" aria-label="YouTube">
              <YoutubeLogo size={34} weight="fill" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramLogo size={34} weight="regular" />
            </a>
          </div>
          <p className="text-base text-center sm:self-center mt-[4rem]">&copy; 2025 HERTA. All rights reserved.</p>
        </div>
      </footer>
    );
  }