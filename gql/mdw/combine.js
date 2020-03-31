const combineMiddlewares = (..._fns) => {
    const fns = _fns.filter(fn => typeof fn === 'function')

    const fabric = (resolver, idx) => {
        if (!fns[idx]) return resolver
        const fn = fns[idx]
        return (...args) => fn(fabric(resolver, idx + 1), ...args)
    }

    return (resolver, ...args) => fabric(resolver, 0)(...args)
}

module.export = combineMiddlewares
