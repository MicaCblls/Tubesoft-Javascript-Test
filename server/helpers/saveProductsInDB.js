const { Product } = require("../db");
const jsonData = require("../products.json");

const saveProductsInDB = async () => {
  try {
    const products = await Product.findAll();

    if (!products.length) {
      jsonData.forEach(async (p) => {
        let [product, createdProduct] = await Product.findOrCreate({
          where: {
            name: p.name,
          },
          defaults: {
            name: p.name,
            category: p.category,
            brand: p.brand,
            gender: p.gender,
            size: p.size.join(", "),
            color: Object.values(p.color).join(", "),
            description: p.description,
            price: p.price,
            image: p.image,
          },
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = saveProductsInDB;
