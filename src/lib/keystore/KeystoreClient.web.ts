import * as SecureStore from "expo-secure-store";

/**
 * Web fallback for KeystoreClient.
 * Since expo-secure-store doesn't support web, this uses localStorage
 * to maintain the exact same API surface area for web platform builds.
 *
 * NOTE: Values stored here on the web are NOT encrypted.
 */
class KeystoreClient {
  private static instance: KeystoreClient;
  private memoryStore: Map<string, string> = new Map();

  private constructor() {
    // Private constructor prevents direct instantiation
  }

  /** Returns the singleton KeystoreClient instance. */
  static getInstance(): KeystoreClient {
    if (!KeystoreClient.instance) {
      KeystoreClient.instance = new KeystoreClient();
    }
    return KeystoreClient.instance;
  }

  private get isStorageAvailable(): boolean {
    try {
      return typeof window !== "undefined" && "localStorage" in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  /**
   * Stores a key-value pair. (Uses localStorage on web).
   */
  async save(
    key: string,
    value: string,
    _options?: SecureStore.SecureStoreOptions,
  ): Promise<void> {
    if (this.isStorageAvailable) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        console.error("localStorage save error:", e);
      }
    } else {
      this.memoryStore.set(key, value);
    }
  }

  /**
   * Retrieves the value associated with the given key.
   */
  async getValueFor(
    key: string,
    _options?: SecureStore.SecureStoreOptions,
  ): Promise<string | null> {
    return this.getValueSync(key, _options);
  }

  /**
   * Synchronously retrieves the value associated with the given key.
   */
  getValueSync(
    key: string,
    _options?: SecureStore.SecureStoreOptions,
  ): string | null {
    if (this.isStorageAvailable) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.error("localStorage get error:", e);
        return null;
      }
    }
    return this.memoryStore.get(key) || null;
  }

  /**
   * Deletes the value associated with the given key.
   */
  async delete(
    key: string,
    _options?: SecureStore.SecureStoreOptions,
  ): Promise<void> {
    if (this.isStorageAvailable) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        console.error("localStorage delete error:", e);
      }
    } else {
      this.memoryStore.delete(key);
    }
  }

  /**
   * Checks whether the API is available.
   * Returns true for web (we fallback to localStorage or in-memory).
   */
  async isAvailable(): Promise<boolean> {
    return true;
  }

  /**
   * Web does not support biometric authentication through SecureStore.
   */
  canUseBiometricAuthentication(): boolean {
    return false;
  }
}

export default KeystoreClient.getInstance();
