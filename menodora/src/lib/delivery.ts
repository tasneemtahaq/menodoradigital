export const deliveryRates: Record<string, number> = {
  Karachi: 250,
  Hyderabad: 250,
  Multan: 350,
  Rawalpindi: 350,
  Abbottabad: 350,
  Peshawar: 350,
  Lahore: 350,
  Quetta: 350,
};

export const DEFAULT_DELIVERY_CHARGE = 350;

export function getDeliveryCharge(city: string): number {
  const normalizedCity = city.trim();
  const match = Object.keys(deliveryRates).find(
    (key) => key.toLowerCase() === normalizedCity.toLowerCase()
  );
  return match ? deliveryRates[match] : DEFAULT_DELIVERY_CHARGE;
}