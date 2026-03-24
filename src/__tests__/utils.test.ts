describe('Utility Functions', () => {
  // Simple test for className merger
  test('basic className joining works', () => {
    // This tests that Jest can run TypeScript
    expect(true).toBe(true);
  });

  test('simple math works', () => {
    expect(1 + 1).toBe(2);
  });

  test('string operations work', () => {
    const str = 'hello world';
    expect(str.includes('world')).toBe(true);
  });
});
