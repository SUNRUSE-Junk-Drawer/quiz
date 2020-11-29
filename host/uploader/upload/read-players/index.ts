import { Environment } from "../../environment";
import { findColumnIndex } from "../find-column-index";
import { parseCsv } from "../parse-csv";
import { PlayerData } from "../player-data";

export async function readPlayers<TVersion>(
  environment: Environment<TVersion>
): Promise<ReadonlyArray<PlayerData>> {
  environment.log(`Reading players...`);
  const playersText = await environment.readTextFile(`players.csv`);

  environment.log(`Parsing players...`);
  const playersCsv = parseCsv(playersText);

  const playersEmailAddressColumnIndex = findColumnIndex(
    `players`,
    playersCsv,
    `Email Address`
  );

  const playersDisplayNameColumnIndex = findColumnIndex(
    `players`,
    playersCsv,
    `Display Name`
  );

  return playersCsv.slice(1).map((row) => {
    // TODO: Any simple validation we can do here?
    const emailAddress = row[playersEmailAddressColumnIndex];
    const displayName = row[playersDisplayNameColumnIndex];

    return { emailAddress, displayName };
  });
}
