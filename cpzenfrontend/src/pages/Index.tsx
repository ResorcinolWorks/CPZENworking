import Hero from "@/components/landing/Hero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Reviews from "@/components/landing/Reviews";
import OpenSource from "@/components/landing/OpenSource";

const Index = () => {
  return (
    <>
      <Hero />
      <section id="features">
      <WhyChooseUs />
      </section>
      <section id="reviews">
      <Reviews />
      </section>
      <section id="open-source">
      <OpenSource />
      </section>
    </>
  );
};

export default Index;
