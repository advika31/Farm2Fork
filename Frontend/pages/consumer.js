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
      <div className={styles.consumer}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Your Product's Journey</h1>
            <p className={styles.heroSubtitle}>
              Track every step from farm to your table
            </p>
          </div>

          <div className={styles.traceTree}>
            <Image
              src="/images/trace-tree.png"
              alt="Trace Tree"
              width={800}
              height={600}
              className={styles.treeImage}
            />
            {traceTreeData.nodes.map((node, index) => (
              <button
                key={node.id}
                className={`${styles.treeNode} ${styles[node.type]}`}
                style={{
                  left: `${20 + index * 30}%`,
                  top: `${30 + index * 10}%`,
                }}
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

          <div className={styles.impactMessage}>
            <div className={styles.impactCard}>
              <i className="fas fa-heart"></i>
              <div>
                <h3>Impact Created</h3>
                <p>
                  This purchase donated {traceTreeData.impact.surplusDonated}kg
                  of surplus → {traceTreeData.impact.mealsCreated} meals created
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedNode && (
        <Modal onClose={() => setSelectedNode(null)}>
          <div className={styles.nodeDetails}>
            <h2>{selectedNode.details.name}</h2>
            <div className={styles.detailItem}>
              <strong>Location:</strong> {selectedNode.details.location}
            </div>
            <div className={styles.detailItem}>
              <strong>Blockchain Hash:</strong>
              <code className={styles.hash}>
                {selectedNode.details.blockchainHash}
              </code>
            </div>
            {selectedNode.details.image && (
              <div className={styles.imagePlaceholder}>
                <i className="fas fa-image"></i>
                <p>Farm Image Placeholder</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
}
