const express = require('express');
const router = express.Router();
const Engineering = require('../models/Engineering');

/**
 * @swagger
 * tags:
 *   name: Engineering
 *   description: Engineering department management
 */

/**
 * @swagger
 * /api/engineering:
 *   get:
 *     summary: Retrieve a list of engineering projects
 *     tags: [Engineering]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: A list of engineering projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The project ID
 *                   name:
 *                     type: string
 *                     description: The project name
 *                   project:
 *                     type: string
 *                     description: The project description
 */

// Create
router.post('/', async (req, res) => {
  try {
    const newProject = new Engineering(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/engineering:
 *   post:
 *     summary: Create a new engineering project
 *     tags: [Engineering]
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
 *               - project
 *             properties:
 *               name:
 *                 type: string
 *                 description: The project name
 *               project:
 *                 type: string
 *                 description: The project description
 *     responses:
 *       201:
 *         description: The created project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The project ID
 *                 name:
 *                   type: string
 *                   description: The project name
 *                 project:
 *                   type: string
 *                   description: The project description
 *       400:
 *         description: Bad request
 */

// Read All
router.get('/', async (req, res) => {
  try {
    const projects = await Engineering.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read One
router.get('/:id', async (req, res) => {
  try {
    const project = await Engineering.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/engineering/{id}:
 *   get:
 *     summary: Retrieve a single engineering project by ID
 *     tags: [Engineering]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       200:
 *         description: A single project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The project ID
 *                 name:
 *                   type: string
 *                   description: The project name
 *                 project:
 *                   type: string
 *                   description: The project description
 *       404:
 *         description: Project not found
 */

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Engineering.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/engineering/{id}:
 *   put:
 *     summary: Update an engineering project by ID
 *     tags: [Engineering]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The project name
 *               project:
 *                 type: string
 *                 description: The project description
 *     responses:
 *       200:
 *         description: The updated project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The project ID
 *                 name:
 *                   type: string
 *                   description: The project name
 *                 project:
 *                   type: string
 *                   description: The project description
 *       400:
 *         description: Bad request
 *       404:
 *         description: Project not found
 */

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Engineering.findByIdAndDelete(req.params.id);
    if (deletedProject) {
      res.status(204).send();
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/engineering/{id}:
 *   delete:
 *     summary: Delete an engineering project by ID
 *     tags: [Engineering]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Project not found
 */

module.exports = router;
