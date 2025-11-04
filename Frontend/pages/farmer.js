import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { farmerStats, farmerBatches } from "../lib/mockData";
import styles from "../styles/Dashboard.module.css";
import Modal from "../components/Modal";

export default function FarmerDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleRegisterBatch = () => {
    setShowModal(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setShowModal(false), 1000);
      }
    }, 300);
  };

  return (
    <>
      <Head>
        <title>Farmer Dashboard - TraceRoots</title>
      </Head>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Farmer Dashboard</h1>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-star"></i>
              </div>
              <div className={styles.statValue}>{farmerStats.totalTokens}</div>
              <div className={styles.statLabel}>Total Impact Tokens</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <div className={styles.statValue}>
                {farmerStats.batchesVerified}
              </div>
              <div className={styles.statLabel}>Batches Verified</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <div className={styles.statValue}>
                {farmerStats.surplusDonated}kg
              </div>
              <div className={styles.statLabel}>Surplus Donated</div>
            </div>
          </div>

          {/* Action Button */}
          <div className={styles.actionSection}>
            <button
              className="btn-primary btn-large"
              onClick={handleRegisterBatch}
            >
              <i className="fas fa-plus"></i> Register New Batch
            </button>
          </div>

          {/* Batches List */}
          <div className={styles.tableSection}>
            <h2 className={styles.sectionTitle}>My Batches</h2>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div>Crop</div>
                <div>Date</div>
                <div>Quantity</div>
                <div>Status</div>
              </div>
              {farmerBatches.map((batch) => (
                <div key={batch.id} className={styles.tableRow}>
                  <div>{batch.crop}</div>
                  <div>{batch.date}</div>
                  <div>{batch.quantity}</div>
                  <div>
                    <span className={`${styles.badge} ${styles[batch.status]}`}>
                      {batch.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modalContent}>
            <h2>Register New Batch</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Crop Type</label>
                <input type="text" placeholder="e.g., Tomatoes" />
              </div>
              <div className={styles.formGroup}>
                <label>Quantity (kg)</label>
                <input type="number" placeholder="e.g., 150" />
              </div>
              <div className={styles.formGroup}>
                <label>Upload Crop Images</label>
                <input type="file" accept="image/*" multiple />
              </div>
              <div className={styles.progressSection}>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className={styles.progressText}>
                      Generating AI Digital Fingerprint... {uploadProgress}%
                    </p>
                  </>
                )}
                {uploadProgress >= 100 && (
                  <p className={styles.successText}>
                    <i className="fas fa-check-circle"></i> Batch registered
                    successfully!
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={uploadProgress > 0}
              >
                Submit Batch
              </button>
            </form>
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
}
