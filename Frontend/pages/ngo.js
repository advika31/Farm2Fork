import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ngoInventory } from "../lib/mockData";
import styles from "../styles/Dashboard.module.css";
import Modal from "../components/Modal";

export default function NGODashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleScanConfirm = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>NGO Dashboard - TraceRoots</title>
      </Head>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>NGO Dashboard</h1>

          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Live Surplus Map</h2>
            <div className={styles.mapPlaceholder}>
              <i className="fas fa-map-marked-alt"></i>
              <p>Interactive map showing surplus food locations</p>
              <div className={styles.mapPins}>
                <span className={styles.mapPin}>📍 Delhi Food Bank</span>
                <span className={styles.mapPin}>📍 Mumbai Relief</span>
                <span className={styles.mapPin}>📍 Bangalore Community</span>
              </div>
            </div>
          </div>

          <div className={styles.actionSection}>
            <button
              className="btn-primary btn-large"
              onClick={handleScanConfirm}
            >
              <i className="fas fa-qrcode"></i> Scan to Confirm Donation
            </button>
          </div>

          <div className={styles.tableSection}>
            <h2 className={styles.sectionTitle}>My Inventory</h2>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div>Item</div>
                <div>Quantity</div>
                <div>Donor</div>
                <div>Date Received</div>
              </div>
              {ngoInventory.map((item) => (
                <div key={item.id} className={styles.tableRow}>
                  <div>{item.item}</div>
                  <div>{item.quantity}</div>
                  <div>{item.donor}</div>
                  <div>{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modalContent}>
            <h2>Confirm Donation</h2>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label>Scan QR Code</label>
                <div className={styles.qrScanner}>
                  <i className="fas fa-qrcode"></i>
                  <p>Point camera at QR code</p>
                </div>
              </div>
              {!showSuccess ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleConfirm}
                >
                  Confirm Donation
                </button>
              ) : (
                <p className={styles.successText}>
                  <i className="fas fa-check-circle"></i> Donation Confirmed
                  Successfully!
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
}
