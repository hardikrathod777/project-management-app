
import express from 'express';
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,toggleProjectStatus
} from '../controllers/projectController.js'; 

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/toggleStatus', toggleProjectStatus);


export default router; 
