export type UnknownRecord = Record<string, unknown>

export type Options = {
  appendTo?: Element
}

export type Source = {
  tag: string
  id?: string
  class?: string[]
  elements?: Source[]
  properties?: UnknownRecord
  attributes?: Record<string, string>
}

export type IndexableElement = Element & {
  [key: string]: unknown
} | HTMLElement & {
  [key: string]: unknown
}

export type Context = {
  el: IndexableElement
  source: Source
}

export type Giggle = Pick<Source, 'elements'>
