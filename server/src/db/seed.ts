import dotenv from "dotenv";
dotenv.config();
import { db } from './drizzle'; 
import { eq } from 'drizzle-orm';
import { packagingTypes } from './schemas/packagingTypes';
import { products } from './schemas/product';

const sellerId = 'caba5b78-3e91-49c8-9f15-18490d1a46a7';

async function seed() {
 
  const insertedPackaging =  await db.insert(packagingTypes).values([
  { name: 'Recyclable Paper', packagingScore: '9.5' },
  { name: 'Biodegradable Plastic', packagingScore: '8.0' },
  { name: 'Reusable Glass', packagingScore: '9.0' },
  { name: 'Compostable Bagasse', packagingScore: '8.8' },
  { name: 'Minimal Packaging', packagingScore: '10.0' },
]).returning({ id: packagingTypes.id, name: packagingTypes.name });

  const packagingMap = Object.fromEntries(insertedPackaging.map(p => [p.name, p.id]));

    await db.insert(products).values([
  {
    name: 'Eco-Friendly Notebook',
    description: 'Made with 100% recycled paper.',
    price: '5.99',
    imageUrl: 'https://example.com/notebook.jpg',
    brand: 'EcoWrite',
    category: 'Stationery',
    inStock: 100,
    carbonImpact: '1.2',
    packagingTypeId: packagingMap['Recyclable Paper'],
    ecoTags: ['recycled', 'sustainable'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft and breathable organic cotton.',
    price: '19.99',
    imageUrl: 'https://example.com/tshirt.jpg',
    brand: 'GreenWear',
    category: 'Clothing',
    inStock: 50,
    carbonImpact: '2.5',
    packagingTypeId: packagingMap['Biodegradable Plastic'],
    ecoTags: ['organic', 'biodegradable'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Reusable Water Bottle',
    description: 'Made of BPA-free stainless steel.',
    price: '15.49',
    imageUrl: 'https://example.com/bottle.jpg',
    brand: 'HydroGreen',
    category: 'Lifestyle',
    inStock: 70,
    carbonImpact: '1.8',
    packagingTypeId: packagingMap['Reusable Glass'],
    ecoTags: ['reusable', 'zero-waste'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Plant-Based Soap',
    description: 'Vegan and cruelty-free with compostable packaging.',
    price: '3.5',
    imageUrl: 'https://example.com/soap.jpg',
    brand: 'NatureClean',
    category: 'Personal Care',
    inStock: 200,
    carbonImpact: '0.8',
    packagingTypeId: packagingMap['Compostable Bagasse'],
    ecoTags: ['vegan', 'compostable'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Bamboo Toothbrush',
    description: 'Natural bamboo handle and recyclable bristles.',
    price: '2.99',
    imageUrl: 'https://example.com/toothbrush.jpg',
    brand: 'EcoBrush',
    category: 'Personal Care',
    inStock: 150,
    carbonImpact: '0.5',
    packagingTypeId: packagingMap['Minimal Packaging'],
    ecoTags: ['bamboo', 'low-waste'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'LED Light Bulb',
    description: 'Energy-efficient 10W LED bulb.',
    price: '4.25',
    imageUrl: 'https://example.com/bulb.jpg',
    brand: 'EcoLight',
    category: 'Electronics',
    inStock: 120,
    carbonImpact: '0.9',
    packagingTypeId: packagingMap['Recyclable Paper'],
    ecoTags: ['energy-saving', 'long-life'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Biodegradable Trash Bags',
    description: 'Certified home-compostable.',
    price: '6.75',
    imageUrl: 'https://example.com/trashbags.jpg',
    brand: 'GreenBin',
    category: 'Home Essentials',
    inStock: 80,
    carbonImpact: '1.1',
    packagingTypeId: packagingMap['Biodegradable Plastic'],
    ecoTags: ['compostable', 'biodegradable'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Eco-Friendly Cleaning Spray',
    description: 'Non-toxic, safe for pets and children.',
    price: '7.99',
    imageUrl: 'https://example.com/cleaner.jpg',
    brand: 'SafeClean',
    category: 'Home Essentials',
    inStock: 90,
    carbonImpact: '1.3',
    packagingTypeId: packagingMap['Reusable Glass'],
    ecoTags: ['non-toxic', 'reusable'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Organic Tea Bags',
    description: 'Compostable tea bags with minimal outer packaging.',
    price: '4.99',
    imageUrl: 'https://example.com/tea.jpg',
    brand: 'GreenLeaf',
    category: 'Food',
    inStock: 110,
    carbonImpact: '0.7',
    packagingTypeId: packagingMap['Compostable Bagasse'],
    ecoTags: ['organic', 'compostable'],
    supportsEcoPackaging: true,
    sellerId,
  },
  {
    name: 'Minimalist Phone Case',
    description: 'Made from recycled TPU with eco-friendly ink.',
    price: '9.95',
    imageUrl: 'https://example.com/case.jpg',
    brand: 'EcoTech',
    category: 'Electronics',
    inStock: 65,
    carbonImpact: '1.0',
    packagingTypeId: packagingMap['Minimal Packaging'],
    ecoTags: ['recycled', 'minimal'],
    supportsEcoPackaging: true,
    sellerId,
  },
]);


  console.log('✅ Seed completed successfully.');
}

seed().catch((err) => {
  console.error('❌ Error during seed:', err);
  process.exit(1);
});
