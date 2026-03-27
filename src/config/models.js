export const AVAILABLE_MODELS = [
  {
    id: "nvidia/nemotron-3-super-120b-a12b:free",
    name: "Nemotron 3 Super",
    description: "120B parameters - Most capable",
    provider: "NVIDIA",
  },
  {
    id: "mistralai/mistral-7b-instruct:free",
    name: "Mistral 7B",
    description: "7B parameters - Fast & efficient",
    provider: "Mistral",
  },
  {
    id: "meta-llama/llama-3-8b-instruct:free",
    name: "Llama 3",
    description: "8B parameters - Meta's model",
    provider: "Meta",
  },
  {
    id: "openai/gpt-oss-120b:free",
    name: "GPT-OSS 120B",
    description: "120B parameters - Open source GPT",
    provider: "OpenAI",
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT-OSS 20B",
    description: "20B parameters - Lightweight GPT",
    provider: "OpenAI",
  },
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0];

export const getModelById = (modelId) => {
  return AVAILABLE_MODELS.find((m) => m.id === modelId) || DEFAULT_MODEL;
};
