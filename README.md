# BETWIXT
#### A sample resturant web app

[Live Website](https://betwixt-frontend.vercel.app)
[https://betwixt-frontend.vercel.app/](https://betwixt-frontend.vercel.app)

#### Features
- Menu page to show all items available in menu (images stored in cloudinary)
- A Cart that double as a checkout page
- User can add/remove items to cart from menu page, item page and cart panel
- Login using Google account (enabled by firebase)
- Sensitive resources require authorization in API (courtesy firebase verify id tokens)
- Dark and Light Mode (with toggle)
- Dedicated information page for each different item on menu
- Order history page to view user's past orders

#### Technologies Used
- ```Next.js``` for frontend web app
- ```Node.js``` and ```Express.js``` used for backend api development
- ```MongoDB``` as the database to store menu items, user information and order information
- Using ```Microservice``` architecture to split backend into 3 dedicated services
    - Auth MS : Handles user authentication and user data
    - Item MS : Handles menu items and restuarant related operations
    - Order MS : Handles order creation and order history
- Using ```Firebase``` for Login and Authorizing users
- Configured **authorization** on sensitive routes like ```POST /orders```
- **Authorization** is done using ```Firebase Verify Id Tokens```
- Whole project is currently deployed on ```Vercel```
- Images and other static assets are store in ```Cloudinary```


