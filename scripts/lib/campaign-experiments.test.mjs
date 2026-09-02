import test from "node:test";
import assert from "node:assert/strict";
import { analyzeStep, wilsonInterval } from "./campaign-experiments.mjs";

test("requires two variations above the sample floor", () => {
  const result = analyzeStep({ variations: [
    { variation: "A", sent: 500, reply: 20, pos_reply: 10, is_active: true, is_del: false },
    { variation: "B", sent: 499, reply: 22, pos_reply: 12, is_active: true, is_del: false }
  ] });
  assert.equal(result.status, "insufficient_data");
});

test("declares a winner only when confidence ranges separate", () => {
  const result = analyzeStep({ variations: [
    { variation: "A", sent: 2000, reply: 100, pos_reply: 80, is_active: true, is_del: false },
    { variation: "B", sent: 2000, reply: 70, pos_reply: 30, is_active: true, is_del: false }
  ] });
  assert.equal(result.status, "winner");
  assert.equal(result.leader.label, "A");
});

test("labels a small apparent lead as directional", () => {
  const result = analyzeStep({ variations: [
    { variation: "A", sent: 700, reply: 30, pos_reply: 13, is_active: true, is_del: false },
    { variation: "B", sent: 700, reply: 29, pos_reply: 11, is_active: true, is_del: false }
  ] });
  assert.equal(result.status, "directional_leader");
});

test("Wilson interval is bounded and narrows with more data", () => {
  const small = wilsonInterval(5, 100);
  const large = wilsonInterval(50, 1000);
  assert.ok(small.low >= 0 && small.high <= 100);
  assert.ok((large.high - large.low) < (small.high - small.low));
});
