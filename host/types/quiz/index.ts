export type Quiz = {
  readonly rounds: ReadonlyArray<{
    readonly title: string;
    readonly subtitle: string;
    readonly preamble: string;
    readonly music: null | string;
    readonly background: string;
    readonly questions: ReadonlyArray<{
      readonly title: string;
      readonly text: string;
      readonly media: null | string;
      readonly answer: string;
      readonly maximumPoints: number;
    }>;
  }>;
};
