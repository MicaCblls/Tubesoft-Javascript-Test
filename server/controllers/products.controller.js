const { response, request } = require("express");
const { Product, Op } = require("../db");

const getProducts = async (req = request, res = response) => {
  try {
    let { name } = req.query;

    //busco todos los productos
    const products = await Product.findAll();
    //si no encuentro respondo 404
    if (!products.length) {
      return res.status(404).send("No products found in database");
    }
    //si se envia un name por query busco por nombre en la base de datos
    if (name) {
      let foundProductsByName = await Product.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });
      //si no encuentro un producto respondo 404
      if (!foundProductsByName.length) {
        return res
          .status(404)
          .send("Invalid name, check the product names below");
      }

      foundProductsByName = foundProductsByName.map(
        (product) => product.dataValues
      );
      //si encuentro respondo con los productos encontrados
      return res.status(200).send(foundProductsByName);
    }
    //si no se envia un name respondo con todos los productos
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getProducts };
