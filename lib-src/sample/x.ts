export function x_instance(clients: any, create: any) {
    let mClients = (clients || {});
    if (typeof clients === 'function') {
        create = clients;
        mClients = {};
    }
    return new Proxy(mClients, {
        get(target, key) {
            const keystr = String(key);
            if (!target[keystr]) {
                try {
                    target[keystr] = create(keystr);
                }
                catch (e) {
                    console.error('Create Singleton Failure!', e);
                }
            }
            return target[keystr];
        }
    });
}

// 数组归一化, 转换成一个元素类型一致且没有空元素的数组
export function x_array(value: any, opts = {} as any) {
    const empty = [] as any[];
    if (!value) {
        return empty;
    }
    return empty.concat(value).filter(v => !x_empty(v, opts));
}

const EMPTIES = [null, undefined, NaN, '']

export type IEmptyOpts = {
    extras?: any[],
    strict?: boolean,
    exclude?: any[],
}

export function x_empty(value: any, opts: IEmptyOpts = {} ) {
    const { extras = [], strict = true, exclude = [] } = opts
    const filters = [ ...extras, ...EMPTIES ].filter(x => !exclude.includes(x))
    if (strict && xTypeOf(value, 'object')) {
      return Object.keys(value).length === 0
    } else if (strict && xTypeOf(value, 'array')) {
      return value.length === 0
    } else {
      return filters.includes(value)
    }
}

type ITypes<T = any> = {
    string: string,
    number: number,
    boolean: boolean,
    symbol: symbol,
    date: Date,
    promise: Promise<T>,
    array: Array<T>,
    regexp: RegExp,
    object: object,
    function: () => T,
}  

function xType(value: any) {
    return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
}
  
type ITypesKeys = keyof ITypes
  
export function xTypeOf<
    T extends any = undefined,
    U extends ITypesKeys = ITypesKeys,
    V = T extends undefined ? ITypes[U] : T,
  >(value: any, ...datatypes: U[]): value is V {
      if (datatypes.includes('function' as U) && !datatypes.includes('asyncfunction' as U)) {
        datatypes.push('asyncfunction' as U)
      }
      return datatypes.includes(xType(value) as U)
  }
  