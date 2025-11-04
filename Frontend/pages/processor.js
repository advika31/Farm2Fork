import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { processorStats, processorProducts } from "../lib/mockData";
import styles from "../styles/Dashboard.module.css";
import Modal from "../components/Modal";

export default function ProcessorDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateProduct = () => {
    setShowModal(true);
  };

  const handleQRScan = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Processor Dashboard - TraceRoots</title>
      </Head>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Processor Dashboard</h1>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-box"></i>
              </div>
              <div className={styles.statValue}>
                {processorStats.productsCreated}
              </div>
              <div className={styles.statLabel}>Products Created</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-coins"></i>
              </div>
              <div className={styles.statValue}>
                {processorStats.tokensEarned}
              </div>
              <div className={styles.statLabel}>Tokens Earned</div>
            </div>
          </div>

          <div className={styles.actionSection}>
            <button
              className="btn-primary btn-large"
              onClick={handleCreateProduct}
            >
              <i className="fas fa-plus"></i> Create New Product Batch
            </button>
          </div>

          <div className={styles.tableSection}>
            <h2 className={styles.sectionTitle}>My Products</h2>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div>Product Name</div>
                <div>Batch ID</div>
                <div>Date</div>
                <div>Status</div>
              </div>
              {processorProducts.map((product) => (
                <div key={product.id} className={styles.tableRow}>
                  <div>{product.name}</div>
                  <div>{product.batchId}</div>
                  <div>{product.date}</div>
                  <div>
                    <span
                      className={`${styles.badge} ${styles[product.status]}`}
                    >
                      {product.status}
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
            <h2>Create New Product Batch</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Product Name</label>
                <input type="text" placeholder="e.g., Organic Tomato Sauce" />
              </div>
              <div className={styles.formGroup}>
                <label>Batch ID</label>
                <input type="text" placeholder="Auto-generated" disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Scan QR Code to Link Batch</label>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handleQRScan}
                  style={{ width: "100%" }}
                >
                  <i className="fas fa-qrcode"></i> Scan QR Code
                </button>
              </div>
              {showSuccess && (
                <p className={styles.successText}>
                  <i className="fas fa-check-circle"></i> Batch Linked
                  Successfully!
                </p>
              )}
              <button type="submit" className="btn-primary">
                Create Product
              </button>
            </form>
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
}
