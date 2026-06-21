import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <a href="/" className="logo">
          <span className="logo-dot"></span>
          FitLog
        </a>
        <nav>
          <Link href="/">홈</Link>
          <Link href="/log">운동기록</Link>
          <Link href="/about">소개</Link>
          <Link href="/log/new" className="nav-cta">
            시작하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
