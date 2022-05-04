type UnknownRecord = Record<string, unknown>;
type Options = {
    appendTo?: Element;
};
type Source = {
    tag: string;
    id?: string;
    class?: string[];
    elements?: Source[];
    properties?: UnknownRecord;
    attributes?: Record<string, string>;
    values?: {
        url: string;
        map: string;
        tag: string;
        pool?: Record<string, string>[];
    };
};
type IndexableElement = (Element & {
    [key: string]: unknown;
}) | (HTMLElement & {
    [key: string]: unknown;
});
type Giggle = Pick<Source, 'elements'>;
export const giggle: (source: Giggle, options?: Options | undefined) => Promise<IndexableElement[]>;

//# sourceMappingURL=types.d.ts.map
