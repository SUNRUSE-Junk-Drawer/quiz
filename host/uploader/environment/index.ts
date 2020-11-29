import { FileStore } from "@endless-trash/file-store";
import { KeyValueStore } from "@endless-trash/key-value-store";
import { Instance } from "../../types/instance";
import { Quiz } from "../../types/quiz";

export interface Environment<TVersion> {
  log(text: string): void;

  readTextFile(path: string): Promise<string>;

  readBinaryFile(path: string): Promise<Buffer>;

  readonly mediaFileStore: FileStore;

  readonly quizzesKeyValueStore: KeyValueStore<Quiz, TVersion>;
  readonly instancesKeyValueStore: KeyValueStore<Instance, TVersion>;
}
