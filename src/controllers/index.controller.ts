import { RequestHandler } from 'express';


export const getIndex: RequestHandler = async (req, res) => {
  try {
    const totalCategories = 0;
    const totalNotes = 0; 

    res.json({
      name: "Notes API",
      version: process.env.npm_package_version || "1.0.0",
      status: "operational",
      documentation: "/api-docs",
      endpoints: {
      },
      categories: {
        path: "/api/categories",
        methods: ["GET", "POST"]
      },
        notes: {
          path: "/api/notes",
          methods: ["GET", "POST"]
      },
      statistics: {
        totalNotes,
        totalCategories
      },
      timestamps: {
        server: new Date(),
        database: 'getDatabaseTimeStamp'
      }
    });
  } catch (error) {
    res.status(503).json({
      name: "Notes API",
      status: "maintenance",
      message: "Service temporarily unavailable"
    });
  }
};
