# RDF/JS Zod

Zod schemas for the RDF/JS Data Model specification.

## How the schemas are produced

This project keeps a checked-in copy of the official RDF/JS Data Model
TypeScript definitions from `@rdfjs/types` inside `src/rdfjs/data-model.d.ts`.
We convert those types into runtime-safe Zod schemas using the
[`ts-to-zod`](https://github.com/fabien0102/ts-to-zod) generator.[^1]

### Generation workflow

1. **Sync upstream types**\
   Fetch the latest `@rdfjs/types` definitions (currently sourced from
   [`rdfjs/types`](https://github.com/rdfjs/types)) and update
   `src/rdfjs/data-model.d.ts` as needed.
2. **Run the generator**\
   Execute `deno task generate:ts2zod`, which runs `src/generate.ts`. That
   script loads the `.d.ts` source, calls `ts-to-zod.generate`, and writes the
   produced Zod schemas to `src/rdfjs/data-model.ts`.
3. **Format & verify**\
   `deno task generate` will format the output before regeneration, ensuring the
   committed Zod artifacts stay consistent.

### Why this approach

- Keeping the `.d.ts` definitions close to the generated `.ts` output lets us
  diff upstream spec changes alongside the derived schemas.
- `ts-to-zod` preserves the structure and JSDoc metadata of the RDF/JS types,
  producing human-readable Zod objects while avoiding hand-written drift.[^1]

[^1]: https://github.com/fabien0102/ts-to-zod
