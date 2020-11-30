export function cli(body: () => Promise<void>): void {
  body().then(
    () => {
      console.log(`Completed successfully.`);
      process.exit(0);
    },
    (error) => {
      console.error(`Failed: ${error}`);
      process.exit(1);
    }
  );
}
