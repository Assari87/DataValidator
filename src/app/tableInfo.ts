
export class dataModel {
    constructor(
        public start?: number,
        public inclusiveStart?: boolean,
        public end?: number,
        public inclusiveEnd?: boolean,
        public result?: number,
    ) { }

    static empty() {
        return new dataModel(null, false, null, false, null);
    }
    get realStart(): number {
        return this.start == null ? this.start : (this.inclusiveStart ? this.start : this.start + 1);
    }

    get realEnd(): number {
        return this.end == null ? this.end : (this.inclusiveEnd ? this.end : this.end - 1);
    }

    isInclusiveNumber(number: number) {
        return (this.start == null || this.realStart <= number) &&
            (this.end == null || this.realEnd >= number);
    }
    toString() {
        return `${(this.start ?? '&infin;')} ${(this.inclusiveStart ? '<=' : '<')} C1 ${(this.inclusiveEnd ? '<=' : '<')} ${(this.end ?? '&infin;')}`;
    }
}
