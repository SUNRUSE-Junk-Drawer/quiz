import { Environment } from "../environment";
import { readRounds } from "./read-rounds";
import { readPlayers } from "./read-players";
import { uploadMedia } from "./upload-media";
import { collectMedia } from "./collect-media";
import { uploadQuiz } from "./upload-quiz";
import { generateQuiz } from "./generate-quiz";
import { generateInstance } from "./generate-instance";
import { uploadInstance } from "./upload-instance";

export async function upload<TVersion>(
  environment: Environment<TVersion>
): Promise<void> {
  const rounds = await readRounds(environment);
  const players = await readPlayers(environment);

  const media = collectMedia(environment, rounds);
  const mediaHashes = await uploadMedia(environment, media);

  const quiz = generateQuiz(environment, rounds, mediaHashes);
  const quizKey = await uploadQuiz(environment, quiz);

  const instance = generateInstance(environment, quizKey, players, rounds);
  await uploadInstance(environment, instance);
}
