import React from "react";
import MentorsSection from "../components/aboutUs-components/MentorsSection";
import TeamsSection from "../components/aboutUs-components/TeamsSection";
import TestimonialSection from "../components/aboutUs-components/TestimonialSection";
import AssuranceSection from "../components/home-components/AssuranceSection";
import Banner from "../components/aboutUs-components/Banner";
export default function About() {
  return <>
  <main className="pt-[110px] md:pt-[100px] sm:pt-[85px] space-y-10 ">
    <section >
      <Banner/>
    </section>
    <section>
      <AssuranceSection/>
    </section>
    <section>
      <MentorsSection/>
    </section>
    <section>
      <TeamsSection/>
    </section>
    <section>
      <TestimonialSection/>
    </section>
  </main>
  </>
}
