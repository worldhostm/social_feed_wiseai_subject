'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ images, currentIndex, isOpen, onClose }: ImageModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [imageIndex, setImageIndex] = useState(currentIndex);

  // Reset state when modal opens/closes or image changes
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setImageIndex(currentIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  // Keyboard handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (images.length > 1) {
          setImageIndex(prev => (prev - 1 + images.length) % images.length);
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          setRotation(0);
        }
        break;
      case 'ArrowRight':
        if (images.length > 1) {
          setImageIndex(prev => (prev + 1) % images.length);
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          setRotation(0);
        }
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'r':
      case 'R':
        setRotation(prev => (prev + 90) % 360);
        break;
    }
  }, [isOpen, images.length, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  const nextImage = () => {
    if (images.length > 1) {
      setImageIndex(prev => (prev + 1) % images.length);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setImageIndex(prev => (prev - 1 + images.length) % images.length);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            title="축소 (-)"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            title="확대 (+)"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => setRotation(prev => (prev + 90) % 360)}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            title="회전 (R)"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              title="이전 이미지 (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              title="다음 이미지 (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black bg-opacity-50 text-white rounded-full text-sm">
            {imageIndex + 1} / {images.length}
          </div>
        )}

        {/* Zoom level indicator */}
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black bg-opacity-50 text-white rounded-full text-sm">
          {Math.round(zoom * 100)}%
        </div>

        {/* Image container */}
        <div 
          className="relative max-w-full max-h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <Image
            src={images[imageIndex]}
            alt={`이미지 ${imageIndex + 1}`}
            width={800}
            height={600}
            className="max-w-[90vw] max-h-[90vh] object-contain select-none"
            style={{ pointerEvents: 'none' }}
            priority
          />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 z-10 text-white text-sm bg-black bg-opacity-50 rounded px-3 py-2 max-w-xs">
          <div className="space-y-1">
            <div>마우스 휠: 확대/축소</div>
            <div>드래그: 이미지 이동</div>
            <div>ESC: 닫기</div>
            {images.length > 1 && <div>←→: 이미지 변경</div>}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined' 
    ? createPortal(modal, document.body)
    : null;
}