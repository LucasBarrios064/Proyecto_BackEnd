import { TicketModel } from "../../models/models/ticket.models.js";
const { default: cartsServices } = await import(
  "../cartsDAO/carts.services.js"
);

class ticketServices {
  async createTicket(cartID, email) {
    try {
      const cart = await cartsServices.getCart(cartID);
      let amount = 0;
      cart.products.forEach((product) => {
        let price = product.quantity * product._id.price;
        amount += price;
      });
      const data = {
        amount: amount,
        purcheaser: email,
      };
      const ticket = TicketModel.create(data);
      return ticket;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const TicketServices = new ticketServices();
export default TicketServices;
