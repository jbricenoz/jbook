import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'primary';
}

export function ConfirmationModal({
  show,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger'
}: ConfirmationModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card rounded-xl shadow-lg animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-base font-medium text-text-primary">{title}</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={onCancel}
            className="p-1.5"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <p className="text-text-secondary mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={variant}
              size="sm"
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}