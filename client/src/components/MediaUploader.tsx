import React, { useState, useRef } from 'react';
import { uploadApi } from '../services/api';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  helpText?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  label,
  value,
  onChange,
  accept = 'image/*',
  helpText = 'Upload a file or enter an image URL'
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const result = await uploadApi.uploadFile(file);
      onChange(result.url);
    } catch (err: any) {
      setUploadError(err.response?.data?.message || 'Failed to upload file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label small fw-semibold text-dark">{label}</label>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="https://... or upload local file"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          disabled={uploading}
          className="btn btn-outline-secondary d-flex align-items-center gap-1"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status"></span>
              Uploading...
            </>
          ) : (
            <>
              <i className="bi bi-cloud-arrow-up"></i> Upload
            </>
          )}
        </button>
        {value && (
          <button
            type="button"
            className="btn btn-outline-danger"
            title="Clear"
            onClick={() => onChange('')}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      {helpText && <div className="form-text small">{helpText}</div>}
      {uploadError && <div className="text-danger small mt-1">{uploadError}</div>}

      {/* Image Preview */}
      {value && accept.includes('image') && (
        <div className="mt-2 position-relative d-inline-block border rounded p-1 bg-light">
          <img
            src={value}
            alt="Preview"
            style={{ maxHeight: '80px', maxWidth: '160px', objectFit: 'contain' }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
