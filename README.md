# Contact Manager API

## 📌 Overview  
Contact Manager API is a RESTful service for managing user contacts, featuring secure authentication, CRUD operations, and JWT-based authorization. Built using **Node.js, Express, MongoDB**, and **Mongoose**.

## 🚀 Features  
- User Registration & Login (JWT Authentication)  
- Secure Contact Creation, Retrieval, Update, and Deletion  
- Middleware-based Authentication  
- MongoDB Database Integration  

## 🛠 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Security:** JWT, bcrypt  

## 🛆 Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/rakshitdembla/contact-manager-api.git
cd contact-manager-api
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Setup Environment Variables  
Create a `.env` file in the root directory and add the following:  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

### 4️⃣ Run the Server  
```bash
npm start
```

## 📌 API Endpoints  

### **User Routes**
| Method | Endpoint       | Description            | Auth Required |
|--------|--------------|------------------------|--------------|
| POST   | `/api/user/register` | Register a new user | ❌ No |
| POST   | `/api/user/login` | User login (JWT) | ❌ No |

### **Contact Routes**  
| Method | Endpoint            | Description                     | Auth Required |
|--------|---------------------|---------------------------------|--------------|
| POST   | `/api/contacts/create` | Create a new contact  | ✅ Yes |
| GET    | `/api/contacts/get` | Get all user contacts  | ✅ Yes |
| PATCH  | `/api/contacts/update/:id` | Update a contact  | ✅ Yes |
| DELETE | `/api/contacts/delete/:id` | Delete a contact  | ✅ Yes |

## 🐜 License  
This project is licensed under the **MIT License**.

---

💡 **Contributions, issues, and feature requests are welcome!**  
Made with ❤️ by [@rakshitdembla](https://github.com/rakshitdembla)

