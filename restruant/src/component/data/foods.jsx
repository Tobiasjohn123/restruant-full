export const menuData = [
  {
    id: 1,
    name: "Smoked Ribeye Steak",
    price: 48,
    description: "Grass-fed beef, smoked over hickory wood for 6 hours, served with roasted garlic butter and crispy rosemary potatoes.",
    fullDescription: "Our signature ribeye is dry-aged for 28 days, then slow-smoked over hickory until perfectly tender. Served with house-made garlic butter, crispy rosemary potatoes, and seasonal grilled vegetables.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    category: "Mains",
    calories: "680 cal",
    prepTime: "25 min",
    isSpicy: false,
    isPopular: true,
    ingredients: ["Grass-fed beef", "Hickory wood", "Garlic butter", "Rosemary potatoes", "Seasonal vegetables"]
  },
  {
    id: 2,
    name: "Wild Mushroom Risotto",
    price: 32,
    description: "Creamy arborio rice, wild mushrooms, truffle oil, finished with parmesan crisp.",
    fullDescription: "A luxurious risotto made with wild foraged mushrooms, slowly cooked with white wine and parmesan. Finished with black truffle oil and a delicate parmesan crisp.",
    image: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZCUyMG11c2hyb29tJTIwcmlzb3R0b3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Vegetarian",
    calories: "520 cal",
    prepTime: "20 min",
    isSpicy: false,
    isPopular: true,
    ingredients: ["Arborio rice", "Wild mushrooms", "Truffle oil", "Parmesan", "White wine"]
  },
  {
    id: 3,
    name: "Charred Octopus",
    price: 28,
    description: "Mediterranean octopus, smoked paprika, lemon herb emulsion.",
    fullDescription: "Tender octopus charred to perfection over open flame, served with smoked paprika aioli and bright lemon herb emulsion. A true Mediterranean delight.",
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&q=80",
    category: "Appetizers",
    calories: "380 cal",
    prepTime: "15 min",
    isSpicy: true,
    isPopular: false,
    ingredients: ["Mediterranean octopus", "Smoked paprika", "Lemon", "Fresh herbs", "Garlic aioli"]
  },
  {
    id: 4,
    name: "Duck Confit",
    price: 42,
    description: "Slow-cooked duck leg, crispy skin, orange glaze, wild rice pilaf.",
    fullDescription: "Classic French duck confit, slow-cooked in its own fat for 12 hours. Crispy skin, tender meat, paired with orange-thyme glaze and wild rice pilaf.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    category: "Mains",
    calories: "720 cal",
    prepTime: "30 min",
    isSpicy: false,
    isPopular: true,
    ingredients: ["Duck leg", "Duck fat", "Orange glaze", "Wild rice", "Fresh thyme"]
  },
  {
    id: 5,
    name: "Lava Chocolate Cake",
    price: 16,
    description: "Warm chocolate cake with molten center, vanilla bean ice cream.",
    fullDescription: "Decadent warm chocolate cake with a molten dark chocolate center. Served with house-made vanilla bean ice cream and fresh berries.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    category: "Desserts",
    calories: "480 cal",
    prepTime: "12 min",
    isSpicy: false,
    isPopular: true,
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Vanilla ice cream", "Fresh berries"]
  },
  {
    id: 6,
    name: "Craft Cocktail Flight",
    price: 24,
    description: "Three signature cocktails: Old Fashioned, Smoked Negroni, Gold Rush.",
    fullDescription: "Experience our bartender's finest creations. Includes: Smoked Old Fashioned, Barrel-aged Negroni, and Honey Gold Rush. Each 2oz pour.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    category: "Drinks",
    calories: "300 cal",
    prepTime: "10 min",
    isSpicy: false,
    isPopular: false,
    ingredients: ["Bourbon", "Campari", "Gin", "Honey syrup", "Smoked wood chips"]
  },
  {
    id: 7,
    name: "Spicy Arrabiata Pasta",
    price: 26,
    description: "Handmade pasta, spicy tomato sauce, fresh basil, parmesan.",
    fullDescription: "Fresh handmade pasta tossed in a spicy tomato arrabiata sauce with garlic, red pepper flakes, and fresh basil. Topped with shaved parmesan.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    category: "Mains",
    calories: "550 cal",
    prepTime: "18 min",
    isSpicy: true,
    isPopular: false,
    ingredients: ["Fresh pasta", "San Marzano tomatoes", "Red pepper flakes", "Garlic", "Parmesan"]
  },
  {
    id: 8,
    name: "Mediterranean Mezze",
    price: 22,
    description: "Hummus, baba ghanoush, falafel, warm pita, olives.",
    fullDescription: "A shareable platter of house-made hummus, smoky baba ghanoush, crispy falafel, warm pita bread, and marinated olives.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    category: "Appetizers",
    calories: "420 cal",
    prepTime: "15 min",
    isSpicy: false,
    isPopular: true,
    ingredients: ["Chickpeas", "Eggplant", "Falafel", "Pita", "Kalamata olives"]
  }
];

export const categories = ["All", "Appetizers", "Mains", "Vegetarian", "Desserts", "Drinks"];

export default function MenuDetails({ item, onClose, onOrder, onBook }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-image">
          <img
            src={item.image}
            alt={item.name}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
            }}
          />
          <div className="modal-badge">{item.category}</div>
          {item.isPopular && <div className="modal-popular">⭐ Popular</div>}
        </div>

        <div className="modal-body">
          <h2>{item.name}</h2>

          <div className="modal-meta">
            <span>🔥 {item.calories}</span>
            <span>⏱️ {item.prepTime}</span>
            {item.isSpicy && <span>🌶️ Spicy</span>}
          </div>

          <p className="modal-description">{item.fullDescription || item.description}</p>

          <div className="modal-ingredients">
            <h4>Ingredients</h4>
            <ul>
              {item.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="modal-footer">
            <span className="modal-price">${item.price}</span>
            <div className="modal-buttons">
              <button className="btn-order-large" onClick={() => onOrder(item)}>
                🍽️ Order Now
              </button>
              <button className="btn-book-large" onClick={() => onBook(item)}>
                📅 Book a Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}