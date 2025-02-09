export {}; // Make this file a module

// Define notification types as a union type
export type NotificationType = 'success' | 'error';

// Base props that might be shared between components
export interface BaseComponentProps {
  className?: string;
}

export interface ErrorMessageProps extends BaseComponentProps {
  error: string | null;
}

export interface NotificationProps extends BaseComponentProps {
  message?: string | null;
  type?: NotificationType;
}

// If we add more shared props in the future
export interface LoadingProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
} 