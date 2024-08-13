![Banner](https://www.upload.ee/image/16965287/banner.png)

# Stock Management System

This project is an example of a stock management system developed using SvelteKit, Bun, and PocketBase. Users can add, update, delete, and list products.

Note: Test account information;
```bash
email: test@admin.com
password: admin12345
```

## Features

- Add, update, delete, and list products
- User-based product management
- Responsive design

## Technologies

- [SvelteKit](https://kit.svelte.dev/) - Frontend framework
- [Bun](https://bun.sh/) - JavaScript runtime
- [PocketBase](https://pocketbase.io/) - Backend as a service

## Folder Installation

1. **Install Dependencies**

   Clone the project and install the necessary dependencies:

   ```bash
   git clone https://github.com/queaxtra/stock-management.git
   cd stock-management
   bun install
   ```

2. **Start Server**

   Start the development server:

   ```bash
   bun run dev
   ```

3. **Open Browser**

   Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## PocketBase Installation
1. **PocketBase Installation**
    Install PocketBase
2. **Environment Variables**

    Create a `.env` file in the root of the project and add the following environment variables:

    ```env
    VITE_APP_POCKETURL=
    ```
3. **Start Server**
    Start the Pocketbase

## Pocketbase Collections
User Collection

1. **id (string, unique, auto-generated)** - Unique identifier for the user.
2. **username (string, unique)** - Username.
3. **email (string, unique)** - User's email address.
4. **password (string)** - Password (should be hashed).
5. **created (datetime, auto-generated)** - Date when the user was created.
6. **updated (datetime, auto-generated)** - Date when the user was last updated.

Product Collection

1. **id (string, unique, auto-generated)** - Unique identifier for the product.
2. **name (string)** - Product name.
description (string)** - Product description.
3. **price (number)** - Product price.
4. **itemCode (string, unique)** - Product code.
5. **quantity (number)** - Product quantity.
status (string) - Product status (e.g., "In Stock", "Out of Stock", "Low Stock").
6. **author (string)** - Identifier of the user who added the product.
7. **created (datetime, auto-generated)** - Date when the product was created.
8. **updated (datetime, auto-generated)** - Date when the product was last updated.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

## Contact

If you have any questions or feedback, please don't hesitate to reach out to us at [Telegram](https://t.me/queaxtra).