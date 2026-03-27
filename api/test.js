import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const checks = {
      hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
      hasUpstashUrl: !!process.env.UPSTASH_VECTOR_REST_URL,
      hasUpstashToken: !!process.env.UPSTASH_VECTOR_REST_TOKEN,
      openRouterKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
    };

    res.status(200).json({
      status: "ok",
      environment: checks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
