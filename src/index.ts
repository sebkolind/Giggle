import { Giggle, Options, IndexableElement, Source, Context } from './types'

export const giggle = async (source: Giggle, options?: Options): Promise<IndexableElement[]> => {
  if (source.elements == null) {
    throw new Error('`elements` at the root is required.')
  }

  const elements = await Promise.all(source.elements.map(el => createElement(el.tag, el)))

  if (options?.appendTo != null) {
    elements.forEach(el => options.appendTo?.appendChild(el))
  }

  return elements
}

const createElement = async (tag: string, source: Source): Promise<IndexableElement> => {
  const el = document.createElement(tag) as IndexableElement
  const context: Context = { el, source }

  attachId(context)
  attachClasses(context)
  attachAttributes(context)
  attachProperties(context)
  await attachValues(context)

  appendChildren(context)

  return el
}

const attachValues = async (context: Context): Promise<void> => {
  if (context.source.values == null || context.source.values?.url == null || context.source.values.pool != null) {
    return
  }

  const response = await fetch(context.source.values.url)

  if (!response.ok) {
    throw new Error(`Couldn't fetch ${context.source.values.url}`)
  }

  context.source.values.pool = await response.json()

  const [key, value] = context.source.values.map.split(',').map(x => x.trim())

  switch (context.source.values.tag) {
    case 'option':
      context.source.elements = context.source.values.pool?.map(p => {
        return {
          // FIXME: Tag is required, why does it complain?
          tag: context.source.values!.tag,
          attributes: { value: p[key] },
          properties: { textContent: p[value] }
        }
      })
      break

    case 'radio':
      context.source.elements = context.source.values.pool?.map(p => {
        return {
          tag: 'label',
          elements: [
            {
              tag: 'span',
              properties: { textContent: p[value] }
            },
            {
              tag: 'input',
              attributes: { value: p[key] },
              properties: { type: 'radio' }
            }
          ]
        }
      })
      break

    default:
      console.error(`The tag "${context.source.values.tag}" is not supported for "values".`)
      break
  }
}

const appendChildren = async (context: Context): Promise<void> => {
  if (context.source.elements == null) {
    return
  }

  const els = await giggle(context.source)

  els.forEach(so => context.el.appendChild(so))
}

const attachProperties = (context: Context): void => {
  if (context.source.properties == null) {
    return
  }

  Object.keys(context.source.properties).forEach(p => {
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
