import { Environment } from "../../environment";
import { RoundData } from "../round-data";

export function collectMedia<Version>(
  environment: Environment<Version>,
  rounds: ReadonlyArray<RoundData>
): ReadonlyArray<string> {
  environment.log(`Collecting media...`);
  const media: string[] = [];

  const addMedia = (path: null | string): void => {
    if (path !== null) {
      if (!media.includes(path)) {
        media.push(path);
      }
    }
  };

  for (const round of rounds) {
    addMedia(round.background);
    addMedia(round.music);

    for (const question of round.questions) {
      addMedia(question.media);
    }
  }

  return media;
}
