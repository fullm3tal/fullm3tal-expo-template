export function prettifyJson(value: unknown, indent = 2): string {
  const seen = new WeakSet<object>();
  return JSON.stringify(
    value,
    (_key, nestedValue) => {
      if (nestedValue && typeof nestedValue === "object") {
        if (seen.has(nestedValue)) {
          return "[Circular]";
        }
        seen.add(nestedValue);
      }

      return nestedValue;
    },
    indent,
  );
}
