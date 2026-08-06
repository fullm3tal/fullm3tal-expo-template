import KeystoreClient from "@/lib/keystore/KeystoreClient";
import { KeystoreKeys } from "@/lib/keystore/KeystoreKeys";
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "./i18n";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<string>(i18n.language || "en");
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await KeystoreClient.getValueFor(
          KeystoreKeys.APP_LANGUAGE,
        );
        if (storedLanguage) {
          await i18n.changeLanguage(storedLanguage);
          setLanguageState(storedLanguage);
        } else {
          // If no language is stored, save the default one
          await KeystoreClient.save(
            KeystoreKeys.APP_LANGUAGE,
            i18n.language || "en",
          );
        }
      } catch (error) {
        console.error("Failed to load language from secure storage:", error);
      } finally {
        setIsLanguageLoaded(true);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setLanguageState(lang);
      await KeystoreClient.save(KeystoreKeys.APP_LANGUAGE, lang);
    } catch (error) {
      console.error("Failed to set language:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, isLanguageLoaded }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
