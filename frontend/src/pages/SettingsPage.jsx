import { daisyUIThemes } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { setTheme, theme } = useThemeStore();

  return (
    <div className="p-6" data-theme={theme}>
      <h2 className="text-2xl font-bold mb-6 text-center">🎨 Select a Theme</h2>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {daisyUIThemes.map((t) => (
          <div
            key={t}
            data-theme={t}
            onClick={() => setTheme(t)}
            className="cursor-pointer rounded-lg border border-base-300 p-3 transition-transform hover:scale-105 hover:shadow-lg"
          >
            {/* T Name */}
            <div className="text-xs font-semibold text-center capitalize mb-2">
              {t}
            </div>

            {/* Color palette preview */}
            <div className="grid grid-cols-5 gap-1">
              <div className="w-full h-4 rounded bg-primary" title="primary" />
              <div
                className="w-full h-4 rounded bg-secondary"
                title="secondary"
              />
              <div className="w-full h-4 rounded bg-accent" title="accent" />
              <div className="w-full h-4 rounded bg-neutral" title="neutral" />
              <div
                className="w-full h-4 rounded bg-base-100 border"
                title="base"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
