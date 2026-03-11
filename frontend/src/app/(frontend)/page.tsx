import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HostingPlans from "@/components/HostingPlans";
import Portfolio from "@/components/Portfolio";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HostingPlans />
      <Portfolio />
      <ContactForm />
    </>
  );
}