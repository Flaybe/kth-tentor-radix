import {
  GearSixIcon,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import useTranslation from "@/hooks/useTranslation";

type ShortcutAction =
  | "moveFacitRight"
  | "moveFacitLeft"
  | "zoomIn"
  | "zoomOut"
  | "rotateLeft"
  | "rotateRight"
  | "toggleAIChat";

const SettingsDialog: FC = () => {
  const { t } = useTranslation();
  const { changeLanguage, languages, language } = useLanguage();

  const shortcuts: Array<{
    action: ShortcutAction;
    key: string;
    category: string;
  }> = [
      { action: "moveFacitRight", key: "→", category: "navigation" },
      { action: "moveFacitLeft", key: "←", category: "navigation" },
      { action: "toggleAIChat", key: "C", category: "navigation" },
      { action: "zoomIn", key: "+", category: "zoom" },
      { action: "zoomOut", key: "-", category: "zoom" },
      { action: "rotateLeft", key: "R", category: "rotation" },
      { action: "rotateRight", key: "L", category: "rotation" },
    ];

  const categoryTranslations = {
    search: { en: "Search", sv: "Sök" },
    navigation: { en: "Navigation", sv: "Navigering" },
    visibility: { en: "Visibility", sv: "Synlighet" },
    zoom: { en: "Zoom", sv: "Zoom" },
    rotation: { en: "Rotation", sv: "Rotation" },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <GearSixIcon weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90%] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("settings")}</DialogTitle>
          <DialogDescription>{t("settingsDescription")}</DialogDescription>
        </DialogHeader>

        {/* Language Selector */}
        <div className="space-y-4">
          <h3 className="font-medium">{t("settingsLanguage")}</h3>
          <Select onValueChange={changeLanguage} value={language}>
            <SelectTrigger className="w-full">
              <SelectValue>{languages[language]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languages).map(([lang, label]) => (
                <SelectItem key={lang} value={lang}>
                  {label as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="space-y-4">
          <h3 className="font-medium">{t("settingsKeyboardShortcuts")}</h3>
          <div className="space-y-4">
            {Object.keys(categoryTranslations).map((category) => {
              const categoryShortcuts = shortcuts.filter(
                (s) => s.category === category
              );
              if (categoryShortcuts.length === 0) return null;

              return (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground first-letter:uppercase">
                    {
                      categoryTranslations[
                      category as keyof typeof categoryTranslations
                      ][language as "en" | "sv"]
                    }
                  </h4>
                  <div className="rounded-lg border bg-card">
                    <table className="w-full">
                      <tbody className="divide-y">
                        {categoryShortcuts.map((shortcut) => (
                          <tr key={shortcut.action} className="text-sm">
                            <td className="px-4 py-3">{t(shortcut.action)}</td>
                            <td className="px-4 py-3 text-right">
                              <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm font-medium">
                                {shortcut.key}
                              </kbd>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
