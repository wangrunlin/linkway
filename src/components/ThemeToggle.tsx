"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // 更新主题的函数
  const updateTheme = (dark: boolean, saveToStorage: boolean = true) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    if (saveToStorage) {
      localStorage.setItem("theme", dark ? "dark" : "light");
    }
    setIsDark(dark);
  };

  useEffect(() => {
    // 检查 localStorage 中的主题设置
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (savedTheme) {
      // 如果有保存的主题设置，使用保存的设置
      updateTheme(savedTheme === "dark");
    } else {
      // 如果没有保存的设置，使用系统设置但不保存到 localStorage
      updateTheme(prefersDark.matches, false);
    }

    // 监听系统主题变化
    const mediaQueryListener = (e: MediaQueryListEvent) => {
      // 只有在没有保存的主题设置时才跟随系统变化
      if (!localStorage.getItem("theme")) {
        updateTheme(e.matches, false);
      }
    };

    prefersDark.addEventListener("change", mediaQueryListener);

    // 清理监听器
    return () => {
      prefersDark.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  const toggleTheme = () => {
    updateTheme(!isDark); // 手动切换时保存到 localStorage
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}
