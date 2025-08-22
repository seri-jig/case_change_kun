function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^(.)/, (_, chr) => chr.toUpperCase());
}

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^(.)/, (_, chr) => chr.toLowerCase());
}

function toSnakeCase(str: string): string {
  return str
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function toKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toUpperCase(str: string): string {
  return str.toUpperCase();
}

function toLowerCase(str: string): string {
  return str.toLowerCase();
}

function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

function toTitleCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => ` ${chr.toUpperCase()}`)
    .replace(/^(.)/, (_, chr) => chr.toUpperCase())
    .trim();
}

const html = await Deno.readTextFile("./index.html");

Deno.serve((req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/convert" && req.method === "POST") {
    return handleConvert(req);
  }

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});

async function handleConvert(req: Request): Promise<Response> {
  try {
    const { text } = await req.json();
    
    const converted = {
      pascal: toPascalCase(text),
      camel: toCamelCase(text),
      snake: toSnakeCase(text),
      kebab: toKebabCase(text),
      constant: toConstantCase(text),
      title: toTitleCase(text),
      upper: toUpperCase(text),
      lower: toLowerCase(text),
    };

    return new Response(JSON.stringify(converted), {
      headers: { "content-type": "application/json" },
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
}