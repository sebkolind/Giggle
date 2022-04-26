type UnknownRecord = Record<string, unknown>
type Component = {
  type: string;
  id?: string;
  class?: string[];
  options: UnknownRecord
}
type Source = {
  elements: Component[]
}

const createElement = (tag: string, c: Component): Element => {
  const el = document.createElement(tag)

  el.id = c.id || `${c.type}-${Math.random().toString(16).substring(2, 8)}`

  if (c.class != null) {
    c.class.forEach(cl => el.classList.add(cl))
  }

  return el
}

const appendChildren = (el: Element, c: Component): void => {
  giggle(c.options as Source).forEach(ch => el.appendChild(ch))
}

const giggle = (source: Source): Element[] => {
  let el: Element
  const els: Element[] = []

  if (source.elements == null) {
    throw new Error('`elements` at the root is required.')
  }

  source.elements.forEach(c => {
    switch (c.type) {
      case 'div':
        el = createElement('div', c)
        if (c.options.elements != null) {
          appendChildren(el, c)
        }
        break

      case 'img':
        el = createElement('img', c)
        if (c.options.src == null) {
          throw new Error(`Element (#${el.id}) requires "src" in options`)
        }
        el.setAttribute('src', c.options.src as string)
        break

      case 'text':
        el = createElement('span', c)
        if (c.options.content == null) {
          console.info(`Element (#${el.id}) does not have "content" in options. Defaulting to empty string.`)
        }
        el.textContent = c.options.content as string || ''
        break

      default:
        throw new Error(`Component of type "${c.type}" is not supported`)
    }

    els.push(el)
  })

  return els
}
