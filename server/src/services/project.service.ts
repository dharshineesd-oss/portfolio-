import Project, { IProject } from '../models/Project';

export class ProjectService {
  async getAllProjects(technology?: string): Promise<IProject[]> {
    const query = technology
      ? { technologies: { $in: [new RegExp(technology, 'i')] } }
      : {};
    return await Project.find(query).sort({ createdAt: -1 });
  }

  async getProjectById(id: string): Promise<IProject | null> {
    return await Project.findById(id);
  }

  async createProject(data: Partial<IProject>): Promise<IProject> {
    const project = new Project(data);
    return await project.save();
  }

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteProject(id: string): Promise<IProject | null> {
    return await Project.findByIdAndDelete(id);
  }
}

export const projectService = new ProjectService();
