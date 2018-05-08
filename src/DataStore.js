class DataStore {
    constructor(cache) {
        this.cache = cache;
        this.size = cache.length;
    }

    getObjectAt(index) {
        return this.cache[index];
    }

    getAll(indexMap) {
        const filtered = [];
        if (indexMap === undefined) return undefined;
        for (let i = 0; i < indexMap.length; i++) {
            filtered.push(this.cache[indexMap[i]]);
        }
        return filtered;
    }

    getSize() {
        return this.size;
    }
}

export default DataStore;
