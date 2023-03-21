const { response, request } = require("express");
const { Cart, CartProduct, Product, Op } = require("../db");
const getCarts = async (req = request, res = response) => {
  try {
    //busco el carrito por id, incluyo los datos de los modelos que necesito
    const cart = await Cart.findAll({
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: Product,
              attributes: [
                "id",
                "name",
                "price",
                "category",
                "gender",
                "brand",
                "description",
                "image",
              ],
            },
          ],
        },
      ],
      attributes: ["id", "total", "storedCartId"],
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
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
      attributes: ["id", "total", "storedCartId"],
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
    let { id } = req.query;
    let { size, color, amount, productId } = req.body;
    let cart;
    let createdCartId;

    //si no recibe estos valores respondo 400
    if (!size || !color || !productId) {
      return res.status(400).send("Incorrect data");
    }
    //busco el producto cuyo id es igual al productId enviado por body
    const product = await Product.findByPk(productId);

    //si no se envia el id del carrito por query, creo uno nuevo
    if (!id) {
      cart = await Cart.create({
        total: amount ? product.price * amount : product.price,
      });
      //se establece createdCartId con el id del nuevo carrito
      createdCartId = cart.id;
    } else {
      //en cambio si se envia un id solo busco el carrito en la base de datos
      cart = await Cart.findOne({
        where: { id: id },
      });
      if (!cart) {
        return res.status(400).send("Cart not found");
      }
    }
    //busco si ya se creo un cartProduct relacionado al producto encontrado y a los valores que recibo
    const foundCartProduct = await CartProduct.findOne({
      include: [{ model: Product }, { model: Cart }],
      where: {
        [Op.and]: [
          { productId: productId },
          { cartId: cart.id },
          { color: color },
          { size: size },
        ],
      },
    });

    //si no se ha creado ese cartProduct lo creo
    if (!foundCartProduct) {
      const cartProduct = await CartProduct.create({
        amount: amount ? amount : 1,
        color: color,
        size: size,
        cartId: cart.id,
        productId: productId,
      });

      await cart.addCartProduct(cartProduct);
      await cartProduct.addProduct(product);
    }

    //si se encontro un cartProduct en la base de datos, su amount es 1 y el amount que llega por body es -1 lo elimino y actualizo el total del carrito
    if (foundCartProduct?.amount === 1 && amount === -1) {
      await cart.update({
        total:
          cart.total - product.price === 0 ? 0 : cart.total - product.price,
      });
      await foundCartProduct.destroy();

      return res.status(202).send("The product was deleted");
    }

    //si no se tuvo que crear un carrito ni un cartProduct actualizo el total del carrito
    if (!createdCartId && foundCartProduct) {
      const gettingTotal = () => {
        if (amount > 1) {
          return cart.total + product.price * amount;
        }
        if (amount === 1) {
          return cart.total + product.price;
        }
        if (amount === -1) {
          return cart.total - product.price;
        }
      };

      await cart.update({
        total: gettingTotal(),
      });
      //y actualizo el amount del producto encontrado
      await foundCartProduct.update({
        amount: amount
          ? foundCartProduct.amount + amount
          : foundCartProduct.amount + 1,
      });
      await cart.save();
      await foundCartProduct.save();
      return res
        .status(202)
        .send(amount === -1 ? "One product less" : "One more product added");
    }

    //si no se tuvo que crear un carrito, pero se creo un cartProduct actualizo el total del carrito solamente
    if (!createdCartId && !foundCartProduct) {
      await cart.update({
        total: amount
          ? cart.total + product.price * amount
          : cart.total + product.price,
      });
      await cart.save();
      return res.status(201).send("New product added");
    }

    //respondo con los datos del carrito con el que estoy interactuando para obtener el id
    return res.status(201).send(cart);
  } catch (error) {
    console.log(error.message);
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
    const cartToDelete = await Cart.findByPk(id, {
      include: [{ model: CartProduct }],
    });

    //elimino los cartProduct que pueda tener adentro
    await cartToDelete.cartProducts?.forEach((cartProduct) =>
      cartProduct.destroy()
    );

    //elimino el carrito
    await cartToDelete.destroy();

    res.status(202).send("Cart deleted");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getCartById, addProductToCart, deleteCart, getCarts };
