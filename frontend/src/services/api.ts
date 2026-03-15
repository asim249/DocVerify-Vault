import api from '@/src/lib/axios';
import { Document, User } from '@/src/types';

export const documentService = {
  getAll: async () => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },
  
  upload: async (file: File, hash: string, onProgress: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('hash', hash);
    
    const response = await api.post<Document>('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.total 
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total) 
          : 0;
        onProgress(progress);
      },
    });
    return response.data;
  },
  
  verify: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ valid: boolean; document?: Document }>('/documents/verify', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/documents/${id}`);
  },
};

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get<User[]>('/admin/users');
    return response.data;
  }
};
