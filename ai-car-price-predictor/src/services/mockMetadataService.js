const mockMetadata = {
  manufacturers: [
    { id: 'toyota', name: 'Toyota' },
    { id: 'bmw', name: 'BMW' },
    { id: 'mercedes', name: 'Mercedes-Benz' },
    { id: 'audi', name: 'Audi' },
    { id: 'honda', name: 'Honda' },
    { id: 'ford', name: 'Ford' },
    { id: 'volkswagen', name: 'Volkswagen' },
    { id: 'hyundai', name: 'Hyundai' },
    { id: 'kia', name: 'Kia' },
    { id: 'nissan', name: 'Nissan' },
    { id: 'mazda', name: 'Mazda' },
    { id: 'subaru', name: 'Subaru' },
    { id: 'lexus', name: 'Lexus' },
    { id: 'porsche', name: 'Porsche' },
    { id: 'tesla', name: 'Tesla' },
    { id: 'chevrolet', name: 'Chevrolet' },
    { id: 'jeep', name: 'Jeep' },
    { id: 'volvo', name: 'Volvo' },
    { id: 'land-rover', name: 'Land Rover' },
    { id: 'mini', name: 'Mini' },
  ],
  models: {
    toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Yaris', 'Avalon', 'Sienna', 'Tacoma', 'Tundra'],
    bmw: ['3 Series', '5 Series', 'X3', 'X5', 'X1', 'X7', '7 Series', 'M3', 'M4', 'Z4'],
    mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class', 'S-Class', 'CLA', 'GLA', 'GLB', 'AMG GT'],
    audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3', 'A8', 'TT', 'e-tron', 'RS6'],
    honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Odyssey', 'Fit', 'Passport', 'Ridgeline', 'Insight'],
    ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Fusion', 'Ranger', 'Bronco', 'Maverick', 'Expedition'],
    volkswagen: ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta', 'Arteon', 'ID.4', 'Taos', 'ID.Buzz', 'Golf R'],
    hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue', 'Ioniq 5', 'Ioniq 6', 'Veloster'],
    kia: ['Forte', 'K5', 'Sportage', 'Sorento', 'Soul', 'Telluride', 'Carnival', 'EV6', 'EV9', 'Stinger'],
    nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano', 'Maxima', 'Frontier', 'Titan', 'Ariya', 'Z'],
    mazda: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'CX-30', 'CX-50', 'MX-5 Miata', 'CX-3', 'MX-30', 'CX-70'],
    subaru: ['Outback', 'Forester', 'Crosstrek', 'Ascent', 'Impreza', 'Legacy', 'WRX', 'BRZ', 'Solterra', 'WRX STI'],
    lexus: ['ES', 'RX', 'NX', 'IS', 'UX', 'GX', 'LS', 'LC', 'LX', 'RC'],
    porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Boxster', 'Cayman', '718', 'Panamera Sport Turismo', 'Macan EV'],
    tesla: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck', 'Roadster', 'Model S Plaid', 'Model X Plaid'],
    chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Suburban', 'Camaro', 'Colorado', 'Traverse', 'Blazer', 'Corvette'],
    jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Wagoneer', 'Grand Wagoneer'],
    volvo: ['XC60', 'XC90', 'XC40', 'S60', 'S90', 'V60', 'V90', 'C40', 'EX90', 'EX30'],
    'land-rover': ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Discovery', 'Discovery Sport', 'Defender', 'Evoque'],
    mini: ['Cooper', 'Cooper S', 'Countryman', 'Clubman', 'Convertible', 'Electric', 'John Cooper Works', 'Aceman'],
  },
  categories: [
    'Sedan',
    'SUV',
    'Hatchback',
    'Coupe',
    'Wagon',
    'Convertible',
    'Pickup Truck',
    'Van/Minivan',
    'Crossover',
  ],
  fuelTypes: [
    'Petrol',
    'Diesel',
    'Hybrid',
    'Plug-in Hybrid',
    'Electric',
    'CNG',
    'LPG',
  ],
  gearboxTypes: [
    'Automatic',
    'Manual',
    'CVT',
    'DSG',
    'Tiptronic',
    'Semi-Automatic',
  ],
  driveWheels: [
    'Front',
    'Rear',
    'All',
  ],
  doors: [2, 3, 4, 5],
  wheels: [
    'Left',
    'Right',
  ],
  colors: [
    'White',
    'Black',
    'Silver',
    'Gray',
    'Blue',
    'Red',
    'Green',
    'Brown',
    'Beige',
    'Yellow',
    'Orange',
    'Purple',
    'Gold',
    'Bronze',
  ],
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getMetadata() {
  await delay(300);
  return { ...mockMetadata };
}

export async function getModelsByManufacturer(manufacturerId) {
  await delay(150);
  const models = mockMetadata.models[manufacturerId] || [];
  return models.map(name => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name }));
}