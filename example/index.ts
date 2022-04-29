import { giggle } from '@sebkolind/giggle'

const sample = {
  elements: [
    {
      tag: 'div',
      elements: [
        {
          tag: 'ul',
          elements: [
            { tag: 'li', properties: { textContent: 'List item 1' } },
            { tag: 'li', properties: { textContent: 'List item 2' } },
            { tag: 'li', properties: { textContent: 'List item 3' } },
            { tag: 'li', properties: { textContent: 'List item 4' } }
          ]
        }
      ]
    },
    {
      tag: 'div',
      id: 'some-div',
      class: ['class1', 'class2'],
      elements: [
        {
          tag: 'img',
          attributes: {
            src: 'https://via.placeholder.com/150x150'
          },
          properties: {}
        },
        {
          tag: 'span',
          properties: {
            textContent: 'Hi! This is another text.'
          },
          elements: [
            {
              tag: 'span',
              properties: {
                textContent: 'Hi! This is another text inside of the text.'
              }
            },
            {
              tag: 'p',
              attributes: {
                title: 'A title attr on a paragraph'
              },
              properties: {
                textContent: 'This is a paragraph'
              }
            }
          ]
        }
      ],
      properties: {}
    },
    {
      tag: 'img',
      properties: {},
      attributes: {
        src: 'https://via.placeholder.com/150x150'
      }
    },
    {
      tag: 'span',
      class: ['class1', 'class2'],
      properties: {
        textContent: 'Hello, this is some cool text.'
      }
    }
  ]
}

giggle(sample, {
  appendTo: document.body
})
