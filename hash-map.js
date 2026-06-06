class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => {
      if (bucket.next) {
        let ref = bucket;
        do {
          count++;
          ref = ref.next;
        } while (ref);
      } else {
        count++;
      }
    });
    return count;
  }

  growBucket() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    oldBuckets.forEach((bucket) => {
      if (bucket.next) {
        let ref = bucket;
        do {
          this.set(ref.key, ref.value);
          ref = ref.next;
        } while (ref);
      } else {
        this.set(bucket.key, bucket.value);
      }
    });
  }

  set(key, value) {
    const index = this.hash(key);
    const bucketEntries = this.length();
    const bucketMaxEntries = Math.round(this.capacity * this.loadFactor);

    // handle buckets grow
    if (bucketEntries === bucketMaxEntries) {
      this.growBucket();
    }
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // add bucket
    let bucketRef = this.buckets[index];
    if (bucketRef) {
      do {
        if (bucketRef.key === key) {
          bucketRef.value = value;
          break;
        } else if (!bucketRef.next) {
          bucketRef.next = { key: key, value: value, next: null };
          break;
        }
        bucketRef = bucketRef.next;
      } while (bucketRef);
    } else {
      this.buckets[index] = { key: key, value: value, next: null };
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!bucket) {
      return null;
    }
    if (bucket.key === key) {
      return bucket.value;
    } else if (bucket.next) {
      let ref = bucket.next;
      do {
        if (ref.key === key) {
          return ref.value;
        }
        ref = ref.next;
      } while (ref);
      return null;
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!bucket) {
      return false;
    }

    if (bucket.key === key) {
      return true;
    } else if (bucket.next) {
      let ref = bucket.next;
      do {
        if (ref.key === key) {
          return true;
        }
        ref = ref.next;
      } while (ref);
      return false;
    } else {
      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (bucket.key === key) {
      if (bucket.next) {
        this.buckets[index] = bucket.next;
        return true;
      }
      delete this.buckets[index];
      return true;
    } else if (bucket.next) {
      let search = this.buckets[index].next;
      let prevSearch = this.buckets[index];
      do {
        if (search.key === key) {
          if (search.next) {
            prevSearch.next = search.next;
            return true;
          }
          prevSearch.next = null;
          return true;
        }
        search = search.next;
        prevSearch = prevSearch.next;
      } while (search);
    } else {
      return false;
    }
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  keys() {
    const buckets = [...this.buckets];
    const arr = [];
    buckets.forEach((bucket) => {
      if (bucket) {
        if (bucket.next) {
          let ref = bucket.next;
          arr.push(bucket.key);
          do {
            arr.push(ref.key);
            ref = ref.next;
          } while (ref);
        } else {
          arr.push(bucket.key);
        }
      }
    });
    return arr;
  }

  values() {
    const buckets = [...this.buckets];
    const arr = [];
    buckets.forEach((bucket) => {
      if (bucket) {
        if (bucket.next) {
          let ref = bucket.next;
          arr.push(bucket.value);
          do {
            arr.push(ref.value);
            ref = ref.next;
          } while (ref);
        } else {
          arr.push(bucket.value);
        }
      }
    });
    return arr;
  }

  entries() {
    const buckets = [...this.buckets];
    const arr = [];
    buckets.forEach((bucket) => {
      if (bucket) {
        if (bucket.next) {
          let ref = bucket.next;
          arr.push([bucket.key, bucket.value]);
          do {
            arr.push([ref.key, ref.value]);
            ref = ref.next;
          } while (ref);
        } else {
          arr.push([bucket.key, bucket.value]);
        }
      }
    });
    return arr;
  }
}

export { HashMap };
