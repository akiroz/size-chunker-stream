import { strict as assert } from "assert";
import SizeChunker from "../src";

let chunker: SizeChunker;

describe("size-chunker", () => {
    beforeEach(() => {
        chunker = new SizeChunker({ chunkSize: 10 });
    });

    it("outputs constant size chunks", async () => {
        let chunks = [];
        chunker.on("data", chunk => chunks.push(chunk.length));
        
        chunker.write(Buffer.alloc(55)); // 10 chunks + 5 byte residue
        chunker.end();
        
        await new Promise(r => chunker.once("end", r));
        
        assert.deepEqual(chunks, [10, 10, 10, 10, 10]);
    });

});