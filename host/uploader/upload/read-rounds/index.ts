import { findColumnIndex } from "../find-column-index";
import { parseCsv } from "../parse-csv";
import { Environment } from "../../environment";
import { RoundData } from "../round-data";

export async function readRounds<TVersion>(
  environment: Environment<TVersion>
): Promise<ReadonlyArray<RoundData>> {
  environment.log(`Reading rounds...`);
  const roundText = await environment.readTextFile(`rounds.csv`);

  environment.log(`Parsing rounds...`);
  const roundQuestion = parseCsv(roundText);

  const rounds: {
    readonly title: string;
    readonly subtitle: string;
    readonly preamble: string;
    readonly music: null | string;
    readonly background: string;
    readonly questions: {
      readonly title: string;
      readonly text: string;
      readonly media: null | string;
      readonly answer: string;
      readonly maximumPoints: number;
    }[];
  }[] = [];

  const roundTitleColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Round Title`
  );

  const roundSubtitleColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Round Subtitle`
  );

  const roundPreambleColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Round Preamble`
  );

  const roundMusicColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Round Music`
  );

  const roundBackgroundColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Round Background`
  );

  const questionTitleColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Question Title`
  );

  const questionTextColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Question Text`
  );

  const questionMediaColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Question Media`
  );

  const questionAnswerColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Question Answer`
  );

  const questionMaximumPointsColumnIndex = findColumnIndex(
    `rounds`,
    roundQuestion,
    `Question Maximum Points`
  );

  for (const row of roundQuestion.slice(1)) {
    // todo simple validation

    if (row[roundTitleColumnIndex]) {
      const music = row[roundMusicColumnIndex] || null;

      if (music !== null && !music.endsWith(`.mp3`)) {
        throw new Error(`Round music "${music}" is not in MP3 format.`);
      }

      const background = row[roundBackgroundColumnIndex];

      if (!background.endsWith(`.jpg`)) {
        throw new Error(
          `Round background "${background}" is not in JPG format.`
        );
      }

      rounds.push({
        title: row[roundTitleColumnIndex],
        subtitle: row[roundSubtitleColumnIndex],
        preamble: row[roundPreambleColumnIndex],
        music,
        background,
        questions: [],
      });
    }

    const media = row[questionMediaColumnIndex] || null;

    if (
      media !== null &&
      ![`jpg`, `mp3`, `mp4`].some((extension) =>
        media.endsWith(`.${extension}`)
      )
    ) {
      throw new Error(
        `Question media "${media}" is not in JPG, MP3 or MP4 format.`
      );
    }

    const maximumPointsText = row[questionMaximumPointsColumnIndex];

    if (!/\d+/.test(maximumPointsText)) {
      throw new Error(
        `A question's maximum number of points is not an integer.`
      );
    }

    const maximumPoints = parseInt(maximumPointsText);

    rounds[rounds.length - 1].questions.push({
      title: row[questionTitleColumnIndex],
      text: row[questionTextColumnIndex],
      media,
      answer: row[questionAnswerColumnIndex],
      maximumPoints,
    });
  }

  return rounds;
}
