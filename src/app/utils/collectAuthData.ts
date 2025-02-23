import { AuthData } from "@/types/authTypes";
import { detect } from "detect-browser";


export const collectAuthData = async (
  mobileNumber: string,
  otp: string
): Promise<AuthData> => {
  const browser = detect();
 const deviceDetails = {
   brand: navigator.vendor || "Unknown",
   model: browser?.name || "Unknown",
  //  version: browser?.version || "Unknown",
   product: navigator.userAgent,
   device: "Unknown",
   hardware: "Unknown",
   host: "Unknown",
   id: "device_id",
   is_physical_device: true,
   manufacturer: navigator.vendor || "Unknown",
   serial_number: "Unknown", // Add this
   version_details: {
     codename: "Unknown", // Add this
     release: "Unknown", // Add this
     sdkInt: "Unknown", // Add this
   },
 };

  const getLocation = async (): Promise<{
    latitude: number;
    longitude: number;
  } | null> => {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
            resolve(null);
          }
        );
      } else {
        resolve(null);
      }
    });
  };

  const location = await getLocation();
  const wifi_details = {
    wifiBSSID: "Unknown",
    wifiBroadcast: "Unknown",
    wifiGateway: "Unknown",
    wifiIP: "Unknown",
    wifiIPV6: "Unknown",
    wifiSubmask: "Unknown",
  };

  const device_network_details = {
    device_interface_list: [
      {
        name: "eth0", 
        ip: "192.168.1.1", 
      },
    ],
  };

  const authData: AuthData = {
    mobile_number: mobileNumber,
    otp: otp,
    login_device_details: {
      device_details: deviceDetails,
      device_network_details: device_network_details,
      login_location: {
        type: "Point",
        coordinates: location ? [location.longitude, location.latitude] : null,
      },
      wifi_details: wifi_details,
    },
  };

  return authData;
};
