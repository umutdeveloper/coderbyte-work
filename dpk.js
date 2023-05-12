const crypto = require('crypto');

/**
 * Generates a deterministic partition key for the given event.
 * @param {?Object} event The event object.
 * @return {string} The partition key.
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  const hash = (data) => crypto.createHash('sha3-512').update(data).digest('hex');
  const truncate = (key) => key.length > MAX_PARTITION_KEY_LENGTH ? hash(key) : key;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate = event.partitionKey ? event.partitionKey : hash(JSON.stringify(event));

  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  return truncate(candidate);
};