import { Product } from '../contexts/AppContext';
import sabzsitara1 from "../assets/sabzsitara1.jpg";
import sabzsitara2 from "../assets/sabzsitara2.jpg";
import zarizewar1 from "../assets/zarizewar1.jpg";
import zarizewar2 from "../assets/zarizewar2.jpg";
import mastaaniharyali1 from "../assets/mastaaniharyali1.jpg"
import mastaaniharyali2 from "../assets/mastaaniharyali2.jpg"
import rangeenkhayal1 from "../assets/rangeenkhayal1.jpg"
import rangeenkhayal2 from "../assets/rangeenkhayal2.jpg"
import barfiblush1 from "../assets/barfiblush1.jpg"
import barfiblush2 from "../assets/barfiblush2.jpg"
import rangreza1 from "../assets/rangreza1.jpg"
import rangreza2 from "../assets/rangreza2.jpg"



export const products: Product[] = [
  {
    id: '1',
    name: 'Sabz Sitara',
    price: 89999,
    originalPrice: 109999,
    images: [sabzsitara1,sabzsitara2],
    category: 'Bridal',
    occasion: 'Wedding',
    fabric: 'Pure Silk with Gold Zari',
    embroidery: 'Hand-embroidered with Zardozi work',
    colors: ['Deep Red', 'Gold', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
    description: 'This emerald green outfit features a rich Banarsi shirt, plazo and a laama dupata sprinkled with delicate chan. The shirt is beautifully adorned with hand-done kora and dabka work on the back, collar, sleeves, and sides — adding a touch of traditional charm.',
    careInstructions: 'Dry clean only. Store in muslin cloth.',
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Zari Zewar',
    price: 45999,
    images: [zarizewar1,zarizewar2],
    category: 'Formal',
    occasion: 'Mehndi',
    fabric: 'Georgette with Net',
    embroidery: 'Mirror work and thread embroidery',
    colors: ['Rose Gold', 'Peach', 'Champagne'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This stunning golden laama frock, beautifully adorned with intricate kora and dabka work all over. Paired with a classic messouri straight trouser, the ensemble is completed with a luxurious lama dupatta, delicately finished with chan detailing for a graceful shimmer.',
    careInstructions: 'Dry clean only.',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Mastaani haryali',
    price: 35999,
    images: [mastaaniharyali1,mastaaniharyali2],
    category: 'Formal',
    occasion: 'Formal',
    fabric: 'Pure Cotton Silk',
    embroidery: 'Chikankari work',
    colors: ['Ivory', 'Off White', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Timeless ivory anarkali with traditional chikankari embroidery for formal occasions.',
    careInstructions: 'Hand wash or dry clean.',
    isNew: true
  },
  {
    id: '4',
    name: 'Rangeen Khayal',
    price: 55999,
    images: [rangeenkhayal1,rangeenkhayal2],
    category: 'Bridal',
    occasion: 'Walima',
    fabric: 'Pure Silk Velvet',
    embroidery: 'Pearl and bead work',
    colors: ['Emerald Green', 'Navy Blue', 'Burgundy'],
    sizes: ['One Size'],
    description: 'Draped in a deep purple hue, this stunning outfit is crafted from luxurious sheesha silk and includes a shirt, palazzo pants, and a dupatta. The ensemble is delicately embellished with hand-done kora and dabka work, while the dupatta features dainty chan and finely detailed corners. Intricate embellishments on the palazzo further elevate its traditional charm.',
    careInstructions: 'Dry clean only. Handle with care.',
    isFeatured: true
  },
  {
    id: '5',
    name: 'Barfi Blush',
    price: 25999,
    images: [barfiblush1,barfiblush2    ],
    category: 'Party Wear',
    occasion: 'Party',
    fabric: 'Chiffon with Silk lining',
    embroidery: 'Sequin work',
    colors: ['Black', 'Navy', 'Wine'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Modern party dress with elegant sequin detailing for contemporary celebrations.',
    careInstructions: 'Dry clean recommended.'
  },
  {
    id: '6',
    name: 'Rangreza',
    price: 42999,
    images: [
      rangreza1,rangreza2
    ],
    category: 'Formal',
    occasion: 'Mehndi',
    fabric: 'Raw Silk',
    embroidery: 'Gota work with thread embroidery',
    colors: ['Yellow', 'Orange', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Traditional gharara set with authentic gota work, perfect for mehndi celebrations.',
    careInstructions: 'Dry clean only.'
  },
  
];