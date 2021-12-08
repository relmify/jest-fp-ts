import stripAnsi from './stripAnsi';

// pretty-format plugins may be specified when calling the pretty-format format()
// and may also be used as jest snapshot serializers when
// passed to `expect.addSnapshotSerializer()`
//
// Note that you can only add one snapshot serializer at a time
// using `expect.addSnapshotSerializer()`. Subsequent calls override
// previous calls.
export { stripAnsi };
