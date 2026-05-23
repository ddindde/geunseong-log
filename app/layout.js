import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "근성 로그 — Muscle Archive",
  description: "오늘의 운동을 기록하고 꾸준함을 시각화하는 피트니스 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
