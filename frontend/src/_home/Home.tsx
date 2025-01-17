import FAQ from "../components/_home/FAQ";
import Feature from "../components/_home/Feature";
import Footer from "../components/_home/Footer";
import Hero from "../components/_home/Hero";
import HomeNav from "../components/_home/HomeNav";
import HowItWorks from "../components/_home/HowItWorks";
import Pricing from "../components/_home/Pricing";
import Testimonials from "../components/_home/Testimonial";

const Home = () => {
  return (
    <section className="bg-primary w-full flex justify-start items-center flex-col">
      <HomeNav />
      <Hero />
      <Feature />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </section>
  );
};

export default Home;
