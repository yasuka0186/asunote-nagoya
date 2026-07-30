export default {
  extends: ["stylelint-config-standard-scss"],
  ignoreFiles: ["css/**/*.css"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+-?)+)?(?:--(?:[a-z0-9]+-?)+)?$",
      {
        "message": "Expected class selector to use kebab-case or BEM notation"
      }
    ]
  }
};
