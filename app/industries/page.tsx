import { redirect } from "next/navigation";

// No separate index yet: industries are listed on /services
export default function IndustriesIndex() {
  redirect("/services");
}
