import { faker } from "@faker-js/faker";
faker.locale = "es";

function generateProducts() {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(8),
    price: faker.commerce.price(),
    stock: faker.random.numeric(3),
    category: faker.commerce.department(),
    thumbnail: faker.image.image(),
  };
}

export async function getGeneratedProducts(){
    const products= [];
 for (let i = 0; i < 100; i++) {
   products.push(generateProducts());
 }
 console.log(products)
}