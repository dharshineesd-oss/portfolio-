import axios from 'axios';
import {
  ApiResponse,
  Project,
  Skill,
  Education,
  Certification,
  Experience,
  Service,
  Achievement,
  Testimonial,
  BlogPost,
  Profile,
  SiteSettings,
  ContactMessage,
  ContactFormInput,
  User
} from '../types/portfolio.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Interceptor to attach Bearer token or master admin key
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_auth_token');
  const adminKey = localStorage.getItem('portfolio_admin_token');

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else if (adminKey && config.headers) {
    config.headers['X-Admin-Key'] = adminKey;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<{ token: string; user: User }> => {
    const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials);
    return response.data.data!;
  },
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data.data!.user;
  },
  changePassword: async (passwords: { currentPassword: string; newPassword: string }): Promise<void> => {
    await apiClient.post<ApiResponse>('/auth/change-password', passwords);
  }
};

// Profile API (Dynamic Home & About)
export const profileApi = {
  get: async (): Promise<Profile> => {
    const response = await apiClient.get<ApiResponse<Profile>>('/profile');
    return response.data.data!;
  },
  update: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await apiClient.put<ApiResponse<Profile>>('/profile', data);
    return response.data.data!;
  }
};

// Site Settings API (Theme, SEO, Social, Sections)
export const settingsApi = {
  get: async (): Promise<SiteSettings> => {
    const response = await apiClient.get<ApiResponse<SiteSettings>>('/settings');
    return response.data.data!;
  },
  update: async (data: Partial<SiteSettings>): Promise<SiteSettings> => {
    const response = await apiClient.put<ApiResponse<SiteSettings>>('/settings', data);
    return response.data.data!;
  }
};

// Projects API
export const projectsApi = {
  getAll: async (params?: { technology?: string; category?: string; featured?: boolean; all?: boolean }): Promise<Project[]> => {
    const response = await apiClient.get<ApiResponse<Project[]>>('/projects', { params });
    return response.data.data || [];
  },
  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data!;
  },
  create: async (data: Partial<Project>): Promise<Project> => {
    const response = await apiClient.post<ApiResponse<Project>>('/projects', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/projects/${id}`);
  },
  duplicate: async (id: string): Promise<Project> => {
    const response = await apiClient.post<ApiResponse<Project>>(`/projects/duplicate/${id}`);
    return response.data.data!;
  },
  reorder: async (items: { id: string; sortOrder: number }[]): Promise<void> => {
    await apiClient.post<ApiResponse>('/projects/reorder', { items });
  }
};

// Skills API
export const skillsApi = {
  getAll: async (all: boolean = false): Promise<Skill[]> => {
    const response = await apiClient.get<ApiResponse<Skill[]>>('/skills', { params: { all } });
    return response.data.data || [];
  },
  create: async (data: Partial<Skill>): Promise<Skill> => {
    const response = await apiClient.post<ApiResponse<Skill>>('/skills', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    const response = await apiClient.put<ApiResponse<Skill>>(`/skills/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/skills/${id}`);
  },
  reorder: async (items: { id: string; sortOrder: number }[]): Promise<void> => {
    await apiClient.post<ApiResponse>('/skills/reorder', { items });
  }
};

// Education API
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    const response = await apiClient.get<ApiResponse<Education[]>>('/education');
    return response.data.data || [];
  },
  create: async (data: Partial<Education>): Promise<Education> => {
    const response = await apiClient.post<ApiResponse<Education>>('/education', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Education>): Promise<Education> => {
    const response = await apiClient.put<ApiResponse<Education>>(`/education/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/education/${id}`);
  }
};

// Certifications API
export const certificationsApi = {
  getAll: async (): Promise<Certification[]> => {
    const response = await apiClient.get<ApiResponse<Certification[]>>('/certifications');
    return response.data.data || [];
  },
  create: async (data: Partial<Certification>): Promise<Certification> => {
    const response = await apiClient.post<ApiResponse<Certification>>('/certifications', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Certification>): Promise<Certification> => {
    const response = await apiClient.put<ApiResponse<Certification>>(`/certifications/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/certifications/${id}`);
  }
};

// Experience API
export const experienceApi = {
  getAll: async (): Promise<Experience[]> => {
    const response = await apiClient.get<ApiResponse<Experience[]>>('/experience');
    return response.data.data || [];
  },
  create: async (data: Partial<Experience>): Promise<Experience> => {
    const response = await apiClient.post<ApiResponse<Experience>>('/experience', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    const response = await apiClient.put<ApiResponse<Experience>>(`/experience/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/experience/${id}`);
  }
};

// Services API
export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    const response = await apiClient.get<ApiResponse<Service[]>>('/services');
    return response.data.data || [];
  },
  create: async (data: Partial<Service>): Promise<Service> => {
    const response = await apiClient.post<ApiResponse<Service>>('/services', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Service>): Promise<Service> => {
    const response = await apiClient.put<ApiResponse<Service>>(`/services/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/services/${id}`);
  },
  reorder: async (items: { id: string; sortOrder: number }[]): Promise<void> => {
    await apiClient.post<ApiResponse>('/services/reorder', { items });
  }
};

// Achievements API
export const achievementsApi = {
  getAll: async (): Promise<Achievement[]> => {
    const response = await apiClient.get<ApiResponse<Achievement[]>>('/achievements');
    return response.data.data || [];
  },
  create: async (data: Partial<Achievement>): Promise<Achievement> => {
    const response = await apiClient.post<ApiResponse<Achievement>>('/achievements', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Achievement>): Promise<Achievement> => {
    const response = await apiClient.put<ApiResponse<Achievement>>(`/achievements/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/achievements/${id}`);
  }
};

// Testimonials API
export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get<ApiResponse<Testimonial[]>>('/testimonials');
    return response.data.data || [];
  },
  create: async (data: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await apiClient.post<ApiResponse<Testimonial>>('/testimonials', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await apiClient.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/testimonials/${id}`);
  }
};

// Blog Posts API
export const blogApi = {
  getAll: async (params?: { category?: string; search?: string; all?: boolean }): Promise<BlogPost[]> => {
    const response = await apiClient.get<ApiResponse<BlogPost[]>>('/blog', { params });
    return response.data.data || [];
  },
  getBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await apiClient.get<ApiResponse<BlogPost>>(`/blog/${slug}`);
    return response.data.data!;
  },
  create: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await apiClient.post<ApiResponse<BlogPost>>('/blog', data);
    return response.data.data!;
  },
  update: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await apiClient.put<ApiResponse<BlogPost>>(`/blog/${id}`, data);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/blog/${id}`);
  }
};

// Media Upload API
export const uploadApi = {
  uploadFile: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<ApiResponse<{ url: string; filename: string }>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data!;
  }
};

// Contact API
export const contactApi = {
  submit: async (data: ContactFormInput): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/contact', data);
    return response.data;
  },
  getAll: async (search?: string): Promise<ContactMessage[]> => {
    const response = await apiClient.get<ApiResponse<ContactMessage[]>>('/contact', { params: { search } });
    return response.data.data || [];
  },
  toggleRead: async (id: string): Promise<ContactMessage> => {
    const response = await apiClient.patch<ApiResponse<ContactMessage>>(`/contact/${id}/toggle-read`);
    return response.data.data!;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/contact/${id}`);
  }
};

// Health Check API
export const healthApi = {
  check: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  }
};

export default apiClient;
