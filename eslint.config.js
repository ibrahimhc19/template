// npm install eslint-plugin-boundaries --save-dev


import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
      import: importPlugin,
      perfectionist,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // =============================
      // Arquitectura y disciplina
      // =============================

      // No lógica compleja en componentes
      complexity: ["error", 8],
      "max-lines-per-function": ["error", 120],

      // Evita archivos gigantes
      "max-lines": ["error", 300],

      // =============================
      // React
      // =============================

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Hooks correctos
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // =============================
      // Anti-patterns importantes
      // =============================

      // No imports sin usar
      "unused-imports/no-unused-imports": "error",

      // Evita variables sin usar (pero permite _)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // No any (pero no bloqueante total)
      "@typescript-eslint/no-explicit-any": "warn",

      // =============================
      // 📦 Imports (clave para arquitectura)
      // =============================

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],

      // MUY IMPORTANTE: evitar acoplamiento incorrecto
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../services/*"],
              message:
                "Do not import services directly across features. Use hooks instead.",
            },
            {
              group: ["../store/*"],
              message:
                "Avoid direct store access across unrelated features.",
            },
          ],
        },
      ],

      // =============================
      // Consistencia (pro-level)
      // =============================

      // Ordenar imports automáticamente
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],

      // =============================
      // Buenas prácticas
      // =============================

      // Evita console.log en producción
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Evita nested ternaries (legibilidad)
      "no-nested-ternary": "error",

      // Evita condiciones confusas
      "no-unneeded-ternary": "error",

      // Magic numbers
      "no-magic-numbers": [
        "warn",
        { ignore: [0, 1], enforceConst: true },
      ],

      // Strings en JSX
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value][parent.type='JSXAttribute']",
          message: "Avoid hardcoded strings in JSX.",
        },
      ],

      // Complejidad
      complexity: ["error", 8],
      "max-lines-per-function": ["error", 120],

      // Imports controlados
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "**/utils",
            "**/constants",
          ],
        },
      ],
    },
  },
];