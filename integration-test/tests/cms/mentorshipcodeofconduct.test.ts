import { expect, test } from '@playwright/test';
import { validateSchema } from '@utils/helpers/schema.validation';
import { mentorshipcodeofconductSchema } from '@utils/datafactory/schemas/mentorshipcodeofconduct.schema';

test('GET /api/cms/v1/mentorship/code-of-conduct returns correct data', async ({ request }) => {
  const response = await request.get('/api/cms/v1/mentorship/code-of-conduct');
  expect(response.status()).toBe(200);
  // response status validation
  const body = await response.json();

  // schema validation
  try {
    validateSchema(mentorshipcodeofconductSchema, body);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`Schema validation failed: ${e.message}`);
    } else {
      throw new Error('Schema validation failed with an unknown error');
    }
  }
});

test.describe('unauthorized request with invalid headers', () => {
  const testData = [
    { description: 'header is empty', headers: { 'X-API-KEY': '' } },
    { description: 'header is invalid', headers: { 'X-API-KEY': 'invalid_key' } },
  ];

  testData.forEach(({ description, headers }) => {
    test(`${description}`, async ({ request }) => {
      const response = await request.get(`/api/cms/v1/mentorship/code-of-conduct`, {
        headers: headers,
      });
      expect(response.status()).toBe(401);
    });
  });
});
