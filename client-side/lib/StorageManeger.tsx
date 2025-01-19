import { TodoInterface } from "./interfaces";

export class StorageManager {
    // Check if we're in the browser environment
    static isClient = typeof window !== 'undefined';
  
    static saveData(key: string, data: TodoInterface[]) {
      if (this.isClient) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
    }
  
    static getData(key:string) {
      if (this.isClient) {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch (error) {
          console.error('Error reading from localStorage:', error);
          return null;
        }
      }
      return null;
    }
  }