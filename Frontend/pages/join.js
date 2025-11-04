import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Join.module.css";

export default function JoinPage() {
  return (
    <>
      <Head>
        <title>Join Our Network - TraceRoots</title>
      </Head>
      <Navbar />
      <div className={styles.join}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Join Our Network</h1>
            <p className={styles.heroSubtitle}>
              Be part of the movement towards zero-waste and food security
            </p>
          </div>

          <div className={styles.cards}>
            <div className={styles.joinCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-user-tie"></i>
              </div>
              <h2 className={styles.cardTitle}>Are you a Farmer?</h2>
              <p className={styles.cardDescription}>
                Register your farm, verify your crops with AI, and earn Impact
                Tokens for your surplus donations.
              </p>
              <ul className={styles.cardBenefits}>
                <li>
                  <i className="fas fa-check"></i> AI-powered crop verification
                </li>
                <li>
                  <i className="fas fa-check"></i> Earn Impact Tokens
                </li>
                <li>
                  <i className="fas fa-check"></i> Connect with NGOs
                </li>
              </ul>
              <Link href="/farmer" className="btn-primary btn-large">
                Join as Farmer
              </Link>
            </div>

            <div className={styles.joinCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-industry"></i>
              </div>
              <h2 className={styles.cardTitle}>Are you a Processor?</h2>
              <p className={styles.cardDescription}>
                Partner with us to create traceable food products and build
                trust with consumers through blockchain verification.
              </p>
              <ul className={styles.cardBenefits}>
                <li>
                  <i className="fas fa-check"></i> Product traceability
                </li>
                <li>
                  <i className="fas fa-check"></i> Consumer trust
                </li>
                <li>
                  <i className="fas fa-check"></i> Sustainable practices
                </li>
              </ul>
              <Link href="/processor" className="btn-primary btn-large">
                Partner with Us
              </Link>
            </div>

            <div className={styles.joinCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-hands-helping"></i>
              </div>
              <h2 className={styles.cardTitle}>Are you an NGO?</h2>
              <p className={styles.cardDescription}>
                Register to receive verified surplus food donations and help
                feed communities in need.
              </p>
              <ul className={styles.cardBenefits}>
                <li>
                  <i className="fas fa-check"></i> Verified donations
                </li>
                <li>
                  <i className="fas fa-check"></i> Real-time tracking
                </li>
                <li>
                  <i className="fas fa-check"></i> Impact reporting
                </li>
              </ul>
              <Link href="/ngo" className="btn-primary btn-large">
                Register for Donations
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
