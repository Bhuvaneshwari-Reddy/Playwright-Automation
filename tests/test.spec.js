const { test, expect } = require('@playwright/test');

test.describe('ReqRes API - GET Requests', () => {
  test('Fetch a list of users and verify response structure', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');

    // Assert the status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const responseBody = await response.json();
    console.log(responseBody);

    // Verify the structure of the response
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.page).toBe(2);
  });

  test('Fetch a single user by ID and verify details', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');

    // Assert the status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const responseBody = await response.json();
    console.log(responseBody);

    // Verify user details
    expect(responseBody.data).toHaveProperty('id', 2);
    expect(responseBody.data).toHaveProperty('email', 'janet.weaver@reqres.in');
    expect(responseBody.data).toHaveProperty('first_name', 'Janet');
  });

  test('Create a new user and verify response', async ({ request }) => {
    const userData = {
      name: 'morpheus',
      job: 'leader',
    };

    const response = await request.post('https://reqres.in/api/users', {
      data: userData,
    });

    // Assert the status code
    expect(response.status()).toBe(201);

    // Parse the response body
    const responseBody = await response.json();
    console.log(responseBody);

    // Verify response content
    expect(responseBody).toMatchObject(userData);
    expect(responseBody).toHaveProperty('id'); // Auto-generated ID
    expect(responseBody).toHaveProperty('createdAt'); // Timestamp
  });

  test('Update a user and verify response', async ({ request }) => {
    const updateData = {
      name: 'morpheus',
      job: 'zion resident',
    };

    const response = await request.put('https://reqres.in/api/users/2', {
      data: updateData,
    });

    // Assert the status code
    expect(response.status()).toBe(200);

    // Parse the response body
    const responseBody = await response.json();
    console.log(responseBody);

    // Verify response content
    expect(responseBody).toMatchObject(updateData);
    expect(responseBody).toHaveProperty('updatedAt'); // Timestamp
  });


  test('Verify non-existent user returns 404', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/23');

    // Assert the status code
    expect(response.status()).toBe(404);
  });
});



// test.describe('ReqRes API - POST Requests', () => {
//     test('Create a new user and verify response', async ({ request }) => {
//       const userData = {
//         name: 'morpheus',
//         job: 'leader',
//       };
  
//       const response = await request.post('https://reqres.in/api/users', {
//         data: userData,
//       });
  
//       // Assert the status code
//       expect(response.status()).toBe(201);
  
//       // Parse the response body
//       const responseBody = await response.json();
//       console.log(responseBody);
  
//       // Verify response content
//       expect(responseBody).toMatchObject(userData);
//       expect(responseBody).toHaveProperty('id'); // Auto-generated ID
//       expect(responseBody).toHaveProperty('createdAt'); // Timestamp
//     });
//   });
  