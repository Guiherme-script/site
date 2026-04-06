import type { ScriptBlock, SceneType } from "../types";

const TAG_MAP: Record<string, SceneType> = {
  gancho: "hook",
  hook: "hook",
  abertura: "hook",
  problema: "problem",
  problem: "problem",
  dor: "problem",
  solucao: "solution",
  solução: "solution",
  solution: "solution",
  resultado: "solution",
  prova: "proof",
  proof: "proof",
  depoimento: "proof",
  cta: "cta",
  chamada: "cta",
  acao: "cta",
  ação: "cta",
  titulo: "title",
  título: "title",
  title: "title",
  conceito: "concept",
  concept: "concept",
  passos: "steps",
  steps: "steps",
  resumo: "summary",
  summary: "summary",
  citacao: "quote",
  citação: "quote",
  quote: "quote",
};

const KEYWORD_PATTERNS: Record<string, string[]> = {
  dinheiro: ["coins", "dollar-sign", "wallet"],
  energia: ["zap", "battery-charging", "sun"],
  saude: ["heart", "activity", "heart-pulse"],
  saúde: ["heart", "activity", "heart-pulse"],
  tempo: ["clock", "timer", "hourglass"],
  crescimento: ["trending-up", "arrow-up", "chart-line"],
  sucesso: ["trophy", "star", "award"],
  foco: ["target", "crosshair", "eye"],
  mente: ["brain", "lightbulb", "sparkles"],
  força: ["dumbbell", "shield", "flame"],
  forca: ["dumbbell", "shield", "flame"],
  amor: ["heart", "smile", "users"],
  trabalho: ["briefcase", "laptop", "building"],
  liberdade: ["bird", "wind", "plane"],
  conhecimento: ["book-open", "graduation-cap", "library"],
  medo: ["alert-triangle", "shield-off", "cloud-lightning"],
  erro: ["x-circle", "alert-triangle", "ban"],
  passo: ["footprints", "arrow-right", "list-ordered"],
  resultado: ["check-circle", "trophy", "chart-bar"],
  metodo: ["settings", "sliders", "wrench"],
  método: ["settings", "sliders", "wrench"],
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const found: string[] = [];

  for (const word of words) {
    const clean = word.replace(/[^a-záàâãéèêíïóôõöúçñ]/gi, "");
    if (KEYWORD_PATTERNS[clean]) {
      found.push(KEYWORD_PATTERNS[clean][0]);
    }
  }

  return [...new Set(found)];
}

function inferSceneType(text: string, index: number, total: number): SceneType {
  const lower = text.toLowerCase();

  if (index === 0) return "hook";
  if (index === total - 1 && (lower.includes("clique") || lower.includes("link") || lower.includes("agora")))
    return "cta";
  if (lower.includes("?") || lower.includes("problema") || lower.includes("erro") || lower.includes("frustrad"))
    return "problem";
  if (lower.includes("solução") || lower.includes("método") || lower.includes("passo") || lower.includes("consegu"))
    return "solution";
  if (lower.includes("resultado") || lower.includes("depoimento") || lower.includes("prova"))
    return "proof";

  return "generic";
}

export function parseScript(rawText: string): ScriptBlock[] {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  // Check if script uses bracket tags
  const tagRegex = /\[([^\]]+)\]/g;
  const hasTags = tagRegex.test(trimmed);

  if (hasTags) {
    return parseTaggedScript(trimmed);
  }

  return parseUntaggedScript(trimmed);
}

function parseTaggedScript(text: string): ScriptBlock[] {
  const blocks: ScriptBlock[] = [];
  const sections = text.split(/\[([^\]]+)\]/);

  // sections: ["", "GANCHO", "text...", "PROBLEMA", "text...", ...]
  for (let i = 1; i < sections.length; i += 2) {
    const tagName = sections[i].trim().toLowerCase();
    const content = sections[i + 1]?.trim();

    if (!content) continue;

    const sceneType = TAG_MAP[tagName] || "generic";
    const keywords = extractKeywords(content);

    blocks.push({
      id: generateId(),
      type: sceneType,
      text: content,
      keywords,
      estimatedDurationFrames: 0, // calculated by timingEngine
    });
  }

  return blocks;
}

function parseUntaggedScript(text: string): ScriptBlock[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((paragraph, index) => ({
    id: generateId(),
    type: inferSceneType(paragraph, index, paragraphs.length),
    text: paragraph,
    keywords: extractKeywords(paragraph),
    estimatedDurationFrames: 0,
  }));
}
