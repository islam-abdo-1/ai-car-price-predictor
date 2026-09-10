function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateMockPrice(formData) {
  const basePrice = 18000;
  
  const year = Number(formData.productionYear) || 2020;
  const yearFactor = (year - 2000) * 800;
  
  const mileage = Number(formData.mileage) || 50000;
  const mileageFactor = -mileage * 0.08;
  
  const engineVolume = Number(formData.engineVolume) || 2.0;
  const engineFactor = engineVolume * 3000;
  
  const cylinders = Number(formData.cylinders) || 4;
  const cylinderFactor = (cylinders - 4) * 1500;
  
  const turboFactor = formData.turbo ? 2500 : 0;
  
  const leatherFactor = formData.leatherInterior ? 1500 : 0;
  
  const airbags = Number(formData.airbags) || 6;
  const airbagFactor = (airbags - 4) * 300;
  
  const categoryFactors = {
    'SUV': 5000,
    'Sedan': 0,
    'Hatchback': -2000,
    'Coupe': 3000,
    'Wagon': 1000,
    'Convertible': 4000,
    'Pickup Truck': 6000,
    'Van/Minivan': 2000,
    'Crossover': 3000,
  };
  const categoryFactor = categoryFactors[formData.category] || 0;
  
  const fuelFactors = {
    'Electric': 8000,
    'Plug-in Hybrid': 5000,
    'Hybrid': 3000,
    'Petrol': 0,
    'Diesel': 1000,
    'CNG': -1000,
    'LPG': -1500,
  };
  const fuelFactor = fuelFactors[formData.fuelType] || 0;
  
  const manufacturerFactors = {
    'porsche': 40000,
    'tesla': 15000,
    'bmw': 10000,
    'mercedes': 10000,
    'audi': 8000,
    'lexus': 8000,
    'land-rover': 12000,
    'volvo': 5000,
    'subaru': 2000,
    'mazda': 1000,
    'toyota': 0,
    'honda': 0,
    'ford': 0,
    'chevrolet': 0,
    'volkswagen': 2000,
    'hyundai': -1000,
    'kia': -1000,
    'nissan': -500,
    'mini': 3000,
    'jeep': 2000,
  };
  const manufacturerFactor = manufacturerFactors[formData.manufacturer] || 0;
  
  let price = basePrice + yearFactor + mileageFactor + engineFactor + cylinderFactor + 
              turboFactor + leatherFactor + airbagFactor + categoryFactor + fuelFactor + manufacturerFactor;
  
  price = Math.max(3000, Math.round(price / 100) * 100);
  
  const variation = 0.95 + Math.random() * 0.1;
  price = Math.round(price * variation / 100) * 100;
  
  return price;
}

export const mockPredictionService = {
  predict: async (formData) => {
    await delay(500 + Math.random() * 800);
    
    const predicted_price = calculateMockPrice(formData);
    const modelDisplayNames = {
      'ridge': 'Ridge Regression',
      'random_forest': 'Random Forest',
      'gradient_boosting': 'Gradient Boosting',
      'svr': 'SVR',
    };
    
    return {
      predicted_price,
      model: modelDisplayNames[formData.predictionModel] || formData.predictionModel,
      currency: 'GBP',
      timestamp: new Date().toISOString(),
      inputSummary: {
        manufacturer: formData.manufacturer,
        model: formData.model,
        productionYear: formData.productionYear,
        mileage: formData.mileage,
      },
    };
  },
};

export const realPredictionService = {
  predict: async (formData) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Prediction failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};