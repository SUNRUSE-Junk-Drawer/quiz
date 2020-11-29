import { createHash } from "crypto";
import { Environment } from "../../environment";

export async function uploadMedia<Version>(
  environment: Environment<Version>,
  media: ReadonlyArray<string>
): Promise<Map<string, string>> {
  environment.log(`Uploading media...`);
  const mediaHashes = new Map<string, string>();
  const hashes: string[] = [];

  for (let index = 0; index < media.length; index++) {
    const path = media[index];

    environment.log(`\tReading ${path}... (${index + 1} / ${media.length})`);
    const content = await environment.readBinaryFile(path);

    environment.log(`\tHashing...`);
    const hash = createHash(`sha256`).update(content).digest(`hex`);

    if (hashes.includes(hash)) {
      environment.log(
        `\t\tA file with hash ${hash} has already been uploaded.`
      );
    } else {
      hashes.push(hash);

      environment.log(
        `\t\tChecking whether file with hash ${hash} has previously been uploaded...`
      );

      const result = await environment.mediaFileStore.getUrl(hash);

      switch (result.type) {
        case `successful`:
          environment.log(`\t\tThis file has previously been uploaded.`);
          break;

        case `doesNotExist`:
          environment.log(
            `\t\tThis file has not yet been uploaded, uploading...`
          );

          await environment.mediaFileStore.save(hash, content);
          break;
      }
    }

    mediaHashes.set(path, hash);
  }

  return mediaHashes;
}
