import developmentConfiguration from "@/environments/config.development.json";
import productionConfiguration from "@/environments/config.production.json";

export default () => {
  switch (process.env.NODE_ENV) {
    case "development":
    case "test": {
      return developmentConfiguration;
    }
    case "production": {
      return productionConfiguration;
    }
    default: {
      throw new Error("NODE_ENV not being set!");
    }
  }
};
