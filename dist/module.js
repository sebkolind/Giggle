const $149c1bd638913645$export$c21608a571ae8bca = (source, options)=>{
    if (source.elements == null) throw new Error('`elements` at the root is required.');
    const elements = source.elements.map((el)=>$149c1bd638913645$var$createElement(el.type, el)
    );
    if (options?.appendTo != null) elements.forEach((el)=>options.appendTo?.appendChild(el)
    );
    return elements;
};
const $149c1bd638913645$var$createElement = (tag, source)=>{
    const el = document.createElement(tag);
    const context = {
        el: el,
        source: source
    };
    $149c1bd638913645$var$attachId(context);
    $149c1bd638913645$var$attachClasses(context);
    $149c1bd638913645$var$attachAttributes(context);
    $149c1bd638913645$var$attachProperties(context);
    $149c1bd638913645$var$appendChildren(context);
    return el;
};
const $149c1bd638913645$var$appendChildren = (context)=>{
    if (context.source.elements == null) return;
    $149c1bd638913645$export$c21608a571ae8bca(context.source).forEach((so)=>context.el.appendChild(so)
    );
};
const $149c1bd638913645$var$attachProperties = (context)=>{
    if (context.source.properties == null) return;
    Object.keys(context.source.properties).forEach((p)=>{
        if (context.el[p] == null) return;
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
    context.el.id = context.source.id || `${context.source.type}-${Math.random().toString(16).substring(2, 8)}`;
};


export {$149c1bd638913645$export$c21608a571ae8bca as giggle};
//# sourceMappingURL=module.js.map
