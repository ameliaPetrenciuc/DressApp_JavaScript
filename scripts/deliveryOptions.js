export const deliveryOptions=[{
  name:'1',
  deliveryDays:7,
  priceCents: 0
},{
  name:'2',
  deliveryDays:3,
  priceCents: 499
},{
  name:'3',
  deliveryDays:1,
  priceCents:999
}];

export function getDeliveryOption(deliveryOptionName) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.name === deliveryOptionName) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}