interface TextSpan {
  _type?: string;
  text?: string;
}

interface TextBlock {
  _type?: string;
  children?: TextSpan[];
}

export function portableTextParagraphs(value: unknown[] | undefined): string[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    const block = item as TextBlock;
    if (block?._type !== 'block' || !Array.isArray(block.children)) return [];
    const text = block.children
      .map((child) => (typeof child?.text === 'string' ? child.text : ''))
      .join('')
      .trim();
    return text ? [text] : [];
  });
}
