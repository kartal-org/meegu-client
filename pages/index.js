import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/pages/landing.module.scss";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <svg
            width="46"
            height="47"
            viewBox="0 0 46 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.header__logoImg}
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
          <p className={styles.header__logoText}>meegu</p>
        </div>
      </header>
      <main>
        <section className={styles.hero}>
          <h1 className={styles.hero__heading}>Level up your Research Experience</h1>
          <p className={styles.hero__text}>
            Meegu is a platform that helps you make your research journey easier
            and more meaningful by connecting you to all actors of research in a
            system that works!
          </p>
          <div className={styles.hero__action}>
            <button className={styles.hero__btnGoogle}>Continue with Google</button>
            <button className={styles.hero__btnFacebook}>
              Continue with Facebook
            </button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.brand}></div>
        <nav>
          <ul className={styles.nav}>
            <li className={styles.nav__item}>
              <Link href="#">Features</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="#">Pricing</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="#">Contact us</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="#">About us</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
