import * as parserTypeScript from "prettier/parser-typescript";
import * as prettier from "prettier/standalone";
import * as prettierPluginEstree from "prettier/plugins/estree";

const formatCode = async (code: string, parserType = "typescript") => {
  try {
    const formattedCode = await prettier.format(code, {
      parser: parserType,
      plugins: [parserTypeScript, prettierPluginEstree],
    });

    return { error: false, code: formattedCode };
  } catch (error) {
    console.error("Error formatting code: ", error);
    return { error: true, code: null };
  }
};

export { formatCode };
