/*
https://www.genbeta.com/desarrollo/da-potencia-flexibilidad-tus-tests-jest
beforeEach( () => console.log('antes de cada prueba') );
beforeAll( () => console.log('antes de todas las pruebas') );
afterEach( () => console.log('Despues de cada prueba') );
afterAll( () => console.log('Despues de todas las pruebas') );
*/

const expectStatusCodeAndDataNotBeNull = (
  statusCode: number,
  data: any,
  expectedCode: number = 200,
) => {
  expect(statusCode).toBe(expectedCode);
  expect(data).not.toBeNull();
};

module.exports = {
  expectStatusCodeAndDataNotBeNull,
};
