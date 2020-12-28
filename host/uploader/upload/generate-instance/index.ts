import { v4 } from "uuid";
import { Instance } from "../../../types/instance";
import { Environment } from "../../environment";
import { PlayerData } from "../player-data";
import { RoundData } from "../round-data";

export function generateInstance<TVersion>(
  environment: Environment<TVersion>,
  quizKey: string,
  players: ReadonlyArray<PlayerData>,
  rounds: ReadonlyArray<RoundData>
): Instance {
  environment.log(`Generating instance...`);

  return {
    quizKey,
    players: players.map((player) => ({
      displayName: player.displayName,
      userId: v4(),
      sessionId: null,
      answers: rounds
        .map((round) =>
          round.questions.map(() => ({
            revealed: false,
            score: null,
            answer: ``,
          }))
        )
        .reduce((a, b) => [...a, ...b], []),
    })),
  };
}
