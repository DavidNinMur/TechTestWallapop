
export function diffObjs(obj1: any, obj2: any) {
    var diffs: any = {};
    var key;

    var compare = function (item1: any, item2: any, key: string) {
        if (item1 !== item2) {
            diffs[key] = item2;
        }
    };

    // Loop through the first object
    for (key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            compare(obj1[key], obj2[key], key);
        }
    }

    // Loop through the second object and find missing items
    for (key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (!obj1[key] && obj1[key] !== obj2[key]) {
                diffs[key] = obj2[key];
            }
        }
    }
    return diffs;
};
