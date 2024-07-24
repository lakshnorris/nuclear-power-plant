const express = require('express');
const router = express.Router();
const Operations = require('../models/Operations');

/**
 * @swagger
 * tags:
 *   name: Operations
 *   description: Operations department management
 */

/**
 * @swagger
 * /api/operations:
 *   get:
 *     summary: Retrieve a list of operations staff
 *     tags: [Operations]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of operations staff
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
 *                   shift:
 *                     type: string
 *                     description: The staff shift
 */

// Create
router.post('/', async (req, res) => {
  try {
    const newStaff = new Operations(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/operations:
 *   post:
 *     summary: Create a new operations staff member
 *     tags: [Operations]
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
 *               - shift
 *             properties:
 *               name:
 *                 type: string
 *                 description: The staff name
 *               shift:
 *                 type: string
 *                 description: The staff shift
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
 *                 shift:
 *                   type: string
 *                   description: The staff shift
 *       400:
 *         description: Bad request
 */

// Read All
router.get('/', async (req, res) => {
  try {
    const staff = await Operations.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read One
router.get('/:id', async (req, res) => {
  try {
    const staff = await Operations.findById(req.params.id);
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
 * /api/operations/{id}:
 *   get:
 *     summary: Retrieve a single operations staff member by ID
 *     tags: [Operations]
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
 *                 shift:
 *                   type: string
 *                   description: The staff shift
 *       404:
 *         description: Staff not found
 */

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedStaff = await Operations.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
 * /api/operations/{id}:
 *   put:
 *     summary: Update an operations staff member by ID
 *     tags: [Operations]
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
 *               shift:
 *                 type: string
 *                 description: The staff shift
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
 *                 shift:
 *                   type: string
 *                   description: The staff shift
 *       400:
 *         description: Bad request
 *       404:
 *         description: Staff not found
 */

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedStaff = await Operations.findByIdAndDelete(req.params.id);
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
 * /api/operations/{id}:
 *   delete:
 *     summary: Delete an operations staff member by ID
 *     tags: [Operations]
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
