import { item as abbyyFinereader } from './abbyy-finereader';
import { item as balabolka } from './balabolka';
import { item as excelBasics } from './excel-basics';
import { item as excelDataTools } from './excel-data-tools';
import { item as excelFormatting } from './excel-formatting';
import { item as excelSheetsFunctions } from './excel-sheets-functions';
import { item as formatFactory } from './format-factory';
import { item as internetFeatures } from './internet-features';
import { item as internetNavigation } from './internet-navigation';
import { item as jawsCommands } from './jaws-commands';
import { item as movieMaker } from './movie-maker';
import { item as nvdaCommands } from './nvda-commands';
import { item as phoneUsage } from './phone-usage';
import { item as soundForge } from './sound-forge';
import { item as unikey } from './unikey';
import { item as webAccessibility } from './web-accessibility';
import { item as windowsAdvanced } from './windows-advanced';
import { item as windowsBasics } from './windows-basics';
import { item as winrar } from './winrar';
import { item as wordBasics } from './word-basics';
import { item as wordFeatures } from './word-features';
import { item as wordPdf } from './word-pdf';
import { item as wordTables } from './word-tables';

interface SyllabusItem {
  title: string;
  content: string;
}

export const allSyllabusContent: SyllabusItem[] = [
  jawsCommands,
  nvdaCommands,
  soundForge,
  formatFactory,
  balabolka,
  abbyyFinereader,
  winrar,
  movieMaker,
  windowsBasics,
  windowsAdvanced,
  unikey,
  wordBasics,
  wordFeatures,
  wordTables,
  wordPdf,
  excelBasics,
  excelDataTools,
  excelFormatting,
  excelSheetsFunctions,
  internetNavigation,
  internetFeatures,
  phoneUsage,
  webAccessibility,
];
