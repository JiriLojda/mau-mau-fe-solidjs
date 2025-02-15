export const zip = <LValue, RValue>(
  leftSource: ReadonlyArray<LValue>,
  rightSource: ReadonlyArray<RValue>,
): ReadonlyArray<Pair<LValue, RValue>> => {
  const sizeOfTheSmallerArray = Math.min(leftSource.length, rightSource.length);

  return Array(sizeOfTheSmallerArray)
    .fill(null)
    .map((_, index) => [leftSource[index] ?? null, rightSource[index] ?? null]) as ReadonlyArray<
    Pair<LValue, RValue>
  >;
};

type Pair<LValue, RValue> = Readonly<[valueXSourceA: LValue, valueXSourceB: RValue]>;
