"use client";

import React from 'react';
import { useCart } from './use-cart';

// Simple CartProvider component that just passes children through
// The actual cart state is managed by Zustand and is accessible via the useCart hook
export function CartProvider({ children }: { children: React.ReactNode }) {
  // We're using Zustand with persistence instead of React Context,
  // so we don't need to initialize any state here
  
  return (
    <>{children}</>
  );
} 