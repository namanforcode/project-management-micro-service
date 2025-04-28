import { create } from "zustand";

const API_URL = "http://localhost:3005/v1/project";

export const useProjectStore = create((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  message: null,

  // Fetch all projects
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")).access.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      set({ isLoading: false, projects: data.projects });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.error(error);
    }
  },

  // Create a new project
  createProject: async (projectData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")).access.token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      set({ isLoading: false, message: "Project created successfully!" });
      set((state) => ({ projects: [...state.projects, data.project] }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.error(error);
    }
  },

  // Update an existing project
  updateProject: async (projectId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")).access.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const data = await response.json();
      set({ isLoading: false, message: "Project updated successfully!" });
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === projectId ? { ...project, ...updatedData } : project
        ),
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.error(error);
    }
  },

  // Delete a project
  deleteProject: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokens")).access.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      set({ isLoading: false, message: "Project deleted successfully!" });
      set((state) => ({
        projects: state.projects.filter((project) => project._id !== projectId),
      }));
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.error(error);
    }
  },
}));
