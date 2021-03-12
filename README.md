## size-chunker-stream 

![](https://github.com/akiroz/size-chunker-stream/actions/workflows/test.yaml/badge.svg)
[![](https://img.shields.io/npm/v/@akiroz/size-chunker-stream)](https://www.npmjs.com/package/@akiroz/size-chunker-stream)

A NodeJS transform stream for chunking raw data into constant-size chunks. Useful for consuming raw media streams where chunk size = 1 frame.

### API

```js
import SizeChunker from "@akiroz/size-chunker-stream";

const chunker = new SizeChunker({ chunkSize: 640 * 480 * 3 });

process.stdin.pipe(chunker);

chunker.on("data", (frame) => {
    // Do stuff with frame
});

```

#### Gotchas

The `SizeChunker` outputs `Buffer` of constant size, this does not mean the underlaying `ArrayBuffer` is also of the same constant size. To create typed views of the data, it may be nessesary to slice the underlaying `ArrayBuffer`:

```js
chunker.on("data", ({ buffer, length, byteOffset }: Buffer) => {
    const frame = new Int16Array(buffer.slice(byteOffset, byteOffset + length));
    // Do stuff with frame
});
```