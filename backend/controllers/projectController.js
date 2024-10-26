
import Project from '../models/Project.js'; 

export const createProject = async (req, res) => {
    try {
        const { name, description, status, budget } = req.body;
        const project = new Project({ name, description, status, budget });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: 'Project creation failed' });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { name, description, status, budget } = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { name, description, status, budget },
            { new: true }
        );
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update project' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};

export const toggleProjectStatus = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        // Toggle status
        project.status = project.status === 'paid' ? 'unpaid' : 'paid';
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project status' });
    }
};
