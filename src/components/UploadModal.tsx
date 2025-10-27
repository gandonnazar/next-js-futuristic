'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './UploadModal.module.css';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedImages: string[]) => void;
}

const SAMPLE_IMAGES = [
  { id: 1, filename: 'image1.jpg', size: '2.3 MB', src: '/assets/image1.jpg' },
  { id: 2, filename: 'portrait1.jpg', size: '1.8 MB', src: '/assets/portrait1.jpg' },
  { id: 3, filename: 'landscape.jpg', size: '3.1 MB', src: '/assets/landscape.jpg' },
  { id: 4, filename: 'portrait2.jpg', size: '2.7 MB', src: '/assets/portrait2.jpg' },
];

export default function UploadModal({ isOpen, onClose, onConfirm }: UploadModalProps) {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const handleImageClick = (id: number) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selected = SAMPLE_IMAGES
      .filter(img => selectedImages.includes(img.id))
      .map(img => img.src);
    onConfirm(selected);
    setSelectedImages([]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Simulate file drop (frontend only)
    alert('File drop simulated! In production, this would handle actual file uploads.');
  };

  return (
    <div className={styles.uploadModal}>
      <div className={styles.uploadModalOverlay} onClick={onClose}></div>
      <div className={styles.uploadModalContent}>
        <div className={styles.uploadModalHeader}>
          <h2>Select Reference Images</h2>
          <button className={styles.modalCloseBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.uploadModalBody}>
          {/* Dropzone */}
          <div 
            className={`${styles.uploadDropzone} ${dragOver ? styles.dragOver : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => alert('File selection simulated! In production, this would open file picker.')}
          >
            <div className={styles.dropzoneContent}>
              <div className={styles.dropzoneIcon}>📤</div>
              <p className={styles.dropzoneText}>Drop images here or click to upload</p>
              <p className={styles.dropzoneSubtext}>PNG, JPG, WebP up to 5MB each</p>
              <button className={styles.btnChooseFiles}>
                <span>📁 Choose Files</span>
              </button>
            </div>
          </div>

          {/* Previously Uploaded */}
          <div className={styles.previouslyUploadedSection}>
            <h3 className={styles.sectionSubtitle}>
              Previously Uploaded (<span>{SAMPLE_IMAGES.length}</span>)
            </h3>
            <div className={styles.uploadedImagesGrid}>
              {SAMPLE_IMAGES.map((img) => (
                <div 
                  key={img.id}
                  className={`${styles.uploadedImageItem} ${selectedImages.includes(img.id) ? styles.selected : ''}`}
                  onClick={() => handleImageClick(img.id)}
                >
                  <Image
                    src={img.src}
                    alt={img.filename}
                    fill
                    sizes="200px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.uploadedImageInfo}>
                    <span className={styles.uploadedFilename}>{img.filename}</span>
                    <span className={styles.uploadedFilesize}>{img.size}</span>
                  </div>
                  <button 
                    className={styles.uploadedDeleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Delete ${img.filename} simulated!`);
                    }}
                  >
                    🗑️
                  </button>
                  <div className={styles.uploadedSelectedIndicator}>✓</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.uploadModalFooter}>
          <button className={styles.btnModalCancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btnModalConfirm} onClick={handleConfirm}>
            Use Selected ({selectedImages.length})
          </button>
        </div>
      </div>
    </div>
  );
}
