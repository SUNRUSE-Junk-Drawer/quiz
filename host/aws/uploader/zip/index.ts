import { join } from "path";
import { execFile } from "child_process";
import { path7za } from "7zip-bin";
import { cli } from "../cli";

cli(async () => {
  await new Promise<void>((resolve, reject) => {
    execFile(
      path7za,
      [
        `a`,
        `-mm=Deflate`,
        `-mfb=258`,
        `-mpass=15`,
        join(`..`, `..`, `..`, `dist`, `uploader.zip`),
        `sunruse-quiz-uploader.exe`,
        `configuration.json.example`,
        `players.csv.example`,
        `rounds.csv.example`,
      ],
      {
        cwd: join(`host`, `aws`, `uploader`),
      }
    )
      .on(`error`, reject)
      .on(`exit`, (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(`7za exited with code ${code} (0 expected).`);
        }
      });
  });
});
