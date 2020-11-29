import { QuestionData } from "../question-data";

export type RoundData = {
  readonly title: string;
  readonly subtitle: string;
  readonly preamble: string;
  readonly music: null | string;
  readonly background: string;
  readonly questions: ReadonlyArray<QuestionData>;
};
