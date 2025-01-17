// assets.js
import p1 from './p1.png';
import p2 from './p2.png';
import p3 from './p3.png';
import p4 from './p4.png';
import p5 from './p5.png';
import p6 from './p6.png';
import p7 from './p7.png';
import p8 from './p8.png';
import p9 from './p9.png';
import p10 from './p10.png';

import aboutImg from './aboutImg.jpg';
import applyImg from './applyImg.png';
import client from './client.jpg';
import fevicon from './fevicon.png';
import sliderImg from './sliderImg.png';
import w1 from './w1.png';
import w2 from './w2.png';
import w3 from './w3.png';
import exchange_icon from './exchange_icon.png';
import quality_icon from './quality_icon.png';
import upload_area from './upload_area.png'
import bin_icon from './bin_icon.png'
import razorpay from './razorpay_logo.png'
import stripe from './stripe_logo.png'

export const assets = {
  aboutImg,
  applyImg,
  client,
  fevicon,
  sliderImg,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  w1,
  w2,
  w3,
  p10,
  exchange_icon,
  quality_icon,
  upload_area,
  bin_icon ,
  razorpay,
  stripe,
};

export const products = [
  {
    _id: "67406ffcae4c80f65030170b",
    name: "Camera",
    description: "20 MP, 4K recording, WiFi-enabled.",
    price: 100,
    image: [p8, p8, p8, p8],  // Using p1 image for all image slots
    category: "Electronics",
    rentDays: 4,
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "bbb",
    name: "Smartphone",
    description: "6.5-inch display, 128GB storage, 5000mAh battery.",
    price: 200,
    image: [p2, p2, p2, p2],  // Using p2 image for all image slots
    category: "Electronics",
    rentDays: 7,
    date: 1716634345449,
    bestseller: false,
  },
  {
    _id: "ccccc",
    name: "Mobile",
    description: "Core i7, 16GB RAM, 512GB SSD.",
    price: 500,
    image: [p10, p10, p10, p10],  // Using p3 image for all image slots
    category: "Electronics",
    rentDays: 10,
    date: 1716634345450,
    bestseller: true,
  },
  {
    _id: "dddd",
    name: "Smartwatch",
    description: "GPS, heart rate monitor, and 7-day battery life.",
    price: 150,
    image: [p4, p4, p4, p4],  // Using p4 image for all image slots
    category: "Electrical",
    rentDays: 5,
    date: 1716634345451,
    bestseller: false,
  },
  {
    _id: "eeee",
    name: "Bluetooth Speaker",
    description: "Portable, waterproof, 12-hour battery life.",
    price: 80,
    image: [p5, p5, p5, p5],  // Using p5 image for all image slots
    category: "Electronics",
    rentDays: 6,
    date: 1716634345452,
    bestseller: true,
  },
  {
    _id: "ffff",
    name: "Headphones",
    description: "Noise-canceling, wireless, over-ear headphones.",
    price: 120,
    image: [p6, p6, p6, p6],  // Using p6 image for all image slots
    category: "Stationery",
    rentDays: 8,
    date: 1716634345453,
    bestseller: true,
  },
  {
    _id: "gggg",
    name: "Tablet",
    description: "10-inch screen, 64GB storage, with stylus.",
    price: 350,
    image: [p7, p7, p7, p7],  // Using p7 image for all image slots
    category: "Electronics",
    rentDays: 14,
    date: 1716634345454,
    bestseller: false,
  },
  {
    _id: "hhhh",
    name: "Drone",
    description: "4K camera, 30-minute flight time, GPS.",
    price: 400,
    image: [p3, p3, p3, p3],  // Using p8 image for all image slots
    category: "Electronics",
    rentDays: 10,
    date: 1716634345455,
    bestseller: true,
  },
  {
    _id: "iiii",
    name: "Game Console",
    description: "Supports 4K gaming, includes two controllers.",
    price: 350,
    image: [p9, p9, p9, p9],  // Using p9 image for all image slots
    category: "Stationery",
    rentDays: 7,
    date: 1716634345456,
    bestseller: true,
  },
];
