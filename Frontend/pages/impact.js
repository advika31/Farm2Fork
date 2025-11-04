import { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { impactStats } from "../lib/mockData";
import styles from "../styles/Impact.module.css";

export default function ImpactPage() {
  useEffect(() => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statValue = entry.target.querySelector(".stat-value");
            if (statValue && !statValue.classList.contains("animated")) {
              statValue.classList.add("animated");
              animateCounter(statValue);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".stat-card").forEach((card) => {
      observer.observe(card);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Our Impact - TraceRoots</title>
      </Head>
      <Navbar />
      <div className={styles.impact}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Our Impact</h1>
            <p className={styles.heroSubtitle}>
              Building a sustainable future, one transaction at a time
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} stat-card`}>
              <div className={styles.statIcon}>
                <i className="fas fa-coins"></i>
              </div>
              <div
                className={`${styles.statValue} stat-value`}
                data-target={impactStats.totalTokens}
              >
                0
              </div>
              <div className={styles.statLabel}>
                Total Tokens in Circulation
              </div>
            </div>
            <div className={`${styles.statCard} stat-card`}>
              <div className={styles.statIcon}>
                <i className="fas fa-utensils"></i>
              </div>
              <div
                className={`${styles.statValue} stat-value`}
                data-target={impactStats.mealsDonated}
              >
                0
              </div>
              <div className={styles.statLabel}>Meals Donated</div>
            </div>
            <div className={`${styles.statCard} stat-card`}>
              <div className={styles.statIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <div
                className={`${styles.statValue} stat-value`}
                data-target={impactStats.verifiedBatches}
              >
                0
              </div>
              <div className={styles.statLabel}>Verified Batches</div>
            </div>
          </div>

          <div className={styles.visualization}>
            <h2 className={styles.sectionTitle}>Global Impact Map</h2>
            <div className={styles.mapPlaceholder}>
              <i className="fas fa-globe"></i>
              <p>Interactive world map showing our global reach</p>
              <div className={styles.mapStats}>
                <div className={styles.mapStat}>
                  <strong>15+</strong> Countries
                </div>
                <div className={styles.mapStat}>
                  <strong>500+</strong> Cities
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chartSection}>
            <h2 className={styles.sectionTitle}>Growth Metrics</h2>
            <div className={styles.chartPlaceholder}>
              <i className="fas fa-chart-bar"></i>
              <p>Monthly impact growth visualization</p>
              <div className={styles.barChart}>
                {[65, 75, 85, 90, 95, 100].map((height, index) => (
                  <div key={index} className={styles.bar}>
                    <div
                      className={styles.barFill}
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
