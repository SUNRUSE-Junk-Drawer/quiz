import { Quiz } from "../../../types/quiz";
import { Environment } from "../../environment";
import { RoundData } from "../round-data";

export function generateQuiz<Version>(
  environment: Environment<Version>,
  rounds: ReadonlyArray<RoundData>,
  mediaHashes: Map<string, string>
): Quiz {
  environment.log(`Generating quiz...`);

  return {
    rounds: rounds.map((roundData) => ({
      title: roundData.title,
      subtitle: roundData.subtitle,
      preamble: roundData.subtitle,
      music:
        roundData.music === null
          ? null
          : (mediaHashes.get(roundData.music) as string),
      background: mediaHashes.get(roundData.background) as string,
      questions: roundData.questions.map((question) => ({
        title: question.title,
        text: question.text,
        media:
          question.media === null
            ? null
            : (mediaHashes.get(question.media) as string),
        answer: question.answer,
        maximumPoints: question.maximumPoints,
      })),
    })),
  };
}
