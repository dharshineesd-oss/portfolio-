import Certification, { ICertification } from '../models/Certification';

export class CertificationService {
  async getAllCertifications(): Promise<ICertification[]> {
    return await Certification.find().sort({ issueDate: -1, createdAt: -1 });
  }

  async getCertificationById(id: string): Promise<ICertification | null> {
    return await Certification.findById(id);
  }

  async createCertification(data: Partial<ICertification>): Promise<ICertification> {
    const cert = new Certification(data);
    return await cert.save();
  }

  async updateCertification(id: string, data: Partial<ICertification>): Promise<ICertification | null> {
    return await Certification.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteCertification(id: string): Promise<ICertification | null> {
    return await Certification.findByIdAndDelete(id);
  }
}

export const certificationService = new CertificationService();
