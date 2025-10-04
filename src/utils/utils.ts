export function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
}

export function deepCopy<T>(value: T): T {
  const x_map = new Map<any, any>();

  function _deepClone<V>(value: V): V {
    if (typeof value !== "object" || value === null) {
      return value;
    }

    if (x_map.has(value)) {
      return x_map.get(value);
    }

    const result: any = Array.isArray(value) ? [] : ({} as Record<string, any>);
    x_map.set(value, result);

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = _deepClone((value as any)[key]);
      }
    }

    return result;
  }

  return _deepClone(value);
}
