import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

export default function LandingPage() {
  const router = useRouter();

  const Wrapper = styled.div`
    display: grid;
    grid-template-column: minmax(95%, 1193px);
    justify-content: center;
    background: blueviolet;
  `;
  const Header = styled(Wrapper)``;
  return (
    <div className="landing">
      <Wrapper>
        <div className="header__logo">
          <svg
            width="46"
            height="47"
            viewBox="0 0 46 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="header__logoImg"
          >
            <rect width="46" height="46" rx="23" fill="#C4C4C4" />
            <path
              d="M17.0574 20.6218L9.04492 46H36.955L30.8121 10.337L21.1972 27.701L17.0574 20.6218Z"
              fill="white"
              stroke="white"
            />
            <circle cx="18.736" cy="35.0168" r="1.42135" fill="#C4C4C4" />
            <circle cx="27.7807" cy="35.0168" r="1.42135" fill="#C4C4C4" />
          </svg>
          <p className="header__logoText">meegu</p>
        </div>
      </Wrapper>

      <main>
        <section className="hero">
          <h1 className="hero__heading">Level up your Research Experience</h1>
          <p className="hero__text">
            Meegu is a platform that helps you make your research journey easier
            and more meaningful by connecting you to all actors of research in a
            system that works!
          </p>
          <div className="hero__action">
            <button className="hero__btnGoogle">Continue with Google</button>
            <button className="hero__btnFacebook">
              Continue with Facebook
            </button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="brand"></div>
        <nav>
          <ul className="nav">
            <li className="nav__item">
              <Link href="#">Features</Link>
            </li>
            <li className="nav__item">
              <Link href="#">Pricing</Link>
            </li>
            <li className="nav__item">
              <Link href="#">Contact us</Link>
            </li>
            <li className="nav__item">
              <Link href="#">About us</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
