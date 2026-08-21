export const deliveryRates: Record<string, number> = {
  Karachi: 250,
  Hyderabad: 350,
  Multan: 350,
  Rawalpindi: 400,
  Abbottabad: 450,
  Peshawar: 450,
  Lahore: 400,
  Quetta: 400,
};

export const DEFAULT_DELIVERY_CHARGE = 400;

export function getDeliveryCharge(city: string): number {
  const normalizedCity = city.trim();
  const match = Object.keys(deliveryRates).find(
    (key) => key.toLowerCase() === normalizedCity.toLowerCase()
  );
  return match ? deliveryRates[match] : DEFAULT_DELIVERY_CHARGE;
}