import { v4 } from "uuid";
import { Instance } from "../../../types/instance";
import { Environment } from "../../environment";

export async function uploadInstance<TVersion>(
  environment: Environment<TVersion>,
  instance: Instance
): Promise<string> {
  const instanceKey = v4();

  environment.log(`Uploading instance...`);
  const instanceResult = await environment.instancesKeyValueStore.insert(
    instanceKey,
    instance
  );

  switch (instanceResult.type) {
    case `successful`:
      break;

    case `alreadyExists`:
      throw new Error(`The instance already exists in the key-value store.`);
  }

  return instanceKey;
}
