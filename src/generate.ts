import * as ts2zod from "ts-to-zod";
import rdfjsDataModelDts from "./rdfjs/data-model.d.ts" with { type: "text" };

if (import.meta.main) {
  await generateRdfjsSchema();
}

async function generateRdfjsSchema() {
  const { getZodSchemasFile } = ts2zod.generate({
    sourceText: rdfjsDataModelDts,
  });
  const resultText = getZodSchemasFile("./data-model.d.ts");

  await Deno.writeTextFile(
    new URL(import.meta.resolve("./rdfjs/data-model.ts")),
    resultText,
  );
}
