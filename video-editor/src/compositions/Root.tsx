import React from "react";
import { Composition } from "remotion";
import { FullVideoComposition } from "./FullVideoComposition";
import type { Project } from "../core/types";
import { parseScript } from "../core/parser/scriptParser";
import { generateProject } from "../core/parser/sceneGenerator";
import { totalDurationFrames } from "../core/parser/timingEngine";
import { applyTiming } from "../core/parser/timingEngine";

const SAMPLE_SCRIPT = `[GANCHO]
Você sabia que 90% das pessoas nunca alcançam seus objetivos?

[PROBLEMA]
A maioria tenta seguir métodos genéricos, mas acaba frustrada porque não tem um caminho personalizado.

[SOLUCAO]
Com o método Alquimia da Energia, você transforma sua rotina em apenas 3 passos simples e comprovados.

[CTA]
Clique no link abaixo e comece sua transformação agora.`;

const blocks = parseScript(SAMPLE_SCRIPT);
const timedBlocks = applyTiming(blocks, 30);
const sampleProject = generateProject(blocks);
const totalFrames = totalDurationFrames(timedBlocks);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FullVideo"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={FullVideoComposition as any}
        durationInFrames={Math.max(1, totalFrames)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ project: sampleProject }}
      />
    </>
  );
};
