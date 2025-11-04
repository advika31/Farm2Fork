import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { traceTreeData } from "../lib/mockData";
import styles from "../styles/Consumer.module.css";
import Modal from "../components/Modal";

export default function ConsumerPage() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <>
      <Head>
        <title>Product Trace - TraceRoots</title>
      </Head>

      <Navbar />

      <main className={styles.consumer}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <h1 className={styles.heroTitle}>Your Product’s Journey</h1>
            <p className={styles.heroSubtitle}>
              Track every step from farm to your table 🌾
            </p>
          </section>

          {/* Trace Visualization */}
          <section className={styles.traceTree}>
  <div className={styles.traceContainer}>
    {/* Connector lines */}
    <svg className={styles.connectorLines} xmlns="http://www.w3.org/2000/svg">
      <line x1="25%" y1="50%" x2="50%" y2="50%" />
      <line x1="50%" y1="50%" x2="75%" y2="50%" />
    </svg>

    {/* Trace nodes */}
    <div className={styles.traceNodes}>
      {traceTreeData.nodes.map((node) => (
        <button
          key={node.id}
          className={`${styles.treeNode} ${styles[node.type]}`}
          onClick={() => setSelectedNode(node)}
        >
          <i
            className={`fas fa-${
              node.type === "farm"
                ? "tractor"
                : node.type === "processor"
                ? "industry"
                : "store"
            }`}
          ></i>
          <span>{node.label}</span>
        </button>
      ))}
    </div>
  </div>
</section>


          {/* Impact Section */}
          <section className={styles.impactMessage}>
            <div className={styles.impactCard}>
              <i className="fas fa-heart"></i>
              <div>
                <h3>Impact Created ❤️</h3>
                <p>
                  This purchase donated{" "}
                  <strong>{traceTreeData.impact.surplusDonated}kg</strong> of
                  surplus → <strong>{traceTreeData.impact.mealsCreated}</strong>{" "}
                  meals created 🍽️
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modal for node details */}
      {selectedNode && (
        <Modal onClose={() => setSelectedNode(null)}>
          <div className={styles.nodeDetails}>
            <h2>{selectedNode?.details?.name ?? selectedNode.label}</h2>
            <div className={styles.detailItem}>
              <strong>Location:</strong>{" "}
              {selectedNode?.details?.location ?? "Unknown"}
            </div>
            <div className={styles.detailItem}>
              <strong>Blockchain Hash:</strong>
              <code className={styles.hash}>
                {selectedNode?.details?.blockchainHash ?? "N/A"}
              </code>
            </div>

            {selectedNode?.details?.image ? (
              <Image
                src={selectedNode.details.image}
                alt={selectedNode.details.name ?? "Node image"}
                width={300}
                height={200}
                className={styles.nodeImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <i className="fas fa-image" aria-hidden="true"></i>
                <p>No image available</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
}
