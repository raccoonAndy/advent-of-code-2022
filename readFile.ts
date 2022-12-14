import { readline } from 'https://deno.land/x/readline@v1.1.0/mod.ts';

export const readFile = async (nameFile = 'input', action: (line: string) => void) => {
  const file = await Deno.open(`${nameFile}.txt`);
  for await (const line of readline(file)) {
    const string = new TextDecoder().decode(line);
    action(string);
  }
  file.close();
};
