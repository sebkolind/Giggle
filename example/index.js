import { giggle } from '@sebkolind/giggle'

const sample = {
  elements: [
    {
      type: 'div',
      elements: [
        {
          type: 'ul',
          elements: [
            { type: 'li', properties: { textContent: 'List item 1' } },
            { type: 'li', properties: { textContent: 'List item 2' } },
            { type: 'li', properties: { textContent: 'List item 3' } },
            { type: 'li', properties: { textContent: 'List item 4' } }
          ]
        }
      ]
    },
    {
      type: 'div',
      id: 'some-div',
      class: ['class1', 'class2'],
      elements: [
        {
          type: 'img',
          attributes: {
            src: 'https://via.placeholder.com/150x150'
          },
          properties: {}
        },
        {
          type: 'span',
          properties: {
            textContent: 'Hi! This is another text.'
          },
          elements: [
            {
              type: 'span',
              properties: {
                textContent: 'Hi! This is another text inside of the text.'
              }
            },
            {
              type: 'p',
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
      type: 'img',
      properties: {},
      attributes: {
        src: 'https://via.placeholder.com/150x150'
      }
    },
    {
      type: 'span',
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
