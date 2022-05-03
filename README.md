# Giggle

A json to html library.

## Why?

I love native browser technologies.

Being able to generate a full web page from json is super powerful. The benefit of being able to save the json anywhere, like in any database supporting json, opens up a lot of possibilities. It's easy to share between different systems, everybody understands json... The list is long :)

Giggle is built with a mindset of being part of a composition based structure. Meaning that in it self it might not give a lot of value in the modern era, but together with other tools it is very powerful.

## Friends

I will be building other tools that can be used together with Giggle:

- [A low-key reactivity JS library](https://github.com/sebkolind/praxy)
- A simple editor to edit json files used with Giggle

## Roadmap & ideas

### Async data

Sometimes it's required to fetch data from an endpoint and populate some input fields with the response. It would be input elements like: select, radio, checkboxes or even text fields.

**JSON Structure**
```json
{
  "elements": [
    {
      "tag": "select",
      "attributes": {
        "name": "select-1"
      }
      "values": {
        "url": "https://xxx.com/api/v1/data",
        "map": [
          // "target" being where to place the data
          // "value" being where to get the data in the JSON response
          {"target": "value", "value": "key"},
          {"target": "textContent", "value": "value"}
        ]
      }
    }
  ]
}
```

**API response**
```json
[
  {"key": "option-1", "value": "Option 1"},
  {"key": "option-2", "value": "Option 2"},
  {"key": "option-3", "value": "Option 3"},
]
```

**HTML output**
```html
<select name="select-1">
  <option value="option-1">Option 1</option>
  <option value="option-2">Option 2</option>
  <option value="option-3">Option 3</option>
</select>
```
