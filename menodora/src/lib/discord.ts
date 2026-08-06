type OrderNotificationData = {
  orderNumber: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  transactionId: string | null;
  items: { productName: string; quantity: number; price: number }[];
  grandTotal: number;
};

export async function sendOrderNotification(order: OrderNotificationData) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Discord webhook URL missing, skipping notification");
    return;
  }

  const itemsList = order.items
    .map((item) => `• ${item.productName} × ${item.quantity} — Rs. ${(item.price * item.quantity).toLocaleString()}`)
    .join("\n");

  const embed = {
    title: "🛍️ New Order Received!",
    color: 0xd4af37,
    fields: [
      { name: "Order", value: `#${order.orderNumber}`, inline: true },
      { name: "Total", value: `Rs. ${order.grandTotal.toLocaleString()}`, inline: true },
      { name: "Payment", value: order.paymentMethod.toUpperCase(), inline: true },
      { name: "Customer", value: order.fullName, inline: false },
      { name: "Phone", value: order.phone, inline: true },
      { name: "City", value: order.city, inline: true },
      { name: "Address", value: order.address, inline: false },
      { name: "Items", value: itemsList, inline: false },
      ...(order.transactionId
        ? [{ name: "Transaction ID", value: order.transactionId, inline: false }]
        : []),
    ],
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
  }
}