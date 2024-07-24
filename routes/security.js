const express = require('express');
const router = express.Router();
const Security = require('../models/Security');

/**
 * @swagger
 * tags:
 *   name: Security
 *   description: Security department management
 */

/**
 * @swagger
 * /api/security:
 *   get:
 *     summary: Retrieve a list of security staff
 *     tags: [Security]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of security staff
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The staff ID
 *                   name:
 *                     type: string
 *                     description: The staff name
 *                   clearanceLevel:
 *                     type: string
 *                     description: The staff clearance level
 */

// Create
router.post('/', async (req, res) => {
  try {
    const newStaff = new Security(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/security:
 *   post:
 *     summary: Create a new security staff member
 *     tags: [Security]
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
 *               - clearanceLevel
 *             properties:
 *               name:
 *                 type: string
 *                 description: The staff name
 *               clearanceLevel:
 *                 type: string
 *                 description: The staff clearance level
 *     responses:
 *       201:
 *         description: The created staff member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The staff ID
 *                 name:
 *                   type: string
 *                   description: The staff name
 *                 clearanceLevel:
 *                   type: string
 *                   description: The staff clearance level
 *       400:
 *         description: Bad request
 */

// Read All
router.get('/', async (req, res) => {
  try {
    const staff = await Security.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read One
router.get('/:id', async (req, res) => {
  try {
    const staff = await Security.findById(req.params.id);
    if (staff) {
      res.json(staff);
    } else {
      res.status(404).send("Staff not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/security/{id}:
 *   get:
 *     summary: Retrieve a single security staff member by ID
 *     tags: [Security]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: A single staff member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The staff ID
 *                 name:
 *                   type: string
 *                   description: The staff name
 *                 clearanceLevel:
 *                   type: string
 *                   description: The staff clearance level
 *       404:
 *         description: Staff not found
 */

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedStaff = await Security.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedStaff) {
      res.json(updatedStaff);
    } else {
      res.status(404).send("Staff not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/security/{id}:
 *   put:
 *     summary: Update a security staff member by ID
 *     tags: [Security]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The staff name
 *               clearanceLevel:
 *                 type: string
 *                 description: The staff clearance level
 *     responses:
 *       200:
 *         description: The updated staff member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The staff ID
 *                 name:
 *                   type: string
 *                   description: The staff name
 *                 clearanceLevel:
 *                   type: string
 *                   description: The staff clearance level
 *       400:
 *         description: Bad request
 *       404:
 *         description: Staff not found
 */

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedStaff = await Security.findByIdAndDelete(req.params.id);
    if (deletedStaff) {
      res.status(204).send();
    } else {
      res.status(404).send("Staff not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/security/{id}:
 *   delete:
 *     summary: Delete a security staff member by ID
 *     tags: [Security]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Staff not found
 */

module.exports = router;
