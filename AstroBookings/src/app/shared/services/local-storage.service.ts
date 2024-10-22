import { Injectable } from '@angular/core';

/**
 * Provides methods to read, write, remove, clear and check for local storage items
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Reads an item from local storage
   * @param key - The key of the item to read
   * @returns - The item, or undefined if it doesn't exist or can't be parsed
   */
  read<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (!item) return undefined;
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item with key "${key}":`, error);
      return undefined;
    }
  }

  /**
   * Writes an item to local storage
   * @param key - The key of the item to write
   * @param value - The item to write
   */
  write<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage with key "${key}":`, error);
    }
  }

  /**
   * Removes an item from local storage
   * @param key - The key of the item to remove
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all items from local storage
   */
  clear(): void {
    localStorage.clear();
  }
}
