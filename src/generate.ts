import * as ts2zod from "ts-to-zod";
import dataModelDts from "./rdfjs/data-model.d.ts" with {
  type: "text",
};

if (import.meta.main) {
  await generateRdfjsSchema();
}

async function generateRdfjsSchema() {
  const { getZodSchemasFile } = ts2zod.generate({
    sourceText: dataModelDts,
  });
  const zodSchemasText = getZodSchemasFile("./data-model.d.ts");
  await Deno.writeTextFile(
    "./src/rdfjs/data-model-schema.ts",
    zodSchemasText,
  );
}
