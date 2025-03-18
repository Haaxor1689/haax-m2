#!/usr/bin/env bun

import { join, normalize } from 'path';
import { program } from 'commander';
import { readdir } from 'node:fs/promises';

import { m2ToJson } from './converter';

import pkg from '../package.json';

// Set up command-line interface with commander
program
  .name('haax-m2')
  .description('Convert between DBC and CSV files for World of Warcraft')
  .version(pkg.version)
  .argument('[files...]', 'DBC or CSV files to convert')
  .addHelpText(
    'after',
    `
You can pass multiple files or directories to convert them all at once.
Examples:
  $ haax-m2 path/to/Spell.dbc path/to/Map.dbc
  $ haax-m2 path/to/DBFilesClient
  `
  )
  .parse();

const files = program.args;

if (files.length === 0) program.help();

const run = async (filePaths: string[]) =>
  Promise.all(
    filePaths.map(async filePath => {
      try {
        const f = Bun.file(filePath);

        if ((await f.stat()).isDirectory()) {
          console.info(`Finding M2 in directory "${filePath}"...`);
          const dirContents = await readdir(filePath);
          await run(
            dirContents
              .filter(p => p.toLocaleLowerCase().endsWith('.m2'))
              .map(p => join(filePath, p))
          );
          return;
        }

        if (!(await f.exists())) {
          console.warn(`File "${filePath}" not found...`);
          return;
        }

        if (filePath.toLocaleLowerCase().endsWith('.m2')) {
          console.info(`Converting "${filePath}" to csv...`);
          const json = await m2ToJson(filePath);
          json && (await Bun.write(filePath.slice(0, -3) + '.json', json));
          return;
        }

        console.info(`Skipping "${filePath}"...`);
      } catch (err) {
        console.error(
          `Error processing "${filePath}": ${(err as Error).message}`
        );
      }
    })
  );

run(files.map(p => normalize(p)));
