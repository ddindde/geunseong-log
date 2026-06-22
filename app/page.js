export const revalidate = 0; //Next.js의 캐시 설정

import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import CtaBand from "./components/CtaBand";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <CtaBand />
    </main>
  );
}
