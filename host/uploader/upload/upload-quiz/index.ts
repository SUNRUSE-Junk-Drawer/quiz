import { v4 } from "uuid";
import { Quiz } from "../../../types/quiz";
import { Environment } from "../../environment";

export async function uploadQuiz<TVersion>(
  environment: Environment<TVersion>,
  quiz: Quiz
): Promise<string> {
  const quizKey = v4();

  environment.log(`Uploading quiz...`);
  const result = await environment.quizzesKeyValueStore.insert(quizKey, quiz);

  switch (result.type) {
    case `successful`:
      break;

    case `alreadyExists`:
      throw new Error(
        `The initial state already exists in the key-value store.`
      );
  }

  return quizKey;
}
