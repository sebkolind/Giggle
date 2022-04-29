type UnknownRecord = Record<string, unknown>
type Options = {
  appendTo?: Element
}
type Source = {
  tag: string
  id?: string
  class?: string[]
  elements?: Source[]
  properties?: UnknownRecord
  attributes?: Record<string, string>
}
type IndexableElement = Element & {
  [key: string]: unknown
} | HTMLElement & {
  [key: string]: unknown
}
type Context = {
  el: IndexableElement
  source: Source
}
type Giggle = Pick<Source, 'elements'>;

export const giggle = (source: Giggle, options?: Options): IndexableElement[] => {
  if (source.elements == null) {
    throw new Error('`elements` at the root is required.')
  }

  const elements = source.elements.map(el => createElement(el.tag, el))

  if (options?.appendTo != null) {
    elements.forEach(el => options.appendTo?.appendChild(el))
  }

  return elements
}

const createElement = (tag: string, source: Source): IndexableElement => {
  const el = document.createElement(tag) as IndexableElement
  const context = { el, source }

  attachId(context)
  attachClasses(context)
  attachAttributes(context)
  attachProperties(context)

  appendChildren(context)

  return el
}

const appendChildren = (context: Context): void => {
  if (context.source.elements == null) {
    return
  }

  giggle(context.source).forEach(so => context.el.appendChild(so))
}

const attachProperties = (context: Context): void => {
  if (context.source.properties == null) {
    return
  }

  Object.keys(context.source.properties).forEach(p => {
    if (context.el[p] == null) {
      return
    }

    context.el[p] = context.source.properties?.[p]
  })
}

const attachAttributes = (context: Context): void => {
  if (context.source.attributes == null) {
    return
  }

  Object.keys(context.source.attributes).forEach(a => {
    if (context.source.attributes?.[a] == null) {
      return
    }

    context.el.setAttribute(a, context.source.attributes[a])
  })
}

const attachClasses = (context: Context): void => {
  if (context.source.class == null) {
    return
  }

  context.source.class.forEach(cl => context.el.classList.add(cl))
}

const attachId = (context: Context): void => {
  context.el.id = context.source.id || `${context.source.tag}-${Math.random().toString(16).substring(2, 8)}`
}
