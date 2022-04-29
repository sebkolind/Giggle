type UnknownRecord = Record<string, unknown>;
type Options = {
    appendTo?: Element;
};
type Source = {
    type: string;
    id?: string;
    class?: string[];
    elements?: Source[];
    properties?: UnknownRecord;
    attributes?: Record<string, string>;
};
type IndexableElement = (Element & {
    [key: string]: unknown;
}) | (HTMLElement & {
    [key: string]: unknown;
});
export const giggle: (source: Source, options?: Options | undefined) => IndexableElement[];

//# sourceMappingURL=types.d.ts.map
