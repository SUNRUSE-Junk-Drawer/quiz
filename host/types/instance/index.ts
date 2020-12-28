export type Instance = {
  readonly quizKey: string;
  readonly players: ReadonlyArray<{
    readonly displayName: string;
    readonly userId: string;
    readonly sessionId: null | string;
    readonly answers: ReadonlyArray<{
      readonly revealed: boolean;
      readonly score: null | number;
      readonly answer: string;
    }>;
  }>;
};
