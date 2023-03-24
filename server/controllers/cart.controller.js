const { response, request } = require("express");
const { Cart, Product, CartProduct, Op } = require("../db");

const getCarts = async (req = request, res = response) => {
  try {
    //busco el carrito por id, incluyo los datos de los modelos que necesito
    const cart = await Cart.findAll();

    //si no encuentro carritos, respondo 404
    if (!cart) {
      return res.status(404).send("Carts not found.");
    }
    //si lo encuentro respondo con el carrito
    return res.status(200).send(cart);
  } catch (error) {
    console.log(error.message);
  }
};
const getCartById = async (req = request, res = response) => {
  try {
    let { id } = req.params;
    //si no se pasa un id respondo 400
    if (!id) {
      return res.status(400).send("No ID value in request");
    }

    //busco el carrito por id, incluyo los datos de los modelos que necesito
    const cart = await Cart.findOne({
      where: { id: id },
    });

    //si no lo encuentro, respondo 404
    if (!cart) {
      return res.status(404).send("Cart not found.");
    }
    //si lo encuentro respondo con el carrito
    return res.status(200).send(cart);
  } catch (error) {
    console.log(error.message);
  }
};
const addProductToCart = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    const { amount, size, color, productId } = req.body;
    let cart;

    // Compruebo que se han enviado los datos necesarios
    if (!amount || !size || !color || !productId) {
      return res.status(400).send("Incorrect data");
    }

    // Busco el producto con el id enviado
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }

    //una vez que encontre el producto que tengo que agregar creo el item
    let item;
    // Si se ha enviado un id, busco el carrito en la base de datos
    if (id) {
      cart = await Cart.findOne({
        where: { id },
      });
    }

    // Si se encontro un carrito agrego el producto al carrito y guardo en la base de datos
    if (cart && !cart.items.length) {
      item = [
        {
          amount,
          size,
          color,
          product: {
            id: product.dataValues.id,
            name: product.dataValues.name,
            brand: product.dataValues.brand,
            image: product.dataValues.image,
            price: product.dataValues.price,
            gender: product.dataValues.gender,
            category: product.dataValues.category,
            description: product.dataValues.description,
          },
        },
      ];

      await cart.update({ items: item });
      await cart.save();
      await cart.addProduct(product);
      return res.status(201).send(cart);
    } else if (cart && cart.items.length) {
      item = [
        ...cart.items,
        {
          amount,
          size,
          color,
          product: {
            id: product.dataValues.id,
            name: product.dataValues.name,
            brand: product.dataValues.brand,
            image: product.dataValues.image,
            price: product.dataValues.price,
            gender: product.dataValues.gender,
            category: product.dataValues.category,
            description: product.dataValues.description,
          },
        },
      ];

      await cart.update({ items: item });
      await cart.save();
      await cart.addProduct(product);
      return res.status(201).send(cart);
    }

    // Si no encontre un carrito con el id enviado, crear uno nuevo
    if (!cart) {
      item = [
        {
          amount,
          size,
          color,
          product: {
            id: product.dataValues.id,
            name: product.dataValues.name,
            brand: product.dataValues.brand,
            image: product.dataValues.image,
            price: product.dataValues.price,
            gender: product.dataValues.gender,
            category: product.dataValues.category,
            description: product.dataValues.description,
          },
        },
      ];
      cart = await Cart.create({ items: item });
      await cart.addProduct(product);
    }

    return res.status(201).send(cart);
  } catch (error) {
    console.log(error);
  }
};

/* posibilidad de agregar mas de un mismo producto o eliminarlo */
const updateProductAmount = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { amount, productId } = req.body;
    let cart;
    let itemToUpdate;
    let itemUpdated;
    let newItems;

    // Compruebo que se han enviado los datos necesarios
    if (!amount || !productId || !id) {
      return res.status(400).send("Incorrect data");
    }

    // Busco el producto con el id enviado
    const product = await Product.findByPk(productId);

    //si no encuentro un producto respondo
    if (!product) {
      return res.status(400).send("Product not found");
    }
    //si encuentro, busco el carrito
    cart = await Cart.findOne({ where: { id } });

    //si no encuentro el carrito respondo 404
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    //si encuentro un carrito, busco el item que debo actualizar
    itemToUpdate = cart.items?.find((item) => item.product.id === productId);

    //si el carrito no tiene ese producto agregado, respondo 404
    if (!itemToUpdate) {
      return res.status(404).send("Product not found in this cart");
    }

    //si lo tiene y el amount que llega es -1, resto
    if (amount === -1) {
      //si el amount del producto ya era 1 y el amount que llega es -1, elimino el producto del array de items y de la tabla de cartProduct
      if (itemToUpdate && itemToUpdate.amount === 1 && amount === -1) {
        newItems = [
          ...cart.items?.filter((item) => item.product.id !== productId),
        ];

        let cartProductToDelete = await CartProduct.findOne({
          where: { [Op.and]: { cartId: id, productId: productId } },
        });

        await cartProductToDelete.destroy();
      } else {
        //si el amount del item era mayor a 1, solo sumo el amount, que al ser -1 va a restarse
        itemToUpdate = {
          ...itemToUpdate,
          amount: itemToUpdate.amount + amount,
        };

        //guardo los nuevos items
        newItems = [
          ...cart.items?.filter((item) => item.product.id !== productId),
          itemToUpdate,
        ];
      }
    }

    //si el amount que me llega es 1, lo sumo
    if (amount >= 1) {
      itemUpdated = { ...itemToUpdate, amount: itemToUpdate.amount + amount };

      newItems = [
        ...cart.items?.filter((item) => item.product.id !== productId),
        itemUpdated,
      ];
    }

    //actualizo el carrito guardando los newItems
    await cart.update({ items: newItems });
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
};

const deleteCart = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    //si no se pasa un id respondo 400
    if (!id) {
      return res.status(400).send("Not ID value in request");
    }

    //hay ID busco el carrito que hay que borrar
    const cartToDelete = await Cart.findByPk(id);
    //busco todos los productos relacionado en la tabla de cartProduct
    let cartProducts = await CartProduct.findAll({ where: { cartId: id } });

    //uso un condicional para en caso de que el carrito no tenga productos relacionados no se ejecute el destroy
    if (cartProducts.length) {
      //los elimino de la tabla
      await cartProducts.forEach((item) => item.destroy());
    }

    //elimino el carrito
    await cartToDelete.destroy();

    res.status(202).send("Cart deleted");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getCartById,
  addProductToCart,
  updateProductAmount,
  deleteCart,
  getCarts,
};
