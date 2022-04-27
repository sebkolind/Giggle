type UnknownRecord = Record<string, unknown>
type Source = {
  type: string
  id?: string
  class?: string[]
  elements?: Source[]
  options?: UnknownRecord
  attributes?: Record<string, string>
}
type IndexableElement = Element & {
  [key: string]: unknown
} | HTMLElement & {
  [key: string]: unknown
}

const giggle = (source: Source): IndexableElement[] => {
  if (source.elements == null) {
    throw new Error('`elements` at the root is required.')
  }

  return source.elements.map(e => createElement(e.type, e))
}

const createElement = (tag: string, s: Source): IndexableElement => {
  const el = document.createElement(tag) as IndexableElement

  attachId(el, s)
  attachClasses(el, s)
  attachAttributes(el, s)
  attachOptions(el, s)

  appendChildren(el, s)

  return el
}

const appendChildren = (el: IndexableElement, s: Source): void => {
  if (s.elements == null) {
    return
  }

  giggle(s).forEach(so => el.appendChild(so))
}

const attachOptions = (el: IndexableElement, s: Source): void => {
  if (s.options == null) {
    return
  }

  Object.keys(s.options).forEach(o => {
    if (el[o] == null) {
      return
    }

    el[o] = s.options?.[o]
  })
}

const attachAttributes = (el: IndexableElement, s: Source): void => {
  if (s.attributes == null) {
    return
  }

  Object.keys(s.attributes).forEach(a => {
    if (s.attributes?.[a] == null) {
      return
    }

    el.setAttribute(a, s.attributes[a])
  })
}

const attachClasses = (el: IndexableElement, s: Source): void => {
  if (s.class == null) {
    return
  }

  s.class.forEach(cl => el.classList.add(cl))
}

const attachId = (el: IndexableElement, s: Source): void => {
  el.id = s.id || `${s.type}-${Math.random().toString(16).substring(2, 8)}`
}
