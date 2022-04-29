function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "giggle", () => $882b6d93070905b3$export$c21608a571ae8bca);
const $882b6d93070905b3$export$c21608a571ae8bca = (source, options)=>{
    if (source.elements == null) throw new Error('`elements` at the root is required.');
    const elements = source.elements.map((el)=>$882b6d93070905b3$var$createElement(el.tag, el)
    );
    if (options?.appendTo != null) elements.forEach((el)=>options.appendTo?.appendChild(el)
    );
    return elements;
};
const $882b6d93070905b3$var$createElement = (tag, source)=>{
    const el = document.createElement(tag);
    const context = {
        el: el,
        source: source
    };
    $882b6d93070905b3$var$attachId(context);
    $882b6d93070905b3$var$attachClasses(context);
    $882b6d93070905b3$var$attachAttributes(context);
    $882b6d93070905b3$var$attachProperties(context);
    $882b6d93070905b3$var$appendChildren(context);
    return el;
};
const $882b6d93070905b3$var$appendChildren = (context)=>{
    if (context.source.elements == null) return;
    $882b6d93070905b3$export$c21608a571ae8bca(context.source).forEach((so)=>context.el.appendChild(so)
    );
};
const $882b6d93070905b3$var$attachProperties = (context)=>{
    if (context.source.properties == null) return;
    Object.keys(context.source.properties).forEach((p)=>{
        if (context.el[p] == null) return;
        context.el[p] = context.source.properties?.[p];
    });
};
const $882b6d93070905b3$var$attachAttributes = (context)=>{
    if (context.source.attributes == null) return;
    Object.keys(context.source.attributes).forEach((a)=>{
        if (context.source.attributes?.[a] == null) return;
        context.el.setAttribute(a, context.source.attributes[a]);
    });
};
const $882b6d93070905b3$var$attachClasses = (context)=>{
    if (context.source.class == null) return;
    context.source.class.forEach((cl)=>context.el.classList.add(cl)
    );
};
const $882b6d93070905b3$var$attachId = (context)=>{
    context.el.id = context.source.id || `${context.source.tag}-${Math.random().toString(16).substring(2, 8)}`;
};


//# sourceMappingURL=main.js.map
