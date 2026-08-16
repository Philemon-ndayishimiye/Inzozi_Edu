import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import HowItWorks from '../Components/HowItWorks';
import Navigation from '../Components/Navigation';
import ParentSection from '../Components/ParentSection';
import PowerfulFeaturesSection from '../Components/PowerfulFeaturesSection';
import ResourcesSupportSection from '../Components/ResourcesSupportSection';
import SchoolOwnerSection from '../Components/SchoolOwnerSection';
import SchoolSection from '../Components/SchoolSection';
import TrustedBySection from '../Components/TrustedBySection';
import WhyChooseInzoziSection from '../Components/WhyChooseInzoziSection';
import { useUser } from '../Hooks/useUser';

export default function LandingPage() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <Navigation />
      <div className="pt-[40px]">
        <Hero />
      </div>

      <SchoolSection />
      <WhyChooseInzoziSection />
      <ParentSection />
      <PowerfulFeaturesSection />
      <SchoolOwnerSection />
      <div id="howitWorks">
        <HowItWorks />
      </div>

      <ResourcesSupportSection />
      <TrustedBySection />
      <Footer />
    </div>
  );
}
