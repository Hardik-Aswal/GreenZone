# Merge-Conflict - Eco-Friendly E-commerce Platform

A full-stack e-commerce platform focused on sustainable products with carbon footprint tracking and ML-powered recommendations.

## 🌱 Project Overview

This platform combines e-commerce functionality with environmental consciousness, featuring:
- **Sustainable Product Marketplace** - Products with eco-friendly packaging and carbon impact tracking
- **ML-Powered Recommendations** - Carbon footprint analysis and product suggestions
- **Role-Based Authentication** - Admin and customer user management
- **Real-time Analytics** - Environmental impact dashboard

## 🏗️ Architecture

```
Merge-Conflict/
├── client/          # Next.js 15 frontend
├── server/          # Node.js + Express API
├── ml/              # Python ML service (FastAPI)
├── .github/         # CI/CD workflows
└── scripts/         # Service management scripts
```

## 🚀 Tech Stack

### Frontend (Client)
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: Redux Toolkit + Redux Persist
- **Authentication**: JWT with role-based access

### Backend (Server)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT + bcrypt
- **Migration**: Drizzle migrations

### ML Service
- **Framework**: FastAPI (Python)
- **ML Library**: scikit-learn (Random Forest)
- **Model**: Carbon footprint prediction
- **Data Processing**: pandas, numpy

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+ and pip
- PostgreSQL database
- Git

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Merge-Conflict
```

### 2. Setup Database
```bash
# Create PostgreSQL database
createdb your_database_name
```

### 3. Environment Configuration

**Server (.env)**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-super-secret-jwt-key"
PORT=4000
```

**Client (.env)**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

**ML Service:**
```bash
cd ml
pip install -r requirements.txt
```

### 5. Database Setup
```bash
cd server
npm run migrate
npm run seed
```

## 🏃‍♂️ Running the Application

### Option 1: Individual Services

**Start Server:**
```bash
cd server
npm run dev
```

**Start Client:**
```bash
cd client
npm run dev
```

**Start ML Service:**
```bash
cd ml
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Option 2: All Services (Recommended)

**Start all services:**
```bash
chmod +x launch_services.sh
./launch_services.sh
```

**View logs:**
```bash
./view_logs.sh ml          # ML service logs
./view_logs.sh server      # Server logs  
./view_logs.sh -a          # All logs
./view_logs.sh -f server   # Follow server logs
```

**Stop all services:**
```bash
./stop_services.sh
```

## 🌐 Service URLs

- **Client (Frontend)**: http://localhost:3000
- **Server (API)**: http://localhost:4000
- **ML Service**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 👥 User Roles & Features

### Customer Features
- Browse eco-friendly products
- View carbon impact scores
- Add products to cart
- Product reviews and ratings
- Sustainable packaging options

### Admin Features
- Product management (CRUD)
- User management
- Analytics dashboard
- Carbon footprint tracking
- Order management

## 🔐 Authentication

### Default Admin Account
```
Email: admin@gmail.com
Password: admin123
Role: admin
```

### API Authentication
```bash
# Login
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password",
  "role": "admin" | "customer"
}

# Protected routes require Authorization header
Authorization: Bearer <jwt_token>
```

## 📊 Database Schema

### Key Entities
- **Users**: Authentication and profile management
- **Products**: Eco-friendly product catalog
- **PackagingTypes**: Sustainable packaging options
- **Reviews**: Product reviews and ratings
- **Orders**: Purchase transactions

### Sample Product Data
```sql
{
  title: "Eco-Friendly Notebook",
  brand: "EcoWrite", 
  carbonImpact: "1.20",
  packagingType: "Recyclable Paper",
  ecoTags: ["recycled", "sustainable"],
  supportsEcoPackaging: true
}
```

## 🤖 ML Features

### Carbon Footprint Prediction
- **Model**: Random Forest Regressor
- **Features**: Product weight, materials, packaging type
- **Endpoint**: `POST /predict-carbon-footprint`

### Sample ML Request
```python
{
  "weight": 1.0,
  "material1": "Paper",
  "material2": "Plastic", 
  "packaging_type": "Recyclable"
}
```

## 🔧 Development Scripts

### Server Scripts
```bash
npm run dev          # Development mode
npm run build        # Build for production
npm run migrate      # Run database migrations
npm run seed         # Seed sample data
```

### Client Scripts
```bash
npm run dev          # Development mode
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### ML Endpoints
- `POST /predict-carbon-footprint` - Predict product carbon impact
- `GET /health` - Service health check

## 🧪 Testing

```bash
# Run client tests
cd client
npm test

# Run server tests  
cd server
npm test

# Test ML service
cd ml
python -m pytest
```

## 🚢 Deployment

### Using Docker (Future)
```bash
docker-compose up --build
```

### Manual Deployment
1. Build client: `npm run build`
2. Setup production database
3. Configure environment variables
4. Deploy to your preferred platform (Vercel, Railway, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Issues:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify database exists
psql -l
```

**Port Already in Use:**
```bash
# Kill process on port
sudo fuser -k 3000/tcp  # For client
sudo fuser -k 4000/tcp  # For server
sudo fuser -k 8000/tcp  # For ML service
```

**Migration Errors:**
```bash
# Reset database
cd server
npm run migrate:reset
npm run seed
```

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review logs: `./view_logs.sh -a`

---

**Made with 🌱 for a sustainable future**