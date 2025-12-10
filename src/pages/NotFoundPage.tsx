import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useMetadata } from "@/hooks/useMetadata";

const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  useMetadata({
    title: `KTH Tentor | 404 - ${language === "sv" ? "Sidan hittades inte" : "Page Not Found"
      }`,
    description:
      language === "sv"
        ? "Den här sidan kunde inte hittas. Gå tillbaka till startsidan för att fortsätta använda KTH Tentor."
        : "This page could not be found. Return to the homepage to continue using KTH Tentor.",
    keywords:
      "404, page not found, sidan hittades inte, fel, error, KTH, KTH",
    ogTitle: `KTH Tentor | 404 - ${language === "sv" ? "Sidan hittades inte" : "Page Not Found"
      }`,
    ogDescription:
      language === "sv"
        ? "Den här sidan kunde inte hittas. Gå tillbaka till startsidan för att fortsätta använda KTH Tentor."
        : "This page could not be found. Return to the homepage to continue using KTH Tentor.",
    ogType: "website",
    twitterCard: "summary",
    twitterTitle: `KTH Tentor | 404 - ${language === "sv" ? "Sidan hittades inte" : "Page Not Found"
      }`,
    twitterDescription:
      language === "sv"
        ? "Den här sidan kunde inte hittas. Gå tillbaka till startsidan för att fortsätta använda KTH Tentor."
        : "This page could not be found. Return to the homepage to continue using KTH Tentor.",
    robots: "noindex, nofollow",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-6xl font-medium mb-4">404</h1>
      <p className="text-lg mb-8 text-foreground">{t("lostMessage")}</p>
      <Link to="/" className="mb-32">
        <Button
          size="lg"
          className="bg-primary text-white font-medium shadow-md hover:bg-primary/90 transition-all"
        >
          {t("goHome")}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
