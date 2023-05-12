const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

const hash = (data) => crypto.createHash('sha3-512').update(data).digest('hex');

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given input is null", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given input is undefined", () => {
    const trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key from the event if provided", () => {
    const event = {
      partitionKey: "myPartitionKey",
    };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("myPartitionKey");
  });

  it("Returns the hashed value of the event if no partition key is provided", () => {
    const event = {
      someData: "someData",
    };
    const data = JSON.stringify(event);
    const expectedHash = hash(data);

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedHash);
  });

  it("Returns the stringified value if partition key is not a string", () => {
    const event = {
      partitionKey: { key: "value" },
    };
    const expectedString = JSON.stringify(event.partitionKey);

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedString);
  });

  it("Returns the hashed value if partition key length exceeds the maximum allowed", () => {
    const longString = "a".repeat(257);
    const event = {
      partitionKey: longString,
    };
    const expectedHash = hash(longString);

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedHash);
  });

});
