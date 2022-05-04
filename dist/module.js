const $149c1bd638913645$export$c21608a571ae8bca = async (source, options)=>{
    if (source.elements == null) throw new Error('`elements` at the root is required.');
    const elements = await Promise.all(source.elements.map((el)=>$149c1bd638913645$var$createElement(el.tag, el)
    ));
    if (options?.appendTo != null) elements.forEach((el)=>options.appendTo?.appendChild(el)
    );
    return elements;
};
const $149c1bd638913645$var$createElement = async (tag, source)=>{
    const el = document.createElement(tag);
    const context = {
        el: el,
        source: source
    };
    $149c1bd638913645$var$attachId(context);
    $149c1bd638913645$var$attachClasses(context);
    $149c1bd638913645$var$attachAttributes(context);
    $149c1bd638913645$var$attachProperties(context);
    await $149c1bd638913645$var$attachValues(context);
    $149c1bd638913645$var$appendChildren(context);
    return el;
};
const $149c1bd638913645$var$attachValues = async (context)=>{
    if (context.source.values == null || context.source.values?.url == null || context.source.values.pool != null) return;
    const response = await fetch(context.source.values.url);
    if (!response.ok) throw new Error(`Couldn't fetch ${context.source.values.url}`);
    context.source.values.pool = await response.json();
    const [key, value] = context.source.values.map.split(',').map((x)=>x.trim()
    );
    switch(context.source.values.tag){
        case 'option':
            context.source.elements = context.source.values.pool?.map((p)=>{
                return {
                    // FIXME: Tag is required, why does it complain?
                    tag: context.source.values.tag,
                    attributes: {
                        value: p[key]
                    },
                    properties: {
                        textContent: p[value]
                    }
                };
            });
            break;
        case 'radio':
            context.source.elements = context.source.values.pool?.map((p)=>{
                return {
                    tag: 'label',
                    elements: [
                        {
                            tag: 'span',
                            properties: {
                                textContent: p[value]
                            }
                        },
                        {
                            tag: 'input',
                            attributes: {
                                value: p[key]
                            },
                            properties: {
                                type: 'radio'
                            }
                        }
                    ]
                };
            });
            break;
        default:
            console.error(`The tag "${context.source.values.tag}" is not supported for "values".`);
            break;
    }
};
const $149c1bd638913645$var$appendChildren = async (context)=>{
    if (context.source.elements == null) return;
    const els = await $149c1bd638913645$export$c21608a571ae8bca(context.source);
    els.forEach((so)=>context.el.appendChild(so)
    );
};
const $149c1bd638913645$var$attachProperties = (context)=>{
    if (context.source.properties == null) return;
    Object.keys(context.source.properties).forEach((p)=>{
        context.el[p] = context.source.properties?.[p];
    });
};
const $149c1bd638913645$var$attachAttributes = (context)=>{
    if (context.source.attributes == null) return;
    Object.keys(context.source.attributes).forEach((a)=>{
        if (context.source.attributes?.[a] == null) return;
        context.el.setAttribute(a, context.source.attributes[a]);
    });
};
const $149c1bd638913645$var$attachClasses = (context)=>{
    if (context.source.class == null) return;
    context.source.class.forEach((cl)=>context.el.classList.add(cl)
    );
};
const $149c1bd638913645$var$attachId = (context)=>{
    context.el.id = context.source.id || `${context.source.tag}-${Math.random().toString(16).substring(2, 8)}`;
};


export {$149c1bd638913645$export$c21608a571ae8bca as giggle};
//# sourceMappingURL=module.js.map
