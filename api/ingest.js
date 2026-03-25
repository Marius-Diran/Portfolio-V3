import dotenv from "dotenv";
dotenv.config();

import { Index } from "@upstash/vector";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

// Simple text splitter
function splitText(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

async function loadDocuments() {
  const docsDir = path.join(__dirname, "..", "docs");
  const files = fs.readdirSync(docsDir);
  let allDocs = [];

  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const ext = path.extname(file).toLowerCase();

    console.log(`Loading: ${file}`);

    if (ext === ".txt") {
      const content = fs.readFileSync(filePath, "utf-8");
      allDocs.push({
        pageContent: content,
        metadata: { source: file }
      });
    }
  }

  return allDocs;
}

async function ingest() {
  try {
    console.log("Starting ingestion...");

    // 1. Load all documents
    const docs = await loadDocuments();
    console.log(`Loaded ${docs.length} document(s)`);

    // 2. Split into chunks
    const chunks = [];
    for (const doc of docs) {
      const textChunks = splitText(doc.pageContent, 500, 50);
      for (const chunk of textChunks) {
        chunks.push({
          pageContent: chunk,
          metadata: doc.metadata
        });
      }
    }
    console.log(`Split into ${chunks.length} chunks`);

    // 3. Store each chunk in Upstash
    for (let i = 0; i < chunks.length; i++) {
      await index.upsert({
        id: `chunk-${i}`,
        data: chunks[i].pageContent,
        metadata: {
          text: chunks[i].pageContent,
          source: chunks[i].metadata.source,
        },
      });
      console.log(`Stored chunk ${i + 1} of ${chunks.length}`);
    }

    console.log("✅ Ingestion complete!");
  } catch (error) {
    console.error("❌ Ingestion failed:", error);
  }
}

ingest();
