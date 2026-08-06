import * as SecureStore from "expo-secure-store";

/**
 * Singleton utility class for interacting with the device's secure storage
 * via expo-secure-store. Provides methods for saving, retrieving, and deleting
 * encrypted key-value pairs.
 */
class KeystoreClient {
  private static instance: KeystoreClient;

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

  /**
   * Stores a key-value pair in secure storage.
   *
   * @param key   - The key to associate with the stored value.
   *                Keys may contain alphanumeric characters, `.`, `-`, and `_`.
   * @param value - The string value to store.
   * @param options - Optional {@link SecureStore.SecureStoreOptions}.
   */
  async save(
    key: string,
    value: string,
    options?: SecureStore.SecureStoreOptions,
  ): Promise<void> {
    await SecureStore.setItemAsync(key, value, options);
  }

  /**
   * Retrieves the value associated with the given key from secure storage.
   *
   * @param key     - The key that was used to store the value.
   * @param options - Optional {@link SecureStore.SecureStoreOptions}.
   * @returns The stored string value, or `null` if no entry exists for the key.
   */
  async getValueFor(
    key: string,
    options?: SecureStore.SecureStoreOptions,
  ): Promise<string | null> {
    try {
      const result = await SecureStore.getItemAsync(key, options);
      if (result) {
        return result;
      }
    } catch (error) {
      console.error("Error fetching value for key:", key, error);
    }
    return null;
  }

  /**
   * Synchronously retrieves the value associated with the given key.
   *
   * **Note:** This blocks the JS thread. Avoid using with
   * `requireAuthentication: true` as it freezes the UI until the user
   * authenticates.
   *
   * @param key     - The key that was used to store the value.
   * @param options - Optional {@link SecureStore.SecureStoreOptions}.
   * @returns The stored string value, or `null` if no entry exists.
   */
  getValueSync(
    key: string,
    options?: SecureStore.SecureStoreOptions,
  ): string | null {
    try {
      return SecureStore.getItem(key, options);
    } catch (error) {
      console.error("Error fetching value synchronously for key:", key, error);
      return null;
    }
  }

  /**
   * Deletes the value associated with the given key from secure storage.
   *
   * @param key     - The key whose value should be deleted.
   * @param options - Optional {@link SecureStore.SecureStoreOptions}.
   */
  async delete(
    key: string,
    options?: SecureStore.SecureStoreOptions,
  ): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key, options);
    } catch (error) {
      console.error("Error deleting value for key:", key, error);
    }
  }

  /**
   * Checks whether the SecureStore API is available on the current device.
   *
   * @returns `true` if SecureStore is available (Android & iOS), `false` otherwise.
   */
  async isAvailable(): Promise<boolean> {
    return SecureStore.isAvailableAsync();
  }

  /**
   * Checks whether biometric authentication can be used with
   * the `requireAuthentication` option.
   *
   * @returns `true` if the device supports sufficiently secure biometric auth.
   */
  canUseBiometricAuthentication(): boolean {
    return SecureStore.canUseBiometricAuthentication();
  }
}

export default KeystoreClient.getInstance();
