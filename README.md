# order

This is an event driven e-commerce order system built in Fastify.It has create,update and delete order which would emits event to billing,inventory & notification

# Project Structure

order/
|
├── src/  
│ ├── controller/  
│ │ └── order.js
| ├── data/  
│ │ └── order.json
│ ├── utils/  
│ │ ├
│ │ └── helper.js
│ ├── repositories/  
│ │ └── order.js
│ ├── routes/  
│ │ └── order.js
│ ├── services/  
│ │ └── order.js
│ └── index.js  
├── package.json
└── README.md

# API Endpoints

POST /order create Order
GET /order get order
PUT /order/:id update order
DELETE /order/:id delete order

# Prerequisites

Node (v20+)
npm

# Architecture Diagram

![alt text](shopping.pdf)
