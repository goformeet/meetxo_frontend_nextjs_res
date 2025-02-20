
export interface DeviceVersion {
  codename: string;
  release: string;
  sdkInt: string;
}

export interface DeviceDetails {
  brand: string;
  model: string;
  version: string;
  product: string;
  device: string;
  hardware: string;
  host: string;
  id: string;
  is_physical_device: boolean;
  manufacturer: string;
  serial_number: string;
  version_details: DeviceVersion;
}

export interface DeviceInterface {
  name: string;
  ip: string;
}

export interface DeviceNetworkDetails {
  device_interface_list: DeviceInterface[];
}

export interface LoginLocation {
  type: "Point";
  coordinates: [number, number] | null;
}

export interface WifiDetails {
  wifiBSSID: string;
  wifiBroadcast: string;
  wifiGateway: string;
  wifiIP: string;
  wifiIPV6: string;
  wifiSubmask: string;
}

export interface LoginDeviceDetails {
  device_details: DeviceDetails;
  device_network_details: DeviceNetworkDetails;
  login_location: LoginLocation;
  wifi_details: WifiDetails;
}

export interface AuthData {
  mobile_number: string;
  otp: string;
  login_device_details: LoginDeviceDetails;
}
