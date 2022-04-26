type UnknownRecord = Record<string, unknown>
type Component = {
  type: string;
  id?: string;
  class?: string[];
  options?: UnknownRecord
  attributes?: Record<string, string>;
}
type Source = {
  elements: Component[]
}
type IndexableElement = Element & {
  [key: string]: unknown;
} | HTMLElement & {
  [key: string]: unknown;
}

const giggle = (source: Source): IndexableElement[] => {
  if (source.elements == null) {
    throw new Error('`elements` at the root is required.')
  }

  return source.elements.map(e => createElement(e.type, e))
}

const appendChildren = (el: IndexableElement, c: Component): void => {
  if (c.options?.elements != null) {
    giggle(c.options as Source).forEach(ch => el.appendChild(ch))
  }
}

const createElement = (tag: string, c: Component): IndexableElement => {
  const el = document.createElement(tag) as IndexableElement

  attachId(el, c)
  attachClasses(el, c)
  attachAttributes(el, c)
  appendChildren(el, c)
  attachOptions(el, c)

  return el
}

const attachOptions = (el: IndexableElement, c: Component): void => {
  if (c.options != null) {
    Object.keys(c.options).forEach(o => {
      el[o] = c.options?.[o]
    })
  }
}

const attachAttributes = (el: IndexableElement, c: Component): void => {
  if (c.attributes != null) {
    Object.keys(c.attributes).forEach(a => {
      if (c.attributes?.[a] != null) {
        el.setAttribute(a, c.attributes[a])
      }
    })
  }
}

const attachClasses = (el: IndexableElement, c: Component): void => {
  if (c.class != null) {
    c.class.forEach(cl => el.classList.add(cl))
  }
}

const attachId = (el: IndexableElement, c: Component): void => {
  el.id = c.id || `${c.type}-${Math.random().toString(16).substring(2, 8)}`
}
