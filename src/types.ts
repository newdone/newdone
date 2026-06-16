/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CangzhouFood {
  id: string;
  name: string;
  nativeName: string;
  tagline: string;
  description: string;
  imageUrl?: string;
  ingredients: string[];
  history: string;
  recommendedSpots: string[];
  festivalConnection: string;
}

export interface CanalStation {
  id: string;
  name: string;
  mileage: string;
  description: string;
  historicRelic: string;
  specialtyGourmet: string;
  longitudePercent: number; // For plotting on a visual canal stream map (0-100)
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}
