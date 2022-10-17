const booleanOptions: Record<string, boolean> = {
  "1": true,
  "0": false,
  true: true,
  TRUE: true,
  false: false,
  FALSE: false,
  yes: true,
  YES: true,
  no: false,
  NO: false,
  on: true,
  ON: true,
  off: false,
  OFF: false,
};

function env(key: string): string | undefined;
function env<T>(key: string, defaultValue: T): string | T;
function env<T>(key: string, defaultValue?: T) {
  return key in process.env ? (process.env[key] as string) : defaultValue;
}

function int(key: string): number | undefined;
function int<T extends number | undefined>(
  key: string,
  defaultValue?: T
): T extends undefined ? number | undefined : number;
function int(key: string, defaultValue?: number) {
  return key in process.env
    ? parseInt(process.env[key] as string, 10)
    : defaultValue;
}

function float(key: string): number | undefined;
function float<T extends number | undefined>(
  key: string,
  defaultValue?: T
): T extends undefined ? number | undefined : number;
function float(key: string, defaultValue?: number) {
  return key in process.env
    ? parseFloat(process.env[key] as string)
    : defaultValue;
}

function bool(key: string): boolean | undefined;
function bool<T extends boolean | undefined>(
  key: string,
  defaultValue?: T
): T extends undefined ? boolean | undefined : boolean;
function bool(key: string, defaultValue?: boolean) {
  if (
    !(key in process.env) ||
    !Object.keys(booleanOptions).includes(process.env[key] as string)
  )
    return defaultValue;

  return booleanOptions[process.env[key] as string];
}

function json(key: string): any;
function json<T>(key: string, defaultValue: T): any;
function json(key: string, defaultValue?: any) {
  if (!(key in process.env)) return defaultValue;
  return JSON.parse(process.env[key] as string);
}

function array(
  key: string,
  defaultValue?: never,
  trim?: boolean
): string[] | undefined;
function array<T>(
  key: string,
  defaultValue?: T[],
  trim?: boolean
): T extends undefined ? string[] | undefined : string[] | T[];
function array<T>(key: string, defaultValue?: T[], trim = true) {
  if (!(key in process.env)) return defaultValue;

  let envVar = process.env[key] as string;

  if (trim) envVar = envVar.trim();

  if (envVar.startsWith("[") && envVar.endsWith("]"))
    envVar = envVar.slice(1, -1);

  let array = envVar.split(",");

  if (trim) array = array.map((e) => e.trim());

  return array;
}

function buffer(
  key: string,
  defaultValue?: never,
  encoding?: BufferEncoding
): Buffer | undefined;
function buffer<T extends Buffer | undefined = undefined>(
  key: string,
  defaultValue?: T,
  encoding?: BufferEncoding
): T extends undefined ? Buffer | undefined : Buffer;
function buffer(
  key: string,
  defaultValue?: Buffer,
  encoding: BufferEncoding = "utf-8"
) {
  if (!(key in process.env)) return defaultValue;
  return Buffer.from(process.env[key] as string, encoding);
}

type Envaid = typeof env & {
  int: typeof int;
  float: typeof float;
  bool: typeof bool;
  json: typeof json;
  array: typeof array;
  buffer: typeof buffer;
};

Object.assign(env, { int, float, bool, json, array, buffer });

export default env as Envaid;
