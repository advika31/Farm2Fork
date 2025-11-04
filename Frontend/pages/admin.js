import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { adminUsers, blockchainLogs } from "../lib/mockData";
import styles from "../styles/Admin.module.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      <Head>
        <title>Admin Dashboard - TraceRoots</title>
      </Head>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "users" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "blockchain" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("blockchain")}
            >
              Blockchain Logs
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "ai" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("ai")}
            >
              AI Model Health
            </button>
          </div>

          {/* Users Section */}
          {activeTab === "users" && (
            <div className={styles.tabContent}>
              <div className={styles.statsGrid}>
                {[
                  {
                    icon: "fas fa-user-tie",
                    label: "Farmers",
                    value: adminUsers.farmers,
                  },
                  {
                    icon: "fas fa-industry",
                    label: "Processors",
                    value: adminUsers.processors,
                  },
                  {
                    icon: "fas fa-hands-helping",
                    label: "NGOs",
                    value: adminUsers.ngos,
                  },
                ].map((item, idx) => (
                  <div key={idx} className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <i className={item.icon}></i>
                    </div>
                    <div className={styles.statValue}>{item.value}</div>
                    <div className={styles.statLabel}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blockchain Logs Section */}
          {activeTab === "blockchain" && (
            <div className={styles.tabContent}>
              <div className={styles.tableSection}>
                <div className={styles.table}>
                  <div className={styles.tableHeader}>
                    <div>Transaction Hash</div>
                    <div>Type</div>
                    <div>Timestamp</div>
                    <div>Status</div>
                  </div>

                  <div className={styles.tableBody}>
                    {blockchainLogs.map((log) => (
                      <div key={log.id} className={styles.tableRow}>
                        <div>
                          <code className={styles.hash}>
                            {log.txHash.slice(0, 12)}...
                          </code>
                        </div>
                        <div>{log.type}</div>
                        <div>{log.timestamp}</div>
                        <div>
                          <span
                            className={`${styles.badge} ${
                              log.status === "Confirmed"
                                ? styles.confirmed
                                : styles.pending
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Model Health Section */}
          {activeTab === "ai" && (
            <div className={styles.tabContent}>
              <div className={styles.aiHealth}>
                <div className={styles.healthCard}>
                  <h3>Model Status</h3>
                  <div className={styles.healthIndicator}>
                    <div className={styles.healthBar}>
                      <div
                        className={styles.healthFill}
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                    <span>95% Healthy</span>
                  </div>
                </div>
                <div className={styles.graphPlaceholder}>
                  <i className="fas fa-chart-line"></i>
                  <p>AI Model Performance Graph</p>
                  <p className={styles.graphNote}>
                    Accuracy: 98.5% | Uptime: 99.9%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
