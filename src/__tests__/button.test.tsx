describe('App Basic Tests', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });

  test('math operations work', () => {
    expect(10 + 5).toBe(15);
    expect(10 - 5).toBe(5);
    expect(10 * 5).toBe(50);
    expect(10 / 5).toBe(2);
  });

  test('string operations work', () => {
    const name = 'Next.js Blog';
    expect(name.length).toBe(12);  // includes the dot
    expect(name.toUpperCase()).toBe('NEXT.JS BLOG');
    expect(name.toLowerCase()).toBe('next.js blog');
  });

  test('array operations work', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.length).toBe(5);
    expect(arr.includes(3)).toBe(true);
    expect(arr.includes(10)).toBe(false);
  });

  test('object operations work', () => {
    const user = { name: 'Syah', email: 'syah@example.com' };
    expect(user.name).toBe('Syah');
    expect(user.email).toBe('syah@example.com');
  });
});
