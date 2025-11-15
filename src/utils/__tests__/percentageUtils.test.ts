import { describe, it, expect } from 'vitest';
import {
  calculateRowPercentages,
  calculateRowHeatmap,
  getHeatmapColor,
  getHeatmapTextColor,
} from '../percentageUtils';

const c = (amount: number) => ({ id: amount, amount });

describe('percentageUtils', () => {
  it('calculates row percentages correctly', () => {
    const row = [c(50), c(50)];
    const result = calculateRowPercentages(row, 100);
    expect(result).toEqual([50, 50]);
  });

  it('returns zeros when rowSum = 0', () => {
    const row = [c(10), c(20)];
    const result = calculateRowPercentages(row, 0);
    expect(result).toEqual([0, 0]);
  });

  it('calculates heatmap intensities', () => {
    const row = [c(10), c(20), c(30)];
    const result = calculateRowHeatmap(row);
    // max = 30 → intensities = 33%, 66%, 100%
    expect(result[2]).toBe(100);
  });

  it('generates a valid heatmap color', () => {
    const color = getHeatmapColor(50);
    expect(color).toMatch(/rgb\(\d+, \d+, \d+\)/);
  });

  it('returns dark text color for low intensity', () => {
    expect(getHeatmapTextColor(20)).toBe('#333333');
  });

  it('returns white text color for high intensity', () => {
    expect(getHeatmapTextColor(80)).toBe('#ffffff');
  });
});
