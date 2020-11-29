// Workaround for nexe bug.
import "xml2js";

import { promises } from "fs";
import { Credentials } from "aws-sdk";
import {
  S3FileStore,
  S3FileStoreConfiguration,
} from "@endless-trash/s3-file-store";
import {
  DynamodbKeyValueStore,
  DynamodbKeyValueStoreConfiguration,
} from "@endless-trash/dynamodb-key-value-store";
import { Environment } from "../../../uploader/environment";
import { upload } from "../../../uploader/upload";
import { Quiz } from "../../../types/quiz";
import { Instance } from "../../../types/instance";

type Configuration = {
  readonly credentials: {
    readonly accessKey: string;
    readonly secretKey: string;
  };
  readonly mediaS3FileStore: S3FileStoreConfiguration;
  readonly quizzesDynamodbKeyValueStore: DynamodbKeyValueStoreConfiguration;
  readonly instancesDynamodbKeyValueStore: DynamodbKeyValueStoreConfiguration;
};

export async function main(): Promise<void> {
  const log = (text: string) => {
    console.log(text);
  };

  const readTextFile = async (path: string) => {
    return await promises.readFile(path, `utf8`);
  };

  const readBinaryFile = async (path: string) => {
    return await promises.readFile(path);
  };

  log(`Reading credentials...`);
  const configurationText = await promises.readFile(
    `configuration.json`,
    `utf8`
  );

  const configurationJson: Configuration = JSON.parse(configurationText);

  const credentials = new Credentials(
    configurationJson.credentials.accessKey,
    configurationJson.credentials.secretKey
  );

  const mediaFileStore = new S3FileStore({
    ...configurationJson.mediaS3FileStore,
    clientConfiguration: {
      ...configurationJson.mediaS3FileStore.clientConfiguration,
      credentials,
    },
  });

  const quizzesKeyValueStore = new DynamodbKeyValueStore<Quiz>({
    ...configurationJson.quizzesDynamodbKeyValueStore,
    clientConfiguration: {
      ...configurationJson.quizzesDynamodbKeyValueStore.clientConfiguration,
      credentials,
    },
  });

  const instancesKeyValueStore = new DynamodbKeyValueStore<Instance>({
    ...configurationJson.instancesDynamodbKeyValueStore,
    clientConfiguration: {
      ...configurationJson.instancesDynamodbKeyValueStore.clientConfiguration,
      credentials,
    },
  });

  const environment: Environment<number> = {
    log,
    readTextFile,
    readBinaryFile,
    mediaFileStore,
    quizzesKeyValueStore,
    instancesKeyValueStore,
  };

  await upload(environment);
}
