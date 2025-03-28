import { Request, Response } from 'express';
import multer from 'multer';
import { PropertyService } from '../services/propertyService';
import { PropertyDocument } from '../models/Property';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single('image');

export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  private processImage(file: Express.Multer.File) {
    return {
      data: file.buffer,
      contentType: file.mimetype
    };
  }

  async createProperty(req: Request, res: Response) {
    upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const propertyData = req.body;
        
       
        if (req.file) {
          // Store the image buffer directly
          propertyData.image = {
            data: req.file.buffer, 
            contentType: req.file.mimetype
          };
        }

        const property = await this.propertyService.createProperty(propertyData);
        res.status(201).json(property);

      } catch (error) {        res.status(400).json({ 
          error: error instanceof Error ? error.message : 'Failed to create property' 
        });
      }
    });
  }

  async getProperty(req: Request, res: Response) {
    try {
      const property = await this.propertyService.getPropertyById(req.params.id);
      if (!property) return res.status(404).json({ error: 'Property not found' });
      
      // If property has image, convert buffer to base64 for response
      if (property.image?.data) {
        const imageBase64 = property.image.data.toString('base64');
        property.image.data = imageBase64 as any; // Temporary override for response
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch property' });
    }
  }

  async getOwnerProperties(req: Request, res: Response) {
    try {
      const properties = await this.propertyService.getPropertiesByOwner(req.params.ownerId);
      
      // Convert image buffers to base64 for each property
      const propertiesWithImages = properties.map(property => {
        if (property.image?.data) {
          const imageBase64 = property.image.data.toString('base64');
          return {
            ...property.toObject(),
            image: {
              ...property.image,
              data: imageBase64
            }
          };
        }
        return property;
      });
      
      res.json(propertiesWithImages);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch properties' });
    }
  }

  async updateProperty(req: Request, res: Response) {
    upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const updateData = req.body;
        const propertyId = req.params.id;

        if (req.file) {
          updateData.image = this.processImage(req.file);
        }

        const updatedProperty = await this.propertyService.updateProperty(propertyId, updateData);
        
        if (!updatedProperty) {
          return res.status(404).json({ error: 'Property not found' });
        }

        // Convert image buffer to base64 for response
        if (updatedProperty.image?.data) {
          updatedProperty.image.data = updatedProperty.image.data.toString('base64') as any;
        }

        res.json(updatedProperty);
      } catch (error) {
        res.status(400).json({ 
          error: error instanceof Error ? error.message : 'Failed to update property' 
        });
      }
    });
  }

  async deleteProperty(req: Request, res: Response) {
    try {
      const success = await this.propertyService.deleteProperty(req.params.id);
      if (!success) return res.status(404).json({ error: 'Property not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to delete property' 
      });
    }
  }
}