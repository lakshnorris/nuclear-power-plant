const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin department management
 */

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Retrieve a list of admins
 *     tags: [Admin]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The admin ID
 *                   name:
 *                     type: string
 *                     description: The admin name
 *                   role:
 *                     type: string
 *                     description: The admin role
 */

// Create
router.post('/', async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: The admin name
 *               role:
 *                 type: string
 *                 description: The admin role
 *     responses:
 *       201:
 *         description: The created admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The admin ID
 *                 name:
 *                   type: string
 *                   description: The admin name
 *                 role:
 *                   type: string
 *                   description: The admin role
 *       400:
 *         description: Bad request
 */

// Read All
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read One
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Retrieve a single admin by ID
 *     tags: [Admin]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: A single admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The admin ID
 *                 name:
 *                   type: string
 *                   description: The admin name
 *                 role:
 *                   type: string
 *                   description: The admin role
 *       404:
 *         description: Admin not found
 */

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedAdmin) {
      res.json(updatedAdmin);
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update an admin by ID
 *     tags: [Admin]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The admin name
 *               role:
 *                 type: string
 *                 description: The admin role
 *     responses:
 *       200:
 *         description: The updated admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The admin ID
 *                 name:
 *                   type: string
 *                   description: The admin name
 *                 role:
 *                   type: string
 *                   description: The admin role
 *       400:
 *         description: Bad request
 *       404:
 *         description: Admin not found
 */

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (deletedAdmin) {
      res.status(204).send();
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete an admin by ID
 *     tags: [Admin]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Admin not found
 */

module.exports = router;
