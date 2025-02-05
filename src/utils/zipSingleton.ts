import JSZip from "jszip";

class zipSingleton {
  private static zip: JSZip;
  constructor() {}
  public static getZip(): JSZip {
    if (!zipSingleton.zip) {
      zipSingleton.zip = new JSZip();
    }
    return zipSingleton.zip;
  }
}

export default zipSingleton;
