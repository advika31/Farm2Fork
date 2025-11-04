import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    // Animated counter script
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString();
        }
      };
      updateCounter();
    };

    // Intersection Observer for counters
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statValue = entry.target.querySelector(".stat-value");
          if (statValue && !statValue.classList.contains("animated")) {
            statValue.classList.add("animated");
            animateCounter(statValue);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll(".stat-card").forEach((card) => {
      observer.observe(card);
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          TraceRoots - AI-Verified Food Traceability & Zero-Waste Network
        </title>
      </Head>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.patternOverlay}>
            <div className={styles.patternLeaf}>
              <i className="fas fa-leaf"></i>
            </div>
            <div className={styles.patternNodes}>
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className={styles.patternTruck}>
              <i className="fas fa-truck"></i>
            </div>
          </div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            AI-Verified Authenticity. Zero-Waste Impact.
          </h1>
          <p className={styles.heroSubtext}>
            TraceRoots uses AI fingerprints and blockchain to verify food
            origins and ensure surplus reaches those in need.
          </p>

          <div className={styles.infoCards}>
            <div className={`${styles.infoCard} ${styles.greenCard}`}>
              <div className={styles.cardIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <p className={styles.cardText}>
                Batch #T-8192 (Tomatoes) just verified from GreenAcres Farm.
              </p>
            </div>
            <div className={`${styles.infoCard} ${styles.blueCard}`}>
              <div className={styles.cardIcon}>
                <i className="fas fa-truck"></i>
              </div>
              <p className={styles.cardText}>
                AI Route Optimized: 20kg surplus from FreshDistro headed to
                Delhi Food Bank.
              </p>
            </div>
            <div className={`${styles.infoCard} ${styles.yellowCard}`}>
              <div className={styles.cardIcon}>
                <i className="fas fa-star"></i>
              </div>
              <p className={styles.cardText}>
                +50 Impact Tokens just awarded to GreenAcres for their donation.
              </p>
            </div>
          </div>

          <div className={styles.heroCtas}>
            <Link href="/consumer" className="btn-primary btn-large">
              Trace Your Product
            </Link>
            <Link href="/join" className="btn-outline btn-large">
              Join Us as a Farmer
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.workflow}>
            <div className={styles.workflowCard}>
              <div className={styles.workflowIcon}>
                <i className="fas fa-user-tie"></i>
              </div>
              <h3 className={styles.workflowTitle}>The Farm</h3>
              <p className={styles.workflowText}>
                AI generates a Digital Fingerprint from crop images, nutrients,
                and origin.
              </p>
              <div className={styles.workflowArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className={styles.workflowCard}>
              <div className={styles.workflowIcon}>
                <i className="fas fa-link"></i>
              </div>
              <h3 className={styles.workflowTitle}>The Blockchain</h3>
              <p className={styles.workflowText}>
                Fingerprint is secured and verified immutably.
              </p>
              <div className={styles.workflowArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className={styles.workflowCard}>
              <div className={styles.workflowIcon}>
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className={styles.workflowTitle}>The Consumer</h3>
              <p className={styles.workflowText}>
                Consumers trace the full journey with one scan.
              </p>
              <div className={styles.workflowArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className={styles.workflowCard}>
              <div className={styles.workflowIcon}>
                <i className="fas fa-sync-alt"></i>
              </div>
              <h3 className={styles.workflowTitle}>The Impact Loop</h3>
              <p className={styles.workflowText}>
                AI routes surplus food to NGOs, rewarding farmers with Impact
                Tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className={styles.impact}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            Our Commitment to a Sustainable Future
          </h2>
          <p className={styles.sectionSubtitle}>
            Empowering farmers, feeding communities, and protecting the planet.
          </p>

          <div className={styles.impactStats}>
            <div className={`${styles.statCard} stat-card`}>
              <div className={styles.statIcon}>
                <i className="fas fa-seedling"></i>
              </div>
              <div
                className={`${styles.statValue} stat-value`}
                data-target="10452"
              >
                0
              </div>
              <div className={styles.statLabel}>KG Food Rescued</div>
            </div>

            <div className={`${styles.statCard} stat-card`}>
              <div className={styles.statIcon}>
                <i className="fas fa-utensils"></i>
              </div>
              <div
                className={`${styles.statValue} stat-value`}
                data-target="31356"
              >
                0
              </div>
              <div className={styles.statLabel}>Meals Delivered</div>
            </div>

            <div className={`${styles.statCard} stat-card`}>
              <div className={styles.statIcon}>
                <i className="fas fa-users"></i>
              </div>
              <div
                className={`${styles.statValue} stat-value`}
                data-target="1200"
              >
                0
              </div>
              <div className={styles.statLabel}>Farmers in Our Network</div>
            </div>
          </div>

          <div className={styles.impactVisual}>
            <div className={styles.communityIllustration}>
              <div className={styles.illustrationElements}></div>
            </div>
          </div>

          <div className={styles.impactCta}>
            <Link href="/impact" className="btn-primary btn-large">
              View Our Full Impact Report
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
