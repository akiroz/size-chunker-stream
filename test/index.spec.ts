import { strict as assert } from "assert";
import SizeChunker from "../src";

let chunker: SizeChunker;

describe("size-chunker", () => {
    beforeEach(() => {
        chunker = new SizeChunker({ chunkSize: 4 });
    });

    it("outputs constant size chunks", async () => {
        let chunks = [];
        chunker.on("data", chunk => chunks.push(chunk.length));
        
        chunker.write(Buffer.alloc(23)); // 5 chunks + 3 byte residue
        chunker.end();
        
        await new Promise(r => chunker.once("end", r));
        
        assert.deepEqual(chunks, [4, 4, 4, 4, 4]);
    });

    it("handles residule bytes from smaller chunks", async () => {
        let chunks = [];
        chunker.on("data", chunk => chunks.push([ ...chunk ]));
        
        chunker.write(Buffer.from([1, 2, 3]));
        chunker.write(Buffer.from([1, 2, 3]));
        chunker.write(Buffer.from([1, 2, 3]));
        chunker.end();
        
        await new Promise(r => chunker.once("end", r));
        
        assert.equal(chunks.length, 2);
        assert.deepEqual(chunks[0], [1, 2, 3, 1]);
        assert.deepEqual(chunks[1], [2, 3, 1, 2]);
    });



});