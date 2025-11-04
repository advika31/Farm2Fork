import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ngoInventory } from "../lib/mockData";
import styles from "../styles/Dashboard.module.css";
import Modal from "../components/Modal";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

export default function NGODashboard() {
  const [L, setL] = useState(null);

  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      setL(leaflet);
    })();
  }, []);
const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);

const ngoLocations = [
  { name: "Delhi Food Bank", coords: [28.6139, 77.2090] },
  { name: "Mumbai Relief", coords: [19.0760, 72.8777] },
  { name: "Bangalore Community", coords: [12.9716, 77.5946] },
];
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
            <div className={styles.mapContainer}>
  {L && (
  <MapContainer
    center={[20.5937, 78.9629]}
    zoom={5}
    style={{ height: "400px", width: "100%", borderRadius: "12px" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    />
    {ngoLocations.map((ngo, index) => (
      <Marker
        key={index}
        position={ngo.coords}
        icon={L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [35, 35],
        })}
      >
        <Popup>
          <strong>{ngo.name}</strong><br />
          Surplus food available for collection.
        </Popup>
      </Marker>
    ))}
  </MapContainer>
)}

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
