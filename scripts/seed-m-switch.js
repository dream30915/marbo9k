/**
 * Seed products based on the user's provided images (M SWITCH 15000)
 */
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: "M SWITCH 15000 - Grape Aloe",
    description: "15000 Puffs, 600mAh Battery, 15ML E-liquid. Premium Grape Aloe flavor.",
    price: 290,
    stock: 100,
    image_url: "https://vape-cdn.com/m-switch-grape-aloe.png", // Placeholder, user should update
    is_active: true
  },
  {
    name: "M SWITCH 15000 - Watermelon",
    description: "15000 Puffs, 600mAh Battery, 15ML E-liquid. Refreshing Watermelon flavor.",
    price: 290,
    stock: 100,
    image_url: "https://vape-cdn.com/m-switch-watermelon.png",
    is_active: true
  },
  {
    name: "M SWITCH 15000 - Doublemint",
    description: "15000 Puffs, 600mAh Battery, 15ML E-liquid. Cool Doublemint flavor.",
    price: 290,
    stock: 100,
    image_url: "https://vape-cdn.com/m-switch-doublemint.png",
    is_active: true
  },
  {
    name: "M SWITCH 15000 - Blue Ice",
    description: "15000 Puffs, 600mAh Battery, 15ML E-liquid. Chilly Blue Ice flavor.",
    price: 290,
    stock: 100,
    image_url: "https://vape-cdn.com/m-switch-blue-ice.png",
    is_active: true
  }
];

async function seed() {
  console.log("Seeding products...");
  const { data, error } = await supabase.from("products").insert(products);
  if (error) {
    console.error("Error seeding products:", error);
  } else {
    console.log("Successfully seeded products!");
  }
}

seed();
