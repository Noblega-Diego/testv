export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'food' | 'toys' | 'accessories' | 'hygiene' | 'medicine';
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Dog Food',
    description: 'Alimento balanceado para perros adultos con proteínas de alta calidad y nutrientes esenciales.',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'food',
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'Pelota de Juguete',
    description: 'Pelota resistente para perros, ideal para juegos de buscar y traer.',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'toys',
    stock: 30
  },
  {
    id: '3',
    name: 'Collar Ajustable',
    description: 'Collar ajustable para perros medianos y grandes, material resistente y duradero.',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    stock: 20
  },
  {
    id: '4',
    name: 'Shampoo para Gatos',
    description: 'Shampoo suave especial para gatos, con pH balanceado y aroma agradable.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1606240639706-dbc2231c7a92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'hygiene',
    stock: 25
  },
  {
    id: '5',
    name: 'Cama para Mascotas',
    description: 'Cama acolchada y cómoda para perros y gatos, lavable a máquina.',
    price: 35.50,
    image: 'https://images.unsplash.com/photo-1567612529009-ded21eb6a100?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    stock: 10,
    featured: true
  },
  {
    id: '6',
    name: 'Rascador para Gatos',
    description: 'Rascador vertical con plataformas para que tu gato juegue y descanse.',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    stock: 8
  },
  {
    id: '7',
    name: 'Alimento para Gatos',
    description: 'Alimento premium para gatos con proteínas de alta calidad y taurina.',
    price: 38.75,
    image: 'https://images.unsplash.com/photo-1600357077527-930ccbaf7773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'food',
    stock: 18
  },
  {
    id: '8',
    name: 'Juguete Interactivo',
    description: 'Juguete interactivo que dispensa premios mientras tu mascota juega.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'toys',
    stock: 12,
    featured: true
  },
  {
    id: '9',
    name: 'Antiparasitario',
    description: 'Tratamiento antiparasitario para perros y gatos, protección por 3 meses.',
    price: 28.50,
    image: 'https://images.unsplash.com/photo-1512237798647-84b57b22b517?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'medicine',
    stock: 22
  },
  {
    id: '10',
    name: 'Transportadora',
    description: 'Transportadora segura y cómoda para llevar a tu mascota al veterinario o de viaje.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1541781550486-81b7a2328578?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    stock: 7
  }
];