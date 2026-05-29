import foreground from "./foreground";
import { noPermissionsRoutes } from "./canstants";
import backstage from "./backstage";
export const ComponentCanstants = {
  ...noPermissionsRoutes,
  ...foreground,
  ...backstage,
};
